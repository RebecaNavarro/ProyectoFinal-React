import { useEffect, useState } from "react";
import { Typography, Box, LinearProgress } from "@mui/material";
import { updateProduct } from "../services/ProductService";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { Product } from "../interfaces/productInterface";

interface CountdownTimerProps {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    duration: number;
    initialDuration: number;
    status: string;
    onStatusChange: (newStatus: string) => void;
}

export default function CountdownTimer({
    id,
    title,
    description,
    image,
    price,
    duration,
    initialDuration,
    status,
    onStatusChange,
}: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState(initialDuration);

    useEffect(() => {
        setTimeLeft(initialDuration);
    }, [initialDuration, status]);

    useEffect(() => {
        if (status !== "active") return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    //TODO textos i18n
                    console.log("Updating product status to past for id:", id);
                    updateProduct(
                        {
                            id,
                            title,
                            description,
                            image,
                            price,
                            duration,
                            status: "past"
                        } as Product
                    )
                        .then(() => {
                            console.log("Status updated successfully");
                            onStatusChange("past");
                        })
                        .catch(error => {
                            console.error("Error details:", error.response?.data || error.message);
                        });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [status, id]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    if (status !== "active") return null;

    return (
        <Box sx={{ width: '100%', px: 2, mt: 1, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="body2" fontWeight="medium">
                    {formatTime(timeLeft)}
                </Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={(timeLeft / initialDuration) * 100}
                color={timeLeft > initialDuration * 0.3 ? 'primary' : 'error'}
                sx={{ mt: 1, height: 6, borderRadius: 3, width: '90%', mx: 'auto' }}
            />
        </Box>
    );
}
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import CountdownTimer from "./CountdownTimer";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  duration: number;
  id: string;
  status: string;
}

export default function ProductCard({
  title,
  description,
  image,
  price,
  duration,
  status,
  id
}: ProductCardProps) {

  const [currentStatus, setCurrentStatus] = useState(status);

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);
  };

  return (
    <Card
      sx={{
        height: "100%",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        marginTop: 2,
        paddingTop: 3,
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
      role="button"
      tabIndex={0}
    >
      {image && (
        <CardMedia
          component="img"
          image={image}
          alt={`Foto del producto ${title}`}
          sx={{
            borderRadius: 2,
            width: "100%",
            height: "auto",
            padding: 2,
            aspectRatio: "1 / 1",
            objectFit: "cover",
          }}
        />
      )}

      <CountdownTimer
        id={id}
        title={title}
        description={description}
        image={image}
        price={price}
        duration={duration}
        initialDuration={duration}
        status={currentStatus}
        onStatusChange={handleStatusChange}
      />

      <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {t("products.price")} {price} Bs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("products.duration")} {duration} segundos
        </Typography>
      </CardContent>
    </Card>
  );
}

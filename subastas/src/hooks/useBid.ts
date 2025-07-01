import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { t } from "i18next";
import type { Bid } from "../interfaces/bidInterface";
import { getBidsServicebyProductId, postBidService } from "../services/BidsService";

export const useBid = (price: number, productId: string, onClose: () => void) => {
  const bidSchema = Yup.object({
    bid: Yup.number()
      .min(price + 1, t("auctions.minBid"))
      .max(1000000, t("auctions.maxBid"))
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [bids, setBids] = useState<Bid[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBids = async () => {
      if (!productId) return;
      try {
        const bidsData = await getBidsServicebyProductId(productId);
        setBids(bidsData);
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };
    fetchBids();
  }, [productId]);


  const formik = useFormik({
    initialValues: {
      bid: price + 1, 
    },
    validationSchema: bidSchema,
    onSubmit: async (values) => {
      try {
        await postBidService({ ...values, productId });
        const updatedBids = await getBidsServicebyProductId(productId);
        setBids(updatedBids);
        formik.resetForm();
      } catch (error) {
        setErrorMessage(
          t("registerProduct.error_in_register") + (error as Error).message
        );
        setShowError(true);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const closeSnackbar = () => {
    setShowError(false);
    setErrorMessage("");
  }

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return {
    handleClose,
    formik,
    errorMessage,
    showError,
    closeSnackbar,
    bids,
    isSubmitting,
  };
};

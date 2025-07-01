import {
  Button,
  Container,
  Modal,
  TextField,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Box,
  Grid,
  Chip,
  Paper,
  CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { t } from "i18next";
import { styled } from "@mui/material/styles";
import type { Bid } from "../interfaces/bidInterface";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  formik: any;
  errorMessage: string;
  showError: boolean;
  closeSnackbar: () => void;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: number;
  bids: Bid[];
  isSubmitting: boolean;
}

const PriceChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.contrastText,
  fontWeight: 'bold',
  fontSize: '1.1rem',
  padding: theme.spacing(1),
  margin: theme.spacing(1, 0)
}));


const ImageContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  marginBottom: theme.spacing(2)
}));

export const ProductModal = ({
  open,
  onClose,
  formik,
  errorMessage,
  showError,
  closeSnackbar,
  title,
  description,
  image,
  price,
  duration,
  bids,
  isSubmitting
}: ProductModalProps) => {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Container
          maxWidth="lg"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 24,
            padding: 4,
            width: { xs: '90%', sm: '80%', md: '70%' },
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            {title}
          </Typography>

          <Grid container spacing={6}>
            <Grid size={{ xs: 6, md: 4 }}>
              <ImageContainer elevation={3}>
                <Box
                  component="img"
                  src={image}
                  alt={title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: 300,
                    objectFit: "contain",
                    borderRadius: 1,
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </ImageContainer>
            </Grid>

            <Grid size={{ xs: 6, md: 4 }}>
              <Typography variant="body1" sx={{ mb: 3 }} maxHeight={80} overflow="auto">
                {description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1" >
                  <strong>{t("products.duration")}</strong> {duration} segundos
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  <strong>{t("products.price")}</strong> {price} Bs
                </Typography>
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  label={t("auctions.enterBid")}
                  name="bid"
                  type="number"
                  value={formik.values.bid}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.bid && Boolean(formik.errors.bid)}
                  helperText={formik.touched.bid && formik.errors.bid}
                  sx={{ mb: 2 }}

                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    marginTop: 2,
                    py: 1.5,
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    t("auctions.bid")
                  )}
                </Button>
              </form>
            </Grid>

            <Grid size={{ xs: 6, md: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {t("auctions.bidHistory")}
                </Typography>
                {bids.length > 0 ? (
                  <Paper
                    elevation={2}
                    sx={{
                      maxHeight: 290,
                      overflowY: 'auto',
                      p: 2,
                      mb: 2,
                    }}
                  >
                    {bids
                      .map((puja) => (
                        <Box
                          key={puja.id}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            py: 1,
                            borderBottom: '1px solid',
                            borderColor: 'divider'
                          }}
                        >
                          <Typography variant="body1" fontWeight="bold">
                            {puja.bid} Bs
                          </Typography>
                        </Box>
                      ))}
                  </Paper>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {t("auctions.noBids")}
                  </Typography>
                )}
            </Grid>
          </Grid>

        </Container>
      </Modal>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          onClose={closeSnackbar}
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

import {
  Button,
  Container,
  Modal,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InventoryIcon from '@mui/icons-material/Inventory';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentsIcon from '@mui/icons-material/Payments';
import TimerIcon from '@mui/icons-material/Timer';
import ImageIcon from '@mui/icons-material/Image';
import { t } from "i18next";
import type { Product } from "../interfaces/productInterface";
import { useProductUpdate } from "../hooks/useProductUpdate";


interface UpdateProductProps {
  open: boolean;
  onClose: () => void;
  editProduct: (product: Product) => void;
  productId: string;
}

export const UpdateProduct = ({ open, onClose, editProduct, productId }: UpdateProductProps) => {

  const { formik, handleClose } = useProductUpdate(productId, editProduct, onClose);

  return (
    <>
      <Modal open={open} onClose={() => { }} disableEscapeKeyDown>
        <Container
          maxWidth="xs"
          sx={{
            marginTop: 8,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 24,
            position: "relative",
            padding: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginBottom: 2, fontWeight: "bold" }}
          >
            {t("registerProduct.update")}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              label={t("registerProduct.title")}
              name="title"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.title}
              helperText={formik.touched.title && formik.errors.title}
              error={formik.touched.title && Boolean(formik.errors.title)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <InventoryIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              style={{ marginTop: "16px" }}
              label={t("registerProduct.description")}
              name="description"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.description}
              helperText={formik.touched.description && formik.errors.description}
              error={formik.touched.description && Boolean(formik.errors.description)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              style={{ marginTop: "16px" }}
              label={t("registerProduct.price")}
              name="price"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.price}
              helperText={formik.touched.price && formik.errors.price}
              error={formik.touched.price && Boolean(formik.errors.price)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaymentsIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              style={{ marginTop: "16px" }}
              label={t("registerProduct.duration")}
              name="duration"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.duration}
              helperText={formik.touched.duration && formik.errors.duration}
              error={formik.touched.duration && Boolean(formik.errors.duration)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimerIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              style={{ marginTop: "16px" }}
              label={t("registerProduct.image")}
              name="image"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.image}
              helperText={formik.touched.image && formik.errors.image}
              error={formik.touched.image && Boolean(formik.errors.image)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <ImageIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <FormControl
              style={{ marginTop: "16px" }}
              fullWidth variant="standard"
              sx={{ mb: 2 }}>
              <InputLabel>{t("registerProduct.status")}</InputLabel>
              <Select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                startAdornment={
                  <InputAdornment position="start">
                    <ManageHistoryIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="active">{t("registerProduct.statusOptions.active")}</MenuItem>
                <MenuItem value="past">{t("registerProduct.statusOptions.past")}</MenuItem>
                <MenuItem value="upcoming">{t("registerProduct.statusOptions.upcoming")}</MenuItem>
              </Select>
              {formik.touched.status && formik.errors.status && (
                <Typography color="error" variant="caption">
                  {formik.errors.status}
                </Typography>
              )}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              {t("registerProduct.update")}
            </Button>
          </form>
        </Container>
      </Modal>
    </>
  );
};




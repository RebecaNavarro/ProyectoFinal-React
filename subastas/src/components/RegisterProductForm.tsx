import {
  Button,
  Container,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentsIcon from '@mui/icons-material/Payments';
import TimerIcon from '@mui/icons-material/Timer';
import InventoryIcon from '@mui/icons-material/Inventory';
import ImageIcon from '@mui/icons-material/Image';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { t } from "i18next";
import { useProductRegister } from "../hooks/useProductRegister";

interface RegisterUsersProps {
  open: boolean;
  onClose: () => void;
}

export const RegisterProduct = ({ open, onClose }: RegisterUsersProps) => {

  const { formik, handleClose } = useProductRegister(onClose);

  return (
    <>
      <Modal open={open} onClose={() => { }} disableEscapeKeyDown>
        <Container
          maxWidth="xs"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 24,
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
            Registro de Votantes
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
              {t("registerProduct.submit")}
            </Button>

          </form>
        </Container>
      </Modal>
    </>
  );
};

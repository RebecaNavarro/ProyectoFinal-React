import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { t } from "i18next";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}

const Sidebar = ({
  mobileOpen,
  handleDrawerToggle,
  isMobile,
}: SidebarProps) => {

  const { isAdmin } = useAuth();
  const location = useLocation();
  const { logout } = useAuth();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/Auctions"
            selected={location.pathname === "/Auctions"}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.auctions")} />
          </ListItemButton>
        </ListItem>
        {isAdmin && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/UserManagement"
              selected={location.pathname === "/UserManagement"}
            >
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary={t("sidebar.userManagement")} />
            </ListItemButton>
          </ListItem>
        )}
        {isAdmin && (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/ProductsManagement"
              selected={location.pathname === "/ProductsManagement" || location.pathname === "/ProductsManagement/:id"}
            >
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary={t("sidebar.productsManagement")} />
            </ListItemButton>
          </ListItem>
          
        )}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            selected={location.pathname === "/"}
            onClick={() => { logout() }}
          >
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary={t("sidebar.logout")} />
          </ListItemButton>
        </ListItem>

      </List>
    </div>
  );



  return (
    <>
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;



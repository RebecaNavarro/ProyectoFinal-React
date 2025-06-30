import { useState, useEffect } from "react";
import { Button, Container, Box, Typography  } from "@mui/material";
import { t } from "i18next";
import { useUserStore } from "../store/userStore";
import { RegisterUsers } from "../components/RegisterUsersForm";
import UsersList from "../components/UsersList";



function UserManagement() {

  const [openRegisterUser, setOpenRegisterUser] = useState(false);
  
  const handleOpenRegisterUser = () => setOpenRegisterUser(true);
 
  const {deleteUser, editUser, fetchUsers, users} = useUserStore();

  const handleCloseRegisterUser = () => {
    setOpenRegisterUser(false);
    fetchUsers()
  }
  
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container sx={{ml:0, mr:0}}>
      <Box display="flex" justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
          onClick={handleOpenRegisterUser}
        >
          {t("userManagement.addUser")}
        </Button>
      </Box>
      <RegisterUsers open={openRegisterUser} onClose={handleCloseRegisterUser} />
      <Typography variant="h4" gutterBottom >
        {t("userManagement.title")}
      </Typography>
      <UsersList 
        users={users} 
        deleteUser={deleteUser} 
        editUser={editUser} 
      />
    </Container>
  );
}

export default UserManagement;

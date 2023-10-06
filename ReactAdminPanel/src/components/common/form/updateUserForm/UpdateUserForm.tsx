import { Button, CircularProgress, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { updateUser } from "../../../../api/userApi";
import { AxiosError } from "axios";
import CustomSnackBar from "../../snackbar/Snackbar";

export default function UpdateUserForm({ user, setOpen }: any) {
  const [role, setRole] = useState<string>(user?.role ?? "");
  const queryClient = useQueryClient();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  console.log("Update USer", user);
  const handleChange = (event: any) => {
    setRole(event.target.value as string);
  };

  const { mutate, isLoading, error, isError } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(["users"]);
      setNotify({
        isOpen: true,
        message: data.message,
        type: "success",
        title: "Success",
      });
      setOpen(false);
    },
    onError: (err: AxiosError) => err,
  });
  const handlesubmit = () => {
    const updatedUser = { ...user, role: role };
    mutate({ id: user._id, value: updatedUser });
  };
  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select role</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={role} label="Age" onChange={handleChange}>
          <MenuItem value={"user"}>User</MenuItem>
          <MenuItem value={"seller"}>Seller</MenuItem>
          <MenuItem value={"admin"}>Admin</MenuItem>
        </Select>
        {isError && <FormHelperText id="my-helper-text">{error.message}</FormHelperText>}
      </FormControl>

      <Stack direction={"row"} justifyContent={"center"} sx={{ mt: 5 }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button fullWidth onClick={handlesubmit}>
            {" "}
            Update User
          </Button>
        )}
      </Stack>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Container>
  );
}

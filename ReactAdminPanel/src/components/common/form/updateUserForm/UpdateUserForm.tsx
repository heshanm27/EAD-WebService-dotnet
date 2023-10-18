import { Button, CircularProgress, Container, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { activateUser, deactivateUser, updateUser } from "../../../../api/userApi";
import { AxiosError } from "axios";
import CustomSnackBar from "../../snackbar/Snackbar";

export default function UpdateUserForm({ user, setOpen }: any) {
  const [role, setRole] = useState<string>(user?.isActive.toString());
  const queryClient = useQueryClient();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const handleChange = (event: any) => {
    setRole(event.target.value as string);
  };

  const { mutate, isLoading, error, isError } = useMutation({
    mutationFn: async () => {
      if (role === "Deactive") {
        await deactivateUser(user.id);
      } else {
        await activateUser(user.id);
      }
    },
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
    onError: (err: any) => {
      queryClient.invalidateQueries(["users"]);
      setNotify({
        isOpen: true,
        message: "USer Update Success",
        type: "success",
        title: "Success",
      });
      setOpen(false);
    },
  });
  const handlesubmit = () => {};
  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select State</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={role} label="Age" onChange={handleChange}>
          <MenuItem value={"true"}>Active</MenuItem>
          <MenuItem value={"false"}>Deactive</MenuItem>
        </Select>
        {isError && <FormHelperText id="my-helper-text">{error.message}</FormHelperText>}
      </FormControl>

      <Stack direction={"row"} justifyContent={"center"} sx={{ mt: 5 }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button fullWidth onClick={() => mutate()}>
            {" "}
            Update User
          </Button>
        )}
      </Stack>
      <CustomSnackBar notify={notify} setNotify={setNotify} />
    </Container>
  );
}

import React, { useContext, useState } from "react";

import { Container, Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Button, FormControl, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import FunctionContext from "../context/Function/FunctionContext";
import StateContext from "../context/Hooks/StateContext";
const Register = () => {
  const { user } = useContext(StateContext);
  const { handleUser, handlePic, RegisterUser } = useContext(FunctionContext);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Typography variant="h4" color="initial" marginBottom={"15px"}>
          Register your account
        </Typography>

        <FormControl margin="dense">
          <TextField
            id="filled-basic"
            label="Enter name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            margin="dense"
            variant="outlined"
            name="name"
            value={user.name}
            onChange={handleUser}
            sx={{ width: "400px" }}
          />
        </FormControl>

        <FormControl margin="dense">
          <TextField
            id="filled-basic"
            label="Enter email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            margin="dense"
            variant="outlined"
            name="email"
            value={user.email}
            onChange={handleUser}
            sx={{ width: "400px" }}
          />
        </FormControl>

        <FormControl margin="dense">
          <TextField
            type={"password"}
            id="filled-basic"
            label="Enter password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            margin="dense"
            variant="outlined"
            name="password"
            value={user.password}
            onChange={handleUser}
            sx={{ width: "400px" }}
          />
        </FormControl>

        <FormControl margin="dense">
          <TextField
            type={"file"}
            onChange={handlePic}
            id="filled-basic"
            margin="dense"
            variant="outlined"
            name="myFile"
            sx={{ width: "400px" }}
          />
        </FormControl>

        <Box>
          <Typography
            sx={{
              marginY: "20px",
              width: "400px",
              color: "#666",
            }}
            paragraph
          >
            Already have an account <Link to="/login">Login</Link>
          </Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            onClick={RegisterUser}
            color="warning"
            sx={{ width: "400px" }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Register;

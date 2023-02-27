import React, { useState } from "react";

import { Container, Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Button, FormControl, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
const Login = () => {
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
          login your account
        </Typography>

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
            Don't have an account <Link to="/register">register</Link>
          </Typography>
        </Box>

        <Box>
          <Button variant="contained" color="warning" sx={{ width: "400px" }}>
            Log in
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;

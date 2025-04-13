import React, { useContext } from "react";

import { Box } from "@mui/system";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";

import FunctionContext from "../../../context/Function/FunctionContext";
import StateContext from "../../../context/State/StateContext";
import { AuthContext } from "../../../context/Authentication/AuthContext";

import BasicLoader from "../../../utils/Loader/BasicLoader";
import InputField from "../components/InputField";

const Register = () => {
  // context
  const { user, isLoading } = useContext(StateContext);
  const { handleUser, postDetailes } = useContext(FunctionContext);
  const { RegisterUser } = useContext(AuthContext);
  // context

  return (
    <>
      {isLoading ? <BasicLoader /> : ""}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
        }}
        className="appeareffect"
      >
        <Typography variant="h4" color="initial" marginBottom={"15px"}>
          Register your account
        </Typography>

        <InputField
          type="name"
          name="name"
          value={user.name}
          onChange={handleUser}
          label={"Enter your name"}
          icon={PersonIcon}
        />
        <InputField
          type="email"
          name="email"
          value={user.email}
          onChange={handleUser}
          label={"Enter your email"}
          icon={PersonIcon}
        />
        <InputField
          type="password"
          name="password"
          value={user.password}
          onChange={handleUser}
          label={"Enter your password"}
          icon={KeyIcon}
        />

        <FormControl margin="dense">
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(e) => postDetailes(e.target.files[0])}
            id="filled-basic"
            margin="dense"
            variant="outlined"
            sx={{ width: "400px" }}
          />
        </FormControl>

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

        <Button
          variant="contained"
          onClick={RegisterUser}
          color="warning"
          sx={{ width: "400px" }}
        >
          Register
        </Button>
      </Box>
    </>
  );
};

export default Register;

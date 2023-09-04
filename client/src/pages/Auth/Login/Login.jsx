import React, { useContext } from "react";

import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import StateContext from "../../../context/State/StateContext";
import FunctionContext from "../../../context/Function/FunctionContext";
import BasicLoader from "../../../utils/Loader/BasicLoader";
import { AuthContext } from "../../../context/Authentication/AuthContext";
import InputField from "../components/InputField";
const Login = () => {
  const { user, isLoading } = useContext(StateContext);
  const { handleUser } = useContext(FunctionContext);
  const { LoginUser } = useContext(AuthContext);

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
          login your account
        </Typography>

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

        <Button
          variant="contained"
          onClick={LoginUser}
          color="warning"
          sx={{ width: "400px" }}
        >
          Log in
        </Button>
      </Box>
    </>
  );
};

export default Login;

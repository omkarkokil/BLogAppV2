import React, { useContext } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import StateContext from "../context/Hooks/StateContext";
import FunctionContext from "../context/Function/FunctionContext";

const Navbar = () => {
  const { isLogin, currentUser } = useContext(StateContext);
  // console.log(currentUser);
  const { logOut } = useContext(FunctionContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isScroll, setIsScroll] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const changeNav = () => {
    const pixel = window.scrollY;

    if (pixel > 100) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };
  var loc = window.location.pathname;
  window.addEventListener("scroll", changeNav);

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          height: "8vh",
          alignItems: "center",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          transition: "all 1s",
          zIndex: 10000,
        }}
        backgroundColor={isScroll ? "#333" : "transparent"}
      >
        <Box sx={{ marginX: "20px" }}>
          <h1
            className="logoFor"
            style={{
              color:
                loc === "/" ? "ghostwhite" : isScroll ? "ghostwhite" : "#000",

              textShadow:
                loc === "/"
                  ? "0 0 5px #333"
                  : isScroll
                  ? "0 0 5px #333"
                  : "none",
            }}
          >
            MagicalWinds
          </h1>
        </Box>
        <Stack
          className="blk"
          direction={{ md: "row", sm: "column" }}
          alignItems={"center"}
          marginX={"20px"}
        >
          <Link
            className="class-a"
            style={{
              color: loc === "/" ? "#fff" : isScroll ? "#fff" : "#000",
            }}
            to="/"
          >
            Home
          </Link>

          <Link
            className="class-a"
            to={"/allBlog"}
            style={{
              color: loc === "/" ? "#fff" : isScroll ? "#fff" : "#000",
            }}
          >
            All Blog
          </Link>

          {isLogin ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    src={`http://localhost:5000/public/${currentUser.pic}`}
                    height={"100%"}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link className="class-a" to={"/myprofile"}>
                  <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                </Link>

                <Link className="class-a" to="/createBlog">
                  <MenuItem onClick={handleCloseUserMenu}>Create Blog</MenuItem>
                </Link>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography onClick={logOut}>LogOut</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link to="/login">
              <Button
                variant="contained"
                sx={{
                  background: "orangered",
                  marginX: "15px",
                  ":hover": { background: "#ff4500ad" },
                }}
              >
                Log in
              </Button>
            </Link>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Navbar;

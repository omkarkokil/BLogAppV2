import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/Authentication/AuthContext";
import StateContext from "../../context/State/StateContext";

const Navbar = () => {
  const { isLogin, currentUser, setOpenSearch } = useContext(StateContext);

  const { logOut } = useContext(AuthContext);
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
  const { pathname } = useLocation();
  const [navOn, setNavOn] = useState(false);
  window.addEventListener("scroll", changeNav);
  if (navOn === true) {
    console.log("Hii");
  }
  const theme = useTheme();

  return (
    <>
      {navOn ? (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            zIndex: 1000,
            left: 0,
            right: 0,
          }}
          onClick={() => setNavOn(false)}
        ></Box>
      ) : (
        ""
      )}
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
        backgroundColor={
          pathname === "/" ? (isScroll ? "#333" : "transparent") : "#fff"
        }
        boxShadow={isScroll ? "0 0 3px #333" : ""}
      >
        <Box sx={{ marginX: "20px" }}>
          <Link to={"/"}>
            <Typography
              variant="h4"
              className="logoFor"
              sx={{
                color: pathname === "/" ? "ghostwhite" : "#000",
                fontWeight: "bold",
                [theme.breakpoints.up("xs")]: {
                  fontSize: "1.2em",
                },
                [theme.breakpoints.up("sm")]: {
                  fontSize: "1.5em",
                },
                [theme.breakpoints.up("md")]: {
                  fontSize: "2em",
                },
              }}
            >
              MagicalWinds
            </Typography>
          </Link>
        </Box>
        <Stack alignItems={"center"} direction={"row"}>
          <IconButton onClick={() => setOpenSearch(true)}>
            <SearchIcon />
          </IconButton>
          <Stack
            className="blk"
            direction={{ md: "row", sm: "column" }}
            alignItems={"center"}
          >
            <IconButton
              className="HamNav"
              sx={{
                color: pathname === "/" ? "#fff" : "#000",
                [theme.breakpoints.up("xs")]: {
                  display: "block",
                },
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              }}
              onClick={() => {
                setNavOn(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Stack
              direction={"row"}
              sx={{
                [theme.breakpoints.up("md")]: {
                  display: "flex",
                },
                [theme.breakpoints.up("xs")]: {
                  display: "none",
                },
                zIndex: 100000,
              }}
              className={navOn ? "navBasic" : ""}
            >
              <Link
                className="class-a"
                style={{
                  color: pathname === "/" ? "#fff" : "#000",
                }}
                to="/"
                onClick={() => setNavOn(false)}
              >
                Home
              </Link>

              <Link
                className="class-a"
                to={"/allBlog"}
                style={{
                  color: pathname === "/" ? "#fff" : "#000",
                }}
                onClick={() => setNavOn(false)}
              >
                All Blog
              </Link>
            </Stack>
          </Stack>
          <Stack mr={"20px"}>
            {isLogin ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={currentUser.pic} height={"100%"} />
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
                    <MenuItem onClick={handleCloseUserMenu}>
                      Create Blog
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography onClick={logOut}>LogOut</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Link to="/login">
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{
                    marginX: "15px",
                    ":hover": { background: "orangered", color: "#fff" },
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Navbar;

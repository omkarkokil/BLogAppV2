import { Avatar, Button, Divider, Typography, useTheme } from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import React, { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../../context/Authentication/AuthContext";
import StateContext from "../../context/State/StateContext";
import MainLoader from "../../utils/Loader/MainLoader";
import BlogData from "../AllBlogs/Blogs/BlogData";

const MyProfile = () => {
  const {
    currentUser,
    otherLoading,
    setOtherLoading,
    getLoginBlog,
    setGetLoginBlog,
  } = useContext(StateContext);
  const { logOut } = useContext(AuthContext);

  const currentUserBlog = useCallback(async () => {
    setOtherLoading(true);
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_GET_CURRENT_USER_BLOG,
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );
      setGetLoginBlog(data);
    } catch (error) {
      console.log(error);
    } finally {
      setOtherLoading(false);
    }
  }, []);

  useEffect(() => {
    currentUserBlog();
  }, []);

  const theme = useTheme();

  console.log("renders");

  return (
    <>
      {/* {otherLoading ? <BasicLoader /> : ""} */}
      {otherLoading ? (
        <MainLoader />
      ) : (
        <Stack
          sx={{
            [theme.breakpoints.up("xs")]: {
              marginTop: "20%",
            },
            [theme.breakpoints.up("sm")]: {
              marginTop: "15%",
            },
            [theme.breakpoints.up("md")]: {
              marginTop: "10%",
            },
          }}
        >
          <Stack alignItems={"center"}>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              width={"50%"}
              direction={"row"}
              sx={{
                [theme.breakpoints.up("xs")]: {
                  flexDirection: "column",
                },
                [theme.breakpoints.up("md")]: {
                  flexDirection: "row",
                },
              }}
            >
              <Stack mx={"50px"}>
                <Avatar
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      width: "110px",
                      height: "110px",
                    },
                    [theme.breakpoints.up("sm")]: {
                      width: "130px",
                      height: "130px",
                    },
                    [theme.breakpoints.up("md")]: {
                      width: "150px",
                      height: "150px",
                    },
                  }}
                >
                  <img src={currentUser.pic} alt="none" height={"100%"} />
                </Avatar>
              </Stack>
              <Stack>
                <Stack
                  direction={"row"}
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      flexDirection: "column",
                    },
                    [theme.breakpoints.up("md")]: {
                      flexDirection: "row",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      [theme.breakpoints.up("xs")]: {
                        mr: "0px",
                      },
                      [theme.breakpoints.up("md")]: {
                        mr: "10px",
                      },
                    }}
                  >
                    {currentUser.name}
                  </Typography>
                  <Button variant="contained" color="warning" onClick={logOut}>
                    Log Out
                  </Button>
                </Stack>
                <Typography variant="h5" my={"10px"}>
                  {currentUser.email}
                </Typography>
                <Typography paragraph>{getLoginBlog.length} Posts</Typography>
              </Stack>
            </Stack>
            <Box width={"60%"} mt="40px">
              <Divider />
              <Typography
                color="orangered"
                fontSize={"1.3em"}
                fontStyle={"italic"}
              >
                Posted Blogs
              </Typography>
            </Box>
          </Stack>
          {getLoginBlog.length <= 0 ? (
            <Typography
              variant="h4"
              textAlign={"center"}
              mt={"20px"}
              color="initial"
            >
              No blogs on the account
            </Typography>
          ) : (
            <Box marginY={"20px"}>
              <BlogData items={getLoginBlog} />
            </Box>
          )}
        </Stack>
      )}
    </>
  );
};

export default MyProfile;

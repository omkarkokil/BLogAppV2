import { Avatar, Button, Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import FunctionContext from "../context/Function/FunctionContext";
import StateContext from "../context/Hooks/StateContext";
import BlogData from "../utils/BlogData";
import MainLoader from "../utils/MainLoader";

const MyProfile = () => {
  const { isLoading, currentUser, getLoginBlog } = useContext(StateContext);
  const { logOut, currentUserBlog } = useContext(FunctionContext);

  useEffect(() => {
    currentUserBlog();
  }, []);
  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <Stack marginTop={"5%"}>
          <Stack alignItems={"center"}>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              width={"50%"}
              direction={"row"}
            >
              <Stack mx={"50px"}>
                <Avatar sx={{ width: "150px", height: "150px" }}>
                  <img
                    src={`http://localhost:5000/public/${currentUser.pic}`}
                    alt="none"
                    height={"100%"}
                  />
                </Avatar>
              </Stack>
              <Stack>
                <Stack direction={"row"}>
                  <Typography variant="h4" mr={"10px"}>
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
          <Box marginY={"20px"}>
            <BlogData items={getLoginBlog} />
          </Box>
        </Stack>
      )}
    </>
  );
};

export default MyProfile;

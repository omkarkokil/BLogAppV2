import { Avatar, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import FunctionContext from "../context/Function/FunctionContext";
import StateContext from "../context/Hooks/StateContext";
import MainLoader from "./MainLoader";

const Blog = () => {
  const { item, isLoading } = useContext(StateContext);
  const { getBlog } = useContext(FunctionContext);
  const { id } = useParams("");
  useEffect(() => {
    getBlog(id);
  }, [window.location.pathname]);

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <Stack alignItems={"center"} marginTop={"5%"}>
          <Stack width={"50%"} alignItems={"center"}>
            <Stack marginY="20px">
              <Typography variant="h1" fontSize={"3.5em"}>
                {item.title}
              </Typography>
            </Stack>
            <Stack width={"100%"}>
              <img
                src={`http://localhost:5000/public/${item.blogPic}`}
                alt="none"
              />
            </Stack>
            <Stack marginY="10px">
              <Typography paragraph>{item.desc}</Typography>
            </Stack>
            <Stack width={"100%"} direction={"row"} alignItems={"flex-start"}>
              <Stack>
                <Avatar>
                  <img
                    src={`http://localhost:5000/public/${item.userPic}`}
                    alt=""
                    height={"100%"}
                  />
                </Avatar>
              </Stack>
              <Stack>
                <Typography paragraph>{item.name}</Typography>
                <Typography paragraph>{item.date}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Blog;

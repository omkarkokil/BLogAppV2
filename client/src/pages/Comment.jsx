import { Avatar, Divider, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import FunctionContext from "../context/Function/FunctionContext";
import StateContext from "../context/Hooks/StateContext";
import MainLoader from "../utils/MainLoader";
import Timestamp from "react-timestamp";

const Comment = () => {
  const { isLoading, allComments } = useContext(StateContext);
  const { getAllComments } = useContext(FunctionContext);

  const { id } = useParams("");
  useEffect(() => {
    getAllComments(id);
  }, [window.location.pathname]);

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <Stack alignItems={"center"} marginTop={"5%"}>
          <Box marginY={"10px"} width={"80%"}>
            <Divider />

            <Typography
              color="orangered"
              fontSize={"1.3em"}
              fontStyle={"italic"}
            >
              Posted comments
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              marginTop={"20px"}
            >
              <Typography variant="h4">{`${allComments.length} comments`}</Typography>
            </Stack>
          </Box>
          {allComments.map((ele, id) => {
            return (
              <Stack width="80%" marginY="10px" key={id}>
                <Stack direction={"row"} alignItems="center" marginY="10px">
                  <Avatar sx={{ marginRight: "10px" }}>
                    <img
                      src={`https://magicalwinds.onrender.com/public/${ele.author.pic}`}
                      alt="none"
                      height={"100%"}
                    />
                  </Avatar>
                  <Typography>
                    {ele.author.name} on <Timestamp date={ele.createdAt} />
                  </Typography>
                </Stack>
                <Stack
                  boxShadow={"0 0 3px #333"}
                  padding={"7px 20px"}
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={"5px"}
                  width={"max-content"}
                  color={"#fff"}
                  backgroundColor="orangered"
                >
                  <Typography>{ele.comment}</Typography>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      )}
    </>
  );
};

export default Comment;

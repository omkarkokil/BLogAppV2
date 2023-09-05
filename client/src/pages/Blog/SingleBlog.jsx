import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FunctionContext from "../../context/Function/FunctionContext";
import StateContext from "../../context/State/StateContext";
import MainLoader from "../../utils/Loader/MainLoader";

import BasicLoader from "../../utils/Loader/BasicLoader";
import { BlogContext } from "../../context/Blogs/BlogContext";
import { CommentContext } from "../../context/Comment/CommentContext";
import AuthorData from "./components/AuthorData/AuthorData";
import Blog from "./components/Blog/Blog";
import MakeComment from "./components/Comment/MakeComment";

const SingleBlog = () => {
  const {
    item,
    isLoading,
    comments,
    allComments,
    makeComment,
    otherLoading,
    items,
  } = useContext(StateContext);
  const { handleComment } = useContext(FunctionContext);
  const { createComment, getAllComments } = useContext(CommentContext);
  const { getBlog } = useContext(BlogContext);
  const { id } = useParams("");

  useEffect(() => {
    getBlog(id);
    getAllComments(id);
  }, [window.location.pathname]);

  const getAuthorBlogs = items.filter((Blog) => {
    return Blog._id !== id && Blog.userId === item.userId;
  });

  const theme = useTheme();

  return (
    <>
      {otherLoading ? <BasicLoader /> : ""}
      {isLoading ? (
        <MainLoader />
      ) : (
        <Stack pt="80px" px={"20px"} direction={"row"}>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              [theme.breakpoints.up("xs")]: {
                width: "100%",
              },
              [theme.breakpoints.up("xl")]: {
                width: "70%",
              },
            }}
          >
            <Blog />
            <MakeComment id={id} />
          </Stack>

          <Stack
            my={"10px"}
            sx={{
              [theme.breakpoints.up("xs")]: {
                display: "none",
              },
              [theme.breakpoints.up("xl")]: {
                display: "block",
              },
            }}
            px={"40px"}
            width={"30%"}
          >
            <AuthorData id={id} />
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default SingleBlog;

import { useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import StateContext from "../../context/State/StateContext";
import MainLoader from "../../utils/Loader/MainLoader";

import { BlogContext } from "../../context/Blogs/BlogContext";
import { CommentContext } from "../../context/Comment/CommentContext";
import BasicLoader from "../../utils/Loader/BasicLoader";
import AuthorData from "./components/AuthorData/AuthorData";
import Blog from "./components/Blog/Blog";
import MakeComment from "./components/Comment/MakeComment";

const SingleBlog = () => {
  const {
    isLoading,

    otherLoading,
  } = useContext(StateContext);
  const { getAllComments } = useContext(CommentContext);
  const { getBlog } = useContext(BlogContext);
  const { id } = useParams("");

  useEffect(() => {
    getBlog(id);
    getAllComments(id);
    // eslint-disable-next-line
  }, [window.location.pathname]);

  // const getAuthorBlogs = items.filter((Blog) => {
  //   return Blog._id !== id && Blog.userId === item.userId;
  // });

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
              [theme.breakpoints.down("md")]: {
                width: "100%",
              },
              [theme.breakpoints.up("md")]: {
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
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
              [theme.breakpoints.up("md")]: {
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

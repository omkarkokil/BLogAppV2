import { Stack } from "@mui/system";
import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import MainLoader from "../../utils/Loader/MainLoader";
import StateContext from "../../context/State/StateContext";
import FunctionContext from "../../context/Function/FunctionContext";
import BlogData from "./Blogs/BlogData";
import { BlogContext } from "../../context/Blogs/BlogContext";
import { useLocation } from "react-router-dom";

const MainBlog = () => {
  const { items } = useContext(StateContext);
  const { getBlogs } = useContext(BlogContext);
  const loc = useLocation();

  useEffect(() => {
    getBlogs();
  }, [loc.pathname === "/allBlog"]);

  return (
    <>
      <>
        <Box paddingTop={"100px"}>
          <BlogData items={items} />
        </Box>
      </>
    </>
  );
};

export default MainBlog;

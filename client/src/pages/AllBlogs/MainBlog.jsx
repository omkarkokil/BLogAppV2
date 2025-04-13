import Box from "@mui/material/Box";
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BlogContext } from "../../context/Blogs/BlogContext";
import StateContext from "../../context/State/StateContext";
import BlogData from "./Blogs/BlogData";

const MainBlog = () => {
  const { items } = useContext(StateContext);
  const { getBlogs } = useContext(BlogContext);
  const loc = useLocation();

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
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

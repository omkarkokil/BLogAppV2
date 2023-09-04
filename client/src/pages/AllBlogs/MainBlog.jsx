import { Stack } from "@mui/system";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import MainLoader from "../../utils/Loader/MainLoader";
import StateContext from "../../context/State/StateContext";
import FunctionContext from "../../context/Function/FunctionContext";
import BlogData from "./Blogs/BlogData";

const MainBlog = () => {
  const { isLoading, items, search, select } = useContext(StateContext);
  const { handleSearch, handleSelect } = useContext(FunctionContext);
  const theme = useTheme();
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

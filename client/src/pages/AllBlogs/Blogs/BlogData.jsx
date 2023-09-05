import { Stack, Chip, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";

import { useLocation } from "react-router-dom";
import StateContext from "../../../context/State/StateContext";
import { BlogContext } from "../../../context/Blogs/BlogContext";
import InfiniteScroll from "react-infinite-scroll-component";
import MainLoader from "../../../utils/Loader/MainLoader";
import BlogCard from "./Components/BlogCard";

const BlogData = (props) => {
  const loc = useLocation("");
  const { isLoading, setPage, hasMore, FillterData } = useContext(StateContext);

  const { fetchData, GetFiltter } = useContext(BlogContext);

  const theme = useTheme();

  const chips = [
    { label: "all", color: "primary" },
    { label: "Education", color: "warning" },
    { label: "Technology", color: "secondary" },
    { label: "Sports", color: "success" },
    { label: "polytics", color: "info" },
    { label: "Entertainment", color: "error" },
  ];
  useEffect(() => {
    setPage(2);
  }, [loc]);
  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          <Stack width={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Stack
              overflow={"auto"}
              width="90%"
              justifyContent={{ xs: "flex-start", sm: "center" }}
              gap="10px"
              sx={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              direction={"row"}
            >
              {loc.pathname === "/allBlog" &&
                chips.map((ele, id) => (
                  <Chip
                    variant={ele.label === FillterData ? "filled" : "outlined"}
                    color={ele.color}
                    onClick={() => GetFiltter(ele.label)}
                    key={id}
                    sx={{ cursor: "pointer" }}
                    label={ele.label}
                  />
                ))}
            </Stack>
          </Stack>
          <InfiniteScroll
            dataLength={props.items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={
              window.location.pathname.includes("/myprofile") ? (
                ""
              ) : (
                <h4>Loading...</h4>
              )
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Stack alignItems={"center"} justifyContent="center">
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "5px",
                  justifyContent: "flex-start",
                  "& > :not(style)": {
                    m: 1,

                    height: "max-content",
                    marginTop: "30px",

                    [theme.breakpoints.down("lg")]: {
                      width: "350px",
                    },
                    [theme.breakpoints.down("md")]: {
                      width: "90%",
                    },
                  },

                  [theme.breakpoints.down("xl")]: {
                    gridTemplateColumns: "repeat(3, 1fr)",
                  },
                  [theme.breakpoints.down("lg")]: {
                    gridTemplateColumns: "repeat(2, .5fr)",
                  },
                  [theme.breakpoints.down("md")]: {
                    gridTemplateColumns: "repeat(1, 100%)",
                    placeItems: "center",
                    width: "100%",
                  },
                }}
              >
                {props.items.map((ele, id) => {
                  return <BlogCard ele={ele} key={id} chips={chips} />;
                })}
              </Box>
            </Stack>
          </InfiniteScroll>
        </>
      )}
    </>
  );
};

export default BlogData;

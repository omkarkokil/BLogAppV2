import { Chip, Stack, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import { BlogContext } from "../../../context/Blogs/BlogContext";
import StateContext from "../../../context/State/StateContext";
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
    // eslint-disable-next-line
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
            className="Infinite-scroll-remove"
            style={{ marginBottom: "150px" }}
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
                  display: "flex",
                  gap: "5px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  "& > :not(style)": {
                    m: 1,

                    height: "max-content",
                    marginTop: "30px",

                    [theme.breakpoints.down("xl")]: {
                      width: "350px",
                    },

                    [theme.breakpoints.down("md")]: {
                      width: "90%",
                    },
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

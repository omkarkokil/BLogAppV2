import {
  Avatar,
  CardHeader,
  Stack,
  SvgIcon,
  Chip,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StateContext from "../../../context/State/StateContext";
import { BlogContext } from "../../../context/Blogs/BlogContext";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import EastIcon from "@mui/icons-material/East";
import { format } from "date-fns";
import MainLoader from "../../../utils/Loader/MainLoader";
import { AuthContext } from "../../../context/Authentication/AuthContext";
import BlogCard from "./Components/BlogCard";

const BlogData = (props) => {
  const loc = useLocation("");
  const {
    currentUser,
    isLoading,
    page,
    setPage,
    setItems,
    setIsLoading,
    setGetLoginBlog,
  } = useContext(StateContext);

  const [FillterData, setFillterData] = useState("all");
  const [hasMore, setHasMore] = useState(true);
  const theme = useTheme();

  const chips = [
    { label: "all", color: "primary" },
    { label: "Education", color: "warning" },
    { label: "Technology", color: "secondary" },
    { label: "Sports", color: "success" },
    { label: "polytics", color: "info" },
    { label: "Entertainment", color: "error" },
  ];

  const getBlogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(process.env.REACT_APP_GET_ALL_BLOGS, {
        params: {
          page: 1,
          limit: 5,
          items: FillterData,
        },
      });
      setItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    setPage(2);
  }, [loc]);

  const fetchData = async () => {
    try {
      if (page >= 1) {
        const { data } = await axios.get(
          "http://localhost:5000/api/blog/getAllBlogs",
          {
            params: {
              page: page,
              items: FillterData,
            },
          }
        );
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setItems((prevItems) => [...prevItems, ...data]);
          setPage((prevPage) => prevPage + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetFiltter = async (items) => {
    try {
      setPage(1);
      setHasMore(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/blog/getAllBlogs",
        {
          params: {
            items: items,
            page: 1,
          },
        }
      );

      setItems(data);
      setPage((prevPage) => prevPage + 1);
      setFillterData(items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          <Stack
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"10px"}
            direction={"row"}
          >
            {chips.map((ele, id) => (
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
                  gap: "10px",
                  justifyContent: "flex-start",
                  "& > :not(style)": {
                    m: 1,
                    width: 350,
                    height: "max-content",
                    marginTop: "30px",
                  },

                  [theme.breakpoints.down("xl")]: {
                    gridTemplateColumns: "repeat(3, 1fr)",
                  },
                  [theme.breakpoints.down("lg")]: {
                    gridTemplateColumns: "repeat(2, .5fr)",
                  },
                  [theme.breakpoints.down("sm")]: {
                    gridTemplateColumns: "repeat(1, 1fr)",
                  },
                }}
              >
                {props.items.map((ele, id) => {
                  return <BlogCard ele={ele} chips={chips} />;
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

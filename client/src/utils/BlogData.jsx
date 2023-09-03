import {
  Avatar,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Chip,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StateContext from "../context/Hooks/StateContext";
import FunctionContext from "../context/Function/FunctionContext";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import EastIcon from "@mui/icons-material/East";

const BlogData = (props) => {
  const loc = useParams("");
  const { currentUser, select, search, page, setPage, setItems, setIsLoading } =
    useContext(StateContext);
  const [FillterData, setFillterData] = useState([]);
  const { deleteBlog, currentUserBlog } = useContext(FunctionContext);
  const [hasMore, setHasMore] = useState(true);
  const theme = useTheme();

  const chips = [
    { label: "all", color: "primary", active: true, href: "/" },
    { label: "Education", color: "warning", active: false, href: "/" },
    { label: "Technology", color: "secondary", active: false, href: "/" },
    { label: "Sports", color: "success", active: false, href: "/" },
    { label: "Polytics", color: "info", active: false, href: "/" },
    { label: "Entertainment", color: "error", active: false, href: "/" },
  ];

  const fetchData = async () => {
    try {
      if (page > 0) {
        const { data } = await axios.get(
          "https://magicalwinds.onrender.com/api/blog/getAllBlogs",
          {
            params: {
              page: page,
              items: FillterData,
            },
          }
        );
        setItems((items) => [...items, ...data]);
        setPage((productPage) => productPage + 1);
        console.log(data.length);

        if (data.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetFiltter = async (items) => {
    setIsLoading(true);
    setFillterData(items);
    const { data } = await axios.get("/api/blog/getAllBlogs", {
      params: {
        items: items,
      },
    });

    setItems(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setPage(2);
    setHasMore(true);
  }, [loc.pathname]);

  return (
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
            variant={ele.active ? "filled" : "outlined"}
            color={ele.color}
            onClick={() => {
              GetFiltter(ele.label);
            }}
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
              return (
                <Card
                  elevation={3}
                  sx={{ maxWidth: 400, px: "10px", pb: "10px" }}
                  key={id}
                >
                  {loc === "/myprofile" || ele._id === currentUser._id ? (
                    ""
                  ) : (
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe">
                          <img src={ele.userPic} height="100%" alt="" />{" "}
                        </Avatar>
                      }
                      title={ele.name}
                      subheader={ele.date}
                    />
                  )}

                  <CardMedia
                    sx={{
                      height: 200,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      borderRadius: "5px",
                    }}
                    image={ele.blogPic}
                  >
                    <Box m={"5px"}>
                      <Chip
                        variant="filled"
                        sizes="medium"
                        color={
                          ele.category === "polytics"
                            ? `primary`
                            : ele.category === "Technology"
                            ? "secondary"
                            : ele.category === "Education"
                            ? "warning"
                            : ele.category === "sports"
                            ? "success"
                            : "error"
                        }
                        label={ele.category}
                      />
                    </Box>
                  </CardMedia>
                  <CardContent>
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "200px",
                      }}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {ele.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ele.desc.slice(0, 100)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Stack
                      direction={"row"}
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Link to={`/blog/${ele._id}`}>
                        <Button variant="contained" size="small">
                          Read More{" "}
                          <EastIcon sx={{ ml: "5px", fontSize: "1.3em" }} />
                        </Button>
                      </Link>
                      {loc === "/myprofile" || ele._id === currentUser._id ? (
                        <Stack direction={"row"} justifyContent="center">
                          <Link to={`/editBlog/${ele._id}`}>
                            <SvgIcon color="success">
                              <EditIcon />
                            </SvgIcon>
                          </Link>
                          <div>
                            <SvgIcon
                              color="error"
                              sx={{
                                ":hover": {
                                  cursor: "pointer",
                                },
                              }}
                            >
                              <DeleteIcon
                                onClick={() => {
                                  deleteBlog(ele._id);
                                }}
                              />
                            </SvgIcon>
                          </div>
                        </Stack>
                      ) : (
                        ""
                      )}
                    </Stack>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        </Stack>
      </InfiniteScroll>
    </>
  );
};

export default BlogData;

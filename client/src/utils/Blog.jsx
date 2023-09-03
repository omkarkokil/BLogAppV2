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
import FunctionContext from "../context/Function/FunctionContext";
import StateContext from "../context/Hooks/StateContext";
import MainLoader from "./MainLoader";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import FormControl from "@mui/material/FormControl";
import Timestamp from "react-timestamp";
import BasicLoader from "./BasicLoader";

const Blog = () => {
  const {
    item,
    isLoading,
    comments,
    allComments,
    makeComment,
    otherLoading,
    items,
  } = useContext(StateContext);
  const {
    getBlog,
    getComments,
    createComment,
    handleComment,
    getAllComments,
    getBlogs,
  } = useContext(FunctionContext);
  const { id } = useParams("");

  useEffect(() => {
    getBlog(id);
    getBlogs();
    getComments(id);
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
        <Stack pt="80px" direction={"row"}>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              width: "70%",
            }}
          >
            <Stack px={"20px"}>
              <Stack marginY="10px">
                <Paper
                  component="img"
                  height={350}
                  width={"100%"}
                  sx={{ objectFit: "cover", borderRadius: "10px" }}
                  src={item.blogPic}
                />
              </Stack>
              <Stack
                width={"100%"}
                textAlign={"center"}
                my={"10px"}
                justifyContent={"center"}
              >
                <Typography
                  variant="h1"
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      fontSize: "1.7em",
                    },
                    [theme.breakpoints.up("sm")]: {
                      fontSize: "2.2em",
                    },
                  }}
                  fontWeight={"600"}
                  letterSpacing={1.3}
                >
                  {item.title}
                </Typography>
              </Stack>

              <Stack
                direction={"row"}
                width={"100%"}
                mb={"20px"}
                justifyContent={"space-between"}
              >
                <Typography variant="body1" color="orange">
                  Author : {item.name}
                </Typography>
                <Typography variant="body1" color="orange">
                  {item.date}
                </Typography>
              </Stack>
              <Box
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    fontSize: ".9em",
                  },
                  [theme.breakpoints.up("sm")]: {
                    fontSize: ".9em",
                  },
                  ":first-letter": {
                    marginLeft: "20px",
                    fontSize: "30px",
                    fontWeight: "600",
                  },
                }}
                dangerouslySetInnerHTML={{ __html: item.blog }}
              ></Box>
            </Stack>
            <Box marginY={"10px"} width={"90%"}>
              <Divider />
              <Typography
                fontSize={"1.3em"}
                color="orangered"
                fontStyle={"italic"}
              >
                Add a comment
              </Typography>
            </Box>
            <Stack width="90%" marginY={"20px"}>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Comment
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        sx={{
                          display:
                            makeComment === undefined || makeComment === ""
                              ? "none"
                              : "block",
                        }}
                        onClick={() => {
                          createComment(id);
                        }}
                      >
                        <SendIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  }
                  onChange={handleComment}
                  value={makeComment}
                  label="comment"
                />
              </FormControl>
            </Stack>
            {comments.length <= 0 ? (
              <Box mb={"20px"}>
                <Typography
                  variant="h4"
                  sx={{
                    [theme.breakpoints.up("xs")]: {
                      fontSize: ".9em",
                    },
                    [theme.breakpoints.up("sm")]: {
                      fontSize: "1.5em",
                    },
                  }}
                >
                  No Comment on this blog
                </Typography>
              </Box>
            ) : (
              <Box width={"80%"}>
                <Box marginY={"10px"}>
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
                    <Link to={`/comment/${id}`}>
                      <Button variant="contained">Show all</Button>
                    </Link>
                  </Stack>
                </Box>

                {comments.map((ele, id) => {
                  return (
                    <Stack width="80%" marginY="10px" key={id}>
                      <Stack
                        direction={"row"}
                        alignItems="center"
                        marginY="10px"
                      >
                        <Avatar sx={{ marginRight: "10px" }}>
                          <img
                            src={ele.author.pic}
                            alt="none"
                            height={"100%"}
                          />
                        </Avatar>
                        <Typography>
                          {ele.author.name} on{" "}
                          <Timestamp date={ele.createdAt} />
                        </Typography>
                      </Stack>
                      <Stack
                        boxShadow={"0 0 3px #333"}
                        padding={"7px 20px"}
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={"5px"}
                        width={"max-content"}
                        color={"orangered"}
                        backgroundColor={"#fff"}
                      >
                        <Typography>{ele.comment}</Typography>
                      </Stack>
                    </Stack>
                  );
                })}
              </Box>
            )}
          </Stack>

          <Stack my={"10px"} px={"40px"} width={"30%"}>
            <Typography my={"10px"} variant="h5">
              About Author
            </Typography>

            <Paper
              component="img"
              height={200}
              width={200}
              sx={{ objectFit: "cover", borderRadius: "10px" }}
              src={item.userPic}
            />

            <Typography
              variant="body2"
              sx={{
                ":first-letter": {
                  fontSize: "30px",
                  fontWeight: "600",
                },
                color: "#888",
              }}
            >
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </Typography>

            <Box my={"10px"}>
              <Box width={"100%"} backgroundColor={"#888"} height={"5px"}></Box>
              <Typography my={"10px"} variant="h5">
                More blogs by author
              </Typography>
            </Box>
            <Stack gap={"20px"}>
              {getAuthorBlogs.length <= 0 ? (
                <Typography variant="h6" color="initial">
                  No Blogs have been written by user
                </Typography>
              ) : (
                getAuthorBlogs?.slice(0, 3).map((ele, id) => (
                  <Link to={`/blog/${ele._id}`} key={id}>
                    <Stack gap={"10px"} direction={"row"}>
                      <Paper
                        component="img"
                        width={120}
                        height={120}
                        sx={{ objectFit: "cover", borderRadius: "10px" }}
                        src={ele.blogPic}
                      />
                      <Box>
                        <Typography variant="h6" color="initial">
                          {ele.title}
                        </Typography>
                        <Typography variant="body2" color="#888">
                          {ele.desc.slice(0, 50)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                ))
              )}
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Blog;

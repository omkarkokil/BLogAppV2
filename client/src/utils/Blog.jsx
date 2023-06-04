import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
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
    setMakeComment,
  } = useContext(StateContext);
  const { getBlog, getComments, createComment, handleComment, getAllComments } =
    useContext(FunctionContext);
  const { id } = useParams("");
  useEffect(() => {
    getBlog(id);
  }, [window.location.pathname]);

  useEffect(() => {
    getComments(id);
  }, [window.location.pathname]);

  useEffect(() => {
    getAllComments(id);
  }, [window.location.pathname]);

  const theme = useTheme();

  return (
    <>
      {isLoading ? <BasicLoader /> : ""}
      {!item.blogPic ? (
        <MainLoader />
      ) : (
        <Stack
          alignItems={"center"}
          sx={{
            [theme.breakpoints.up("xs")]: {
              marginTop: "20%",
            },
            [theme.breakpoints.up("sm")]: {
              marginTop: "15%",
            },
            [theme.breakpoints.up("md")]: {
              marginTop: "10%",
            },
          }}
        >
          <Stack
            sx={{
              [theme.breakpoints.up("xs")]: {
                width: "90%",
              },
              [theme.breakpoints.up("sm")]: {
                width: "80%",
              },
              [theme.breakpoints.up("md")]: {
                width: "50%",
              },
            }}
          >
            <Stack marginY="20px">
              <Typography
                variant="h1"
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    fontSize: "2.7em",
                  },
                  [theme.breakpoints.up("sm")]: {
                    fontSize: "3.2em",
                  },
                }}
                fontWeight={"bold"}
              >
                {item.title}
              </Typography>
            </Stack>
            <Stack width={"100%"}>
              <img src={item.blogPic} alt="none" />
            </Stack>
            <Stack my={"10px"}>
              <Chip
                color="warning"
                sx={{ width: "150px" }}
                label={item.category}
              />
            </Stack>

            <Box
              sx={{
                [theme.breakpoints.up("xs")]: {
                  fontSize: ".9em",
                },
                [theme.breakpoints.up("sm")]: {
                  fontSize: "1.05em",
                },
              }}
              dangerouslySetInnerHTML={{ __html: item.blog }}
            ></Box>
            <Stack width={"100%"} direction={"row"} alignItems={"flex-start"}>
              <Stack>
                <Avatar sx={{ height: "50px", width: "50px" }}>
                  <img src={item.userPic} alt="" height={"100%"} />
                </Avatar>
              </Stack>
              <Stack marginX={"10px"}>
                <Typography>{item.name}</Typography>
                <Typography>{item.date}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Box marginY={"10px"} width={"80%"}>
            <Divider />
            <Typography
              fontSize={"1.3em"}
              color="orangered"
              fontStyle={"italic"}
            >
              Add a comment
            </Typography>
          </Box>
          <Stack width="70%" marginY={"20px"}>
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
                    <Stack direction={"row"} alignItems="center" marginY="10px">
                      <Avatar sx={{ marginRight: "10px" }}>
                        <img src={ele.author.pic} alt="none" height={"100%"} />
                      </Avatar>
                      <Typography>
                        {ele.author.name} on <Timestamp date={ele.createdAt} />
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
      )}
    </>
  );
};

export default Blog;

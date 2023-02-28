import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
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

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <Stack alignItems={"center"} marginTop={"5%"}>
          <Stack width={"50%"}>
            <Stack marginY="20px">
              <Typography variant="h1" fontSize={"3.2em"} fontWeight={"bold"}>
                {item.title}
              </Typography>
            </Stack>
            <Stack width={"100%"}>
              <img
                src={`http://localhost:5000/public/${item.blogPic}`}
                alt="none"
              />
            </Stack>
            <Stack marginY="10px">
              <Typography paragraph>{item.desc}</Typography>
            </Stack>
            <Stack width={"100%"} direction={"row"} alignItems={"flex-start"}>
              <Stack>
                <Avatar sx={{ height: "50px", width: "50px" }}>
                  <img
                    src={`http://localhost:5000/public/${item.userPic}`}
                    alt=""
                    height={"100%"}
                  />
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
                name="makeComment"
                onChange={handleComment}
                label="comment"
              />
            </FormControl>
          </Stack>
          <Box marginY={"10px"} width={"80%"}>
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
                    <img
                      src={`http://localhost:5000/public/${ele.author.pic}`}
                      alt="none"
                      height={"100%"}
                    />
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
                  color={"#fff"}
                  backgroundColor="orangered"
                >
                  <Typography>{ele.comment}</Typography>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      )}
    </>
  );
};

export default Blog;

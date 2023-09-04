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
import { Link } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import FormControl from "@mui/material/FormControl";
import Timestamp from "react-timestamp";
import { CommentContext } from "../../../../context/Comment/CommentContext";
import StateContext from "../../../../context/State/StateContext";
import FunctionContext from "../../../../context/Function/FunctionContext";

const MakeComment = ({ id }) => {
  const { makeComment, allComments } = useContext(StateContext);
  const { handleComment } = useContext(FunctionContext);
  const { createComment } = useContext(CommentContext);
  return (
    <>
      <Box marginY={"10px"} width={"95%"}>
        <Divider />
        <Typography fontSize={"1.3em"} color="orangered" fontStyle={"italic"}>
          Add a comment
        </Typography>
      </Box>
      <Stack width="90%" marginY={"20px"}>
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Comment</InputLabel>
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

      {allComments.length <= 0 ? (
        <Typography
          mb={"20px"}
          variant="h4"
          fontSize={{ sm: "1.5em", xs: ".9em" }}
        >
          No Comment on this blog
        </Typography>
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

          {allComments.slice(0, 5).map((ele, id) => {
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
                  sx={{
                    boxShadow: "0 0 3px #333",
                    padding: "7px 20px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                    width: "max-content",
                    color: "orangered",
                    backgroundColor: "#fff",
                  }}
                >
                  <Typography>{ele.comment}</Typography>
                </Stack>
              </Stack>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default MakeComment;

import SendIcon from "@mui/icons-material/Send";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Stack } from "@mui/system";
import { format } from "date-fns";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CommentContext } from "../../../../context/Comment/CommentContext";
import FunctionContext from "../../../../context/Function/FunctionContext";
import StateContext from "../../../../context/State/StateContext";

const MakeComment = ({ id }) => {
  const { makeComment, allComments } = useContext(StateContext);
  const { handleComment } = useContext(FunctionContext);
  const { createComment } = useContext(CommentContext);
  return (
    <>
      <Box marginY={"10px"} width={"100%"}>
        <Divider />
        <Typography fontSize={"1.3em"} color="orangered" fontStyle={"italic"}>
          Add a comment
        </Typography>
      </Box>
      <Stack width="100%" marginY={"20px"}>
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
        <Box width={"100%"}>
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
              <Typography variant="h5">{`${allComments.length} comments`}</Typography>
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
                  <Box>
                    <Typography color={"#888"} variant="body2">
                      {ele.author.name}
                    </Typography>
                    <Typography color={"#888"} variant="body2">
                      {format(Date.now(ele.createdAt), "dd-MM-yyyy")}
                    </Typography>
                  </Box>
                </Stack>
                <Stack>
                  <Typography px={"5px"} variant="body1">
                    {ele.comment}
                  </Typography>
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

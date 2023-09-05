import React, { useContext } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  FormControl,
  Paper,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import FunctionContext from "../../context/Function/FunctionContext";
import StateContext from "../../context/State/StateContext";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BasicLoader from "../../utils/Loader/BasicLoader";
import { BlogContext } from "../../context/Blogs/BlogContext";
import AddIcon from "@mui/icons-material/Add";

const CreateBlog = () => {
  const { user, select, blog, blogdesc, setBlogdesc, isLoading, isLogin } =
    useContext(StateContext);
  const { handleSelect, handleBlog, handleOpen, postDetailes } =
    useContext(FunctionContext);

  const { createBlog } = useContext(BlogContext);

  const formats = ["bold"];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],

      ["clean", "link", "video"],
    ],
  };

  const { pic } = useContext(StateContext);

  const theme = useTheme();

  return (
    <>
      {isLoading ? <BasicLoader /> : ""}
      <Box
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          pt: "70px",
          px: "20px",
        }}
        className="appeareffect"
      >
        <Paper
          component={"img"}
          width={"100%"}
          alt="Add your image"
          sx={{
            objectFit: "cover",
            borderRadius: "10px",
            backgroundColor: "#888",
            [theme.breakpoints.up("xs")]: {
              height: "200px",
            },
            [theme.breakpoints.up("md")]: {
              height: "350px",
            },
          }}
          src={
            pic
              ? pic
              : "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          }
        />

        <Box className="outlineNone" width={"200px"}>
          <FormControl fullWidth margin="dense">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              value={select}
              inputProps={{ "aria-label": "Choose Category" }}
              onChange={handleSelect}
            >
              <MenuItem value="">
                <em>Choose Category</em>
              </MenuItem>
              <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
              <MenuItem value={"Education"}>Education</MenuItem>
              <MenuItem value={"Sports"}>Sports</MenuItem>
              <MenuItem value={"Technology"}>Technology</MenuItem>
              <MenuItem value={"polytics"}>polytics</MenuItem>
              <MenuItem value={"Vlogs"}>Vlogs</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack
            className="outlineNone"
            direction={"row"}
            width="100%"
            alignItems={"center"}
          >
            <label style={{ cursor: "pointer" }} htmlFor="fileInput">
              <Avatar>
                <AddIcon />
              </Avatar>
            </label>
            <input
              type={"file"}
              onChange={(e) => postDetailes(e.target.files[0])}
              id="fileInput"
              style={{ display: "none" }}
            />

            <TextField
              type="text"
              placeholder="Title"
              id="input"
              sx={{
                width: "100%",
              }}
              name="title"
              value={blog.title}
              onChange={handleBlog}
            />
          </Stack>
          <Button
            variant="contained"
            onClick={createBlog}
            sx={{ px: "30px", width: "max-content" }}
            color="warning"
          >
            Publish
          </Button>
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <ReactQuill
            theme="bubble"
            placeholder="Tell your story..."
            style={{ width: "100%", height: "fit-content" }}
            modules={modules}
            value={blogdesc}
            onChange={setBlogdesc}
          />
        </Stack>
      </Box>
    </>
  );
};

export default CreateBlog;

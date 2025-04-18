import React, { useContext, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import { Button, FormControl, Stack, TextField, useTheme } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import ReactQuill from "react-quill";
import { useLocation, useParams } from "react-router-dom";
import { BlogContext } from "../context/Blogs/BlogContext";
import FunctionContext from "../context/Function/FunctionContext";
import StateContext from "../context/State/StateContext";
import BasicLoader from "../utils/Loader/BasicLoader";
import MainLoader from "../utils/Loader/MainLoader";
const EditBlog = () => {
  const { blog, setBlogdesc, blogdesc, isLoading, otherLoading } =
    useContext(StateContext);
  const { handleBlog } = useContext(FunctionContext);
  const { editBlog, getBlog } = useContext(BlogContext);
  const loc = useLocation();
  const { id } = useParams("");

  useEffect(() => {
    getBlog(id);
    // eslint-disable-next-line
  }, [loc.pathname]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown

      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ script: "sub" }, { script: "super" }], // superscript/subscript

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ align: [] }],

      ["clean", "link", "video"],
    ],
  };

  const theme = useTheme();
  return (
    <>
      {otherLoading ? <BasicLoader /> : ""}
      {isLoading ? (
        <MainLoader />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "100px",
            flexDirection: "column",
          }}
          className="appeareffect"
        >
          <Box
            sx={{
              [theme.breakpoints.up("xs")]: {
                width: "350px",
              },
              [theme.breakpoints.up("sm")]: {
                width: "610px",
              },
              [theme.breakpoints.up("md")]: {
                width: "810px",
              },
              [theme.breakpoints.up("lg")]: {
                width: "1010px",
              },
            }}
          >
            <Typography variant="h4" color="initial" marginBottom={"15px"}>
              Edit Blog
            </Typography>
          </Box>

          <Stack
            direction={"row"}
            sx={{
              [theme.breakpoints.up("xs")]: {
                flexDirection: "column",
              },
              [theme.breakpoints.up("lg")]: {
                flexDirection: "row",
              },
            }}
          >
            <FormControl margin="dense">
              <TextField
                id="filled-basic"
                label="Enter title"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                margin="dense"
                variant="outlined"
                name="title"
                value={blog.title}
                onChange={handleBlog}
                sx={{
                  mr: "10px",
                  [theme.breakpoints.up("xs")]: {
                    width: "350px",
                  },
                  [theme.breakpoints.up("sm")]: {
                    width: "600px",
                  },
                  [theme.breakpoints.up("md")]: {
                    width: "800px",
                  },
                  [theme.breakpoints.up("lg")]: {
                    width: "500px",
                  },
                }}
              />
            </FormControl>
            <FormControl margin="dense">
              <TextField
                id="filled-basic"
                label="Enter description"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIcon />
                    </InputAdornment>
                  ),
                }}
                margin="dense"
                variant="outlined"
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    width: "350px",
                  },
                  [theme.breakpoints.up("sm")]: {
                    width: "600px",
                  },
                  [theme.breakpoints.up("md")]: {
                    width: "800px",
                  },
                  [theme.breakpoints.up("lg")]: {
                    width: "500px",
                  },
                }}
                name="desc"
                value={blog.desc}
                onChange={handleBlog}
              />
            </FormControl>
          </Stack>
          <Stack
            sx={{
              height: "250px",
              [theme.breakpoints.up("xs")]: {
                width: "350px",
              },
              [theme.breakpoints.up("sm")]: {
                width: "610px",
              },
              [theme.breakpoints.up("md")]: {
                width: "810px",
              },
              [theme.breakpoints.up("lg")]: {
                width: "1010px",
              },
            }}
          >
            <ReactQuill
              theme="snow"
              style={{ width: "100%", height: "100%" }}
              modules={modules}
              value={blogdesc}
              onChange={setBlogdesc}
            />
          </Stack>

          {/* <Box sx={{ width: "500px" }} my="10px">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder={"item.category"}
                value={select}
                label="Category"
                onChange={handleSelect}
              >
                <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                <MenuItem value={"Education"}>Education</MenuItem>
                <MenuItem value={"Sports"}>Sports</MenuItem>
                <MenuItem value={"Technology"}>Technology</MenuItem>
                <MenuItem value={"polytics"}>polytics</MenuItem>
                <MenuItem value={"Vlogs"}>Vlogs</MenuItem>
              </Select>
            </FormControl>
          </Box> */}

          {/* <FormControl margin="dense">
          <TextField
            type={"file"}
            onChange={handlePic}
            id="filled-basic"
            margin="dense"
            variant="outlined"
            name="blogFile"
            sx={{ width: "500px" }}
          />
        </FormControl> */}

          <Box
            sx={{
              [theme.breakpoints.up("xs")]: {
                width: "350px",
                mt: "130px",
              },
              [theme.breakpoints.up("sm")]: {
                width: "610px",
                mt: "100px",
              },
              [theme.breakpoints.up("md")]: {
                width: "810px",
                mt: "80px",
              },
              [theme.breakpoints.up("lg")]: {
                width: "1010px",
                mt: "60px",
              },
            }}
          >
            <Button
              variant="contained"
              onClick={() => editBlog(id)}
              sx={{ px: "30px", mr: "10px" }}
              color="warning"
            >
              Update blog
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EditBlog;

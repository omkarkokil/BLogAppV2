import React, { useContext, useState, useEffect } from "react";

import { Container, Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Button, FormControl, TextField } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import FunctionContext from "../context/Function/FunctionContext";
import StateContext from "../context/Hooks/StateContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AssignmentIcon from "@mui/icons-material/Assignment";
const EditBlog = () => {
  const { user, select, blog, item } = useContext(StateContext);
  const { handleSelect, createBlog, handleBlog, handlePic, editBlog, getBlog } =
    useContext(FunctionContext);
  const location = useLocation();
  const { id } = useParams("");
  const loc = location.pathname;

  useEffect(() => {
    getBlog(id);
  }, [loc]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
        }}
        className="appeareffect"
      >
        <Typography variant="h4" color="initial" marginBottom={"15px"}>
          Edit Blog
        </Typography>

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
            sx={{ width: "500px" }}
          />
        </FormControl>

        <FormControl margin="dense">
          <TextField
            id="filled-basic"
            label="Enter description"
            multiline
            rows={10}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AssignmentIcon />
                </InputAdornment>
              ),
            }}
            margin="dense"
            variant="outlined"
            name="desc"
            value={blog.desc}
            onChange={handleBlog}
            sx={{ width: "500px" }}
          />
        </FormControl>

        <Box sx={{ width: "500px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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
        </Box>

        <FormControl margin="dense">
          <TextField
            type={"file"}
            onChange={handlePic}
            id="filled-basic"
            margin="dense"
            variant="outlined"
            name="blogFile"
            sx={{ width: "500px" }}
          />
        </FormControl>

        <Box>
          {loc === "/createBlog" ? (
            <Button
              variant="contained"
              onClick={createBlog}
              color="warning"
              sx={{ width: "500px" }}
            >
              Publish blog
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => editBlog(id)}
              color="warning"
              sx={{ width: "500px" }}
            >
              Update blog
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default EditBlog;

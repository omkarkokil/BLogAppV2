import { Stack } from "@mui/system";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Divider, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MainLoader from "../utils/MainLoader";
import BlogData from "../utils/BlogData";
import StateContext from "../context/Hooks/StateContext";

// import Footer from "../utils/Footer";

const MainBlog = () => {
  // const { category, handleChange, search, handleSearch, isLoading } =
  //   useContext(StateContext);

  const { isLoading, items } = useContext(StateContext);

  return (
    <>
      {isLoading ? (
        <MainLoader />
      ) : (
        <Box marginTop={"10%"}>
          {/* <Stack direction={"row"} justifyContent={"center"}>
            <Stack direction={"row"} width="250px">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="category"
                  onChange={handleChange}
                >
                  <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                  <MenuItem value={"Education"}>Education</MenuItem>
                  <MenuItem value={"Sports"}>Sports</MenuItem>
                  <MenuItem value={"Technology"}>Technology</MenuItem>
                  <MenuItem value={"Ploytics"}>Ploytics</MenuItem>
                  <MenuItem value={"Vlogs"}>Vlogs</MenuItem>
                  <MenuItem value={""}>Reset filter</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <FormControl sx={{ width: "50%", marginLeft: "30px" }}>
              <TextField
                id="search"
                label="search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={search}
                onChange={handleSearch}
              />
            </FormControl>
          </Stack> */}

          <Box marginY={"20px"}>
            <BlogData items={items} />
          </Box>
          {/* <Footer /> */}
        </Box>
      )}
    </>
  );
};

export default MainBlog;

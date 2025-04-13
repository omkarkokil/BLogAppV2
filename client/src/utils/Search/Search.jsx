import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StateContext from "../../context/State/StateContext";
import SearchCard from "./SearchCard/SearchCard";

const Search = () => {
  const { openSearch, setOpenSearch, searchBlogs, setSearchBlogs } =
    useContext(StateContext);
  const [search, setSearch] = useState("");
  const theme = useTheme();

  const { pathname } = useLocation();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) return setSearchBlogs([]);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SEARCH_BLOG}?title=${search}`
        );
        setSearchBlogs(data);
      } catch (err) {
        console.log(err);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  const closeAll = () => {
    setSearch("");
    setOpenSearch(false);
    setSearchBlogs([]);
  };

  useEffect(() => {
    closeAll();
  }, [pathname]);

  return (
    <>
      {openSearch && (
        <Box
          sx={{
            position: "fixed",
            height: "100vh",
            width: "100%",
            zIndex: 10000000,
          }}
        >
          <Stack
            direction={"row"}
            elevation={2}
            sx={{
              height: "8vh",
              justifyContent: "center",
              gap: "20px",
              alignItems: "center",
              width: "100%",
              background: "#fff",
              position: "relative",
            }}
          >
            <Box
              sx={{
                [theme.breakpoints.up("xs")]: {
                  width: "90%",
                },
                [theme.breakpoints.up("md")]: {
                  width: "80%",
                },
              }}
              position={"relative"}
            >
              <OutlinedInput
                id="outlined-adornment-password"
                autoComplete="off"
                sx={{
                  width: "100%",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={closeAll}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                }
                size="small"
                value={search}
                placeholder="Enter your search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              {search.length >= 2 && (
                <Stack
                  sx={{
                    width: "100%",
                    position: "absolute",
                    background: "#00000040",
                  }}
                >
                  <Stack
                    sx={{
                      zIndex: 100000,
                      gap: "10px",
                      p: "10px",

                      background: "#eee",
                      maxHeight: "calc(100vh - 100px)",
                      overflow: "auto",
                    }}
                  >
                    {searchBlogs.length ? (
                      searchBlogs.map((blog) => (
                        <SearchCard key={blog._id} blog={blog} />
                      ))
                    ) : (
                      <Typography
                        textAlign={"center"}
                        variant="h4"
                        width={"100%"}
                      >
                        No Blogs
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              )}
            </Box>
          </Stack>

          <Stack
            height={"92vh"}
            onClick={closeAll}
            sx={{ background: "#00000040" }}
          ></Stack>
        </Box>
      )}
    </>
  );
};

export default Search;

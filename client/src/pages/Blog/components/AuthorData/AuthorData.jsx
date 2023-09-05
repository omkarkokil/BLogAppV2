import { Box, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import StateContext from "../../../../context/State/StateContext";

const AuthorData = ({ id }) => {
  const { items, item } = useContext(StateContext);
  const loc = useLocation();
  const getAuthorBlogs = useMemo(() => {
    return items.filter((Blog) => {
      return Blog._id !== id && Blog.userId === item.userId;
    });
  }, [id, loc, items, item]);

  return (
    <>
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
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups
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
          getAuthorBlogs &&
          getAuthorBlogs.slice(0, 3).map((ele, id) => (
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
                  <Typography fontSize={"1.2em"}>{ele.title}</Typography>
                  <Box
                    fontSize={{ xs: ".9em" }}
                    dangerouslySetInnerHTML={{
                      __html: `${ele?.blog?.slice(0, 100)}...`,
                    }}
                  ></Box>
                </Box>
              </Stack>
            </Link>
          ))
        )}
      </Stack>
    </>
  );
};

export default AuthorData;

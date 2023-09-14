import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

const SearchCard = ({ blog }) => {
  const theme = useTheme();
  return (
    <>
      <Link to={`/blog/${blog._id}`}>
        <Card
          sx={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            px: "10px",
          }}
        >
          {blog.blogPic && (
            <CardMedia
              sx={{
                height: 100,
                width: 150,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                borderRadius: "5px",
              }}
              image={blog.blogPic}
            >
              <Box m={"5px"}>
                <Chip variant="filled" sizes="medium" label={blog.category} />
              </Box>
            </CardMedia>
          )}

          <CardContent>
            <Typography
              sx={{
                [theme.breakpoints.down("md")]: {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                },
              }}
              variant="h5"
              component="div"
            >
              {blog.title}
            </Typography>

            <Box
              fontSize={{ xs: ".8em" }}
              dangerouslySetInnerHTML={{
                __html: `${blog?.blog?.slice(0, 100)}...`,
              }}
            ></Box>

            <Typography variant="body2" color="orangered">
              {blog.createdAt && format(new Date(blog.createdAt), "PP")}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default SearchCard;

import { Avatar, CardHeader, Stack, SvgIcon, Chip } from "@mui/material";
import { Box } from "@mui/system";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import EastIcon from "@mui/icons-material/East";
import { format } from "date-fns";
import { useContext } from "react";
import StateContext from "../../../../context/State/StateContext";
import { BlogContext } from "../../../../context/Blogs/BlogContext";

const BlogCard = ({ ele, chips }) => {
  const { deleteBlog } = useContext(BlogContext);
  const { currentUser } = useContext(StateContext);
  const loc = useLocation();
  return (
    <Card
      elevation={3}
      fontSize={{ xs: "1.7em", sm: "2.2em" }}
      width={"150px"}
      sx={{ p: "10px" }}
      key={ele._id}
    >
      {loc.pathname === "/myprofile" || ele._id === currentUser._id ? (
        ""
      ) : (
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img src={ele.userPic} height="100%" alt="" />
            </Avatar>
          }
          title={ele.name}
          subheader={ele.createdAt && format(new Date(ele.createdAt), "PP")}
        />
      )}

      <CardMedia
        sx={{
          height: 200,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          borderRadius: "5px",
        }}
        image={ele.blogPic}
      >
        <Box m={"5px"}>
          {chips.map(
            (item, id) =>
              ele.category === item.label && (
                <Chip
                  variant="filled"
                  key={id}
                  sizes="medium"
                  color={item.color}
                  label={item.label}
                />
              )
          )}
        </Box>
      </CardMedia>
      <CardContent>
        <Typography
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {ele.title}
        </Typography>
        <Box
          fontSize={{ xs: ".9em" }}
          dangerouslySetInnerHTML={{ __html: `${ele?.blog?.slice(0, 120)}...` }}
        ></Box>
      </CardContent>
      <CardActions>
        <Stack direction={"row"} width="100%" justifyContent="space-between">
          <Link to={`/blog/${ele._id}`}>
            <Button variant="contained" size="small">
              Read More <EastIcon sx={{ ml: "5px", fontSize: "1.3em" }} />
            </Button>
          </Link>
          {loc.pathname === "/myprofile" &&
          ele.currentUser === currentUser._id ? (
            <Stack direction={"row"} justifyContent="center">
              <Link to={`/editBlog/${ele._id}`}>
                <SvgIcon color="success">
                  <EditIcon />
                </SvgIcon>
              </Link>
              <div>
                <SvgIcon
                  color="error"
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <DeleteIcon
                    onClick={() => {
                      deleteBlog(ele._id);
                    }}
                  />
                </SvgIcon>
              </div>
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      </CardActions>
    </Card>
  );
};

export default BlogCard;

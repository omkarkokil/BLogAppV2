import {
  Avatar,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Chip,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StateContext from "../context/Hooks/StateContext";
import FunctionContext from "../context/Function/FunctionContext";

const BlogData = (props) => {
  const loc = window.location.pathname;
  const { currentUser, select, search } = useContext(StateContext);
  const { deleteBlog } = useContext(FunctionContext);
  return (
    <Grid
      container
      justifyContent={"center"}
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={10}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 3,
              width: 350,
              height: "max-content",
              marginTop: "30px",
            },
          }}
        >
          {props.items
            .filter((ele) => {
              return search === undefined || search === ""
                ? ele
                : ele.title.toLowerCase().includes(search);
            })
            .filter((ele) => {
              return select === undefined || select === ""
                ? ele
                : ele.category === select;
            })
            .map((ele, id) => {
              return (
                <Card sx={{ maxWidth: 400 }} key={id}>
                  {loc === "/myprofile" || ele._id === currentUser._id ? (
                    ""
                  ) : (
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe">
                          <img
                            src={`http://localhost:5000/public/${ele.userPic}`}
                            height="100%"
                            alt=""
                          />{" "}
                        </Avatar>
                      }
                      title={ele.name}
                      subheader={ele.date}
                    />
                  )}

                  <CardMedia
                    sx={{
                      height: 200,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                    }}
                    image={`http://localhost:5000/public/${ele.blogPic}`}
                  >
                    <Box m={"5px"}>
                      <Chip
                        variant="filled"
                        sizes="medium"
                        color="warning"
                        label={ele.category}
                      />
                    </Box>
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {ele.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ele.desc.slice(0, 100)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Stack
                      direction={"row"}
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Link to={`/blog/${ele._id}`}>
                        <Button size="small">Read More</Button>
                      </Link>
                      {loc === "/myprofile" || ele._id === currentUser._id ? (
                        <Stack direction={"row"} justifyContent="center">
                          <Link to={`/editBlog/${ele._id}`}>
                            <SvgIcon color="success">
                              <EditIcon />
                            </SvgIcon>
                          </Link>
                          <Link to="/delete">
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
                          </Link>
                        </Stack>
                      ) : (
                        ""
                      )}
                    </Stack>
                  </CardActions>
                </Card>
              );
            })}
        </Box>
      </Grid>
    </Grid>
  );
};

export default BlogData;

import { Avatar, CardHeader, Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import StateContext from "../context/Hooks/StateContext";

const BlogData = (props) => {
  const loc = window.location.pathname;
  const { currentUser } = useContext(StateContext);
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
          {props.items.map((ele, id) => {
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
                  sx={{ height: 200 }}
                  image={`http://localhost:5000/public/${ele.blogPic}`}
                />
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
                      <Typography>hii</Typography>
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

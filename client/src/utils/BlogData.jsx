import { Avatar, CardHeader, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const BlogData = (props) => {
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

                <CardMedia
                  sx={{ height: 140 }}
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
                  <Link to={`/blog/${ele._id}`}>
                    <Button size="small">Read More</Button>
                  </Link>
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

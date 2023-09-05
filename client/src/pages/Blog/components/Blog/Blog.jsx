import { Box, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useContext } from "react";
import StateContext from "../../../../context/State/StateContext";
import { format } from "date-fns";

const Blog = () => {
  const { item } = useContext(StateContext);
  return (
    <>
      <Stack>
        <Paper
          component="img"
          height={350}
          width={"100%"}
          sx={{ objectFit: "cover", borderRadius: "10px", my: "10px" }}
          src={item.blogPic}
        />

        <Typography
          variant="h1"
          textAlign={"center"}
          my={"10px"}
          fontSize={{ xs: "1.7em", sm: "2.2em" }}
          fontWeight={"600"}
          letterSpacing={1.3}
        >
          {item.title}
        </Typography>

        <Stack
          direction={"row"}
          width={"100%"}
          mb={"20px"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1" color="orangered">
            Author : {item.name}
          </Typography>
          <Typography variant="body1" color="orangered">
            {item.createdAt && format(new Date(item.createdAt), "PP")}
          </Typography>
        </Stack>
        <Box
          fontSize={{ xs: ".9em" }}
          sx={{
            ":first-letter": {
              marginLeft: "20px",
              fontSize: "30px",
              fontWeight: "600",
            },
          }}
          dangerouslySetInnerHTML={{ __html: item.blog }}
        ></Box>
      </Stack>
    </>
  );
};

export default Blog;

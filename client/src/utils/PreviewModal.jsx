import { Avatar, Chip, Paper, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";
import FunctionContext from "../context/Function/FunctionContext";
import StateContext from "../context/State/StateContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

export default function PreviewModal() {
  const { open, blog, blogdesc, select, currentUser, pic } =
    React.useContext(StateContext);
  const { handleClose } = React.useContext(FunctionContext);

  // const url = user.pic ? URL.createObjectURL(user.pic) : "";
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!blog.title || !blog.desc || blogdesc === "" || !select ? (
            "Please fill the data first"
          ) : (
            <Stack alignItems={"center"} marginTop={"5%"}>
              <Stack
              // sx={{
              //   [theme.breakpoints.up("xs")]: {
              //     justifyContent: "center",
              //   },
              //   [theme.breakpoints.up("md")]: {
              //     width: "50%",
              //   },
              // }}
              >
                <Stack marginY="20px">
                  <Typography
                    variant="h1"
                    fontSize={"3.2em"}
                    fontWeight={"bold"}
                  >
                    {blog.title}
                  </Typography>
                </Stack>
                <Stack
                  alignItems={"center"}
                  width={"100%"}
                  justifyContent={"center"}
                >
                  <Paper
                    component="img"
                    elevation={0}
                    width={"70%"}
                    src={pic}
                  />
                </Stack>
                <Stack my={"10px"}>
                  <Chip
                    color="warning"
                    sx={{ width: "150px" }}
                    label={select}
                  />
                </Stack>

                <Box dangerouslySetInnerHTML={{ __html: blogdesc }}></Box>
                <Stack
                  width={"100%"}
                  direction={"row"}
                  alignItems={"flex-start"}
                >
                  <Stack>
                    <Avatar sx={{ height: "50px", width: "50px" }}>
                      <img src={currentUser.pic} alt="" height={"100%"} />
                    </Avatar>
                  </Stack>
                  <Stack marginX={"10px"}>
                    <Typography>{currentUser.name}</Typography>
                    <Typography>May 29, 2023</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Box>
      </Modal>
    </div>
  );
}

import React, { useContext, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import CardData from "../utils/CardData";
import Footer from "../utils/Footer";
import StateContext from "../context/Hooks/StateContext";
import FunctionContext from "../context/Function/FunctionContext";
import { Link, useNavigate } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import MainLoader from "../utils/MainLoader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MyBlog = () => {
  const { lastItem, isLoading } = useContext(StateContext);
  const { getLastBlog, getCurrentUserBlog } = useContext(FunctionContext);
  const navigate = useNavigate();

  useEffect(() => {
    getLastBlog();
  }, []);

  useEffect(() => {
    getCurrentUserBlog();
  }, [window.location.pathname]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  const { deleteBlog } = useContext(FunctionContext);
  return (
    <>
      {!lastItem ? (
        <Stack height={"100vh"} justifyContent="center" alignItems={"center"}>
          <Paper
            elevation={3}
            sx={{
              height: "130px",
              width: "50%",
              color: "orangered",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            className="appeareffect"
          >
            <SvgIcon fontSize="large">
              <WarningAmberIcon />
            </SvgIcon>

            <Typography variant="h5" fontSize={"2em"}>
              No blogs have been yet added
            </Typography>
            <Typography paragraph>please create your blog first</Typography>
          </Paper>
        </Stack>
      ) : lastItem.category === undefined || isLoading ? (
        <MainLoader />
      ) : (
        <Box>
          <Stack marginTop={"10%"} alignItems={"center"}>
            <Stack
              alignItems={"center"}
              width={"80%"}
              borderRadius={"10px"}
              direction="row"
              backgroundColor="ghostwhite"
            >
              <Stack
                width={"60%"}
                justifyContent="center"
                alignItems="center"
                height={"300px"}
                marginY={"30px"}
              >
                <img
                  src={`https://magicalwinds.onrender.com/${lastItem.blogPic}`}
                  height="300px"
                />
              </Stack>
              <Stack
                width={"30%"}
                marginLeft="10px"
                marginY={"30px"}
                justifyContent="center"
              >
                <Stack
                  direction={"row"}
                  justifyContent="space-between"
                  alignItems="center"
                  marginY={"20px"}
                >
                  <Chip
                    label={lastItem.category}
                    color="warning"
                    sx={{ width: "max-content" }}
                    variant="contained"
                  />
                  <Stack direction={"row"} alignItems="center">
                    <Link to={"/deleteBlog"}>
                      <SvgIcon
                        onClick={() => deleteBlog(lastItem._id)}
                        sx={{ cursor: "pointer" }}
                      >
                        <DeleteIcon color="error" />
                      </SvgIcon>
                    </Link>
                    <Link
                      to={`/editblog/${lastItem._id}`}
                      style={{ marginLeft: "5px" }}
                    >
                      <SvgIcon>
                        <EditIcon color="success" />
                      </SvgIcon>
                    </Link>
                  </Stack>
                </Stack>

                <Typography variant="h4" marginY={"10px"} fontSize={"1.9em"}>
                  {lastItem.title}
                </Typography>

                <Typography fontSize={".85em"}>
                  {lastItem.desc.slice(0, 200)}
                </Typography>
                <Stack
                  direction={"row"}
                  justifyContent="space-between"
                  alignItems="center"
                  marginY={"20px"}
                >
                  <Link to={`/blog/${lastItem._id}`}>
                    <Button variant="contained" size="small">
                      show more
                    </Button>
                  </Link>
                  <Stack justifyContent={"flex-end"} direction={"row"}>
                    <Avatar>
                      <img
                        src={`https://magicalwinds.onrender.com/${lastItem.userPic}`}
                        alt="none"
                        height={"100%"}
                      />
                    </Avatar>
                    <Box marginLeft={"10px"}>
                      <Typography>{lastItem.name}</Typography>
                      <Typography fontSize={".85em"}>
                        {lastItem.date}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Box marginY={"20px"}>
            <CardData />
          </Box>
        </Box>
      )}
    </>
  );
};

export default MyBlog;

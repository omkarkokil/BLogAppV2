import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StateContext from "../../context/State/StateContext";
import Footer from "../../utils/Footer/Footer";
import cardblog from "../../img/card.png";
import calc from "../../img/calc.png";
import flowergreen from "../../img/flowergreen.png";
import cup from "../../img/cup.png";
import blogYellow from "../../img/blogYellow.png";
import blogblue from "../../img/blogblue.png";
import pens from "../../img/pens.png";
import graph from "../../img/graph.png";
import map from "../../img/map.png";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isLogin } = useContext(StateContext);
  return (
    <>
      <Stack
        direction={{ md: "row", sm: "column" }}
        sx={{
          [theme.breakpoints.up("xs")]: {
            justifyContent: "center",
            height: "95vh",
          },
          [theme.breakpoints.up("sm")]: {
            height: "100vh",
          },
          [theme.breakpoints.up("md")]: {
            justifyContent: "intial",
          },
        }}
        className="homeBack"
      >
        <Stack
          alignItems={"center"}
          sx={{
            [theme.breakpoints.up("sm")]: {
              marginY: "0",
            },
            [theme.breakpoints.up("md")]: {
              marginY: "100px",
            },
          }}
          width={"100%"}
        >
          <Typography className="basic appeareffect">
            Surf the interactive blog and create your own space{" "}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              [theme.breakpoints.up("xs")]: {
                fontSize: "2.5em",
              },
              [theme.breakpoints.up("sm")]: {
                fontSize: "3em",
              },
              [theme.breakpoints.up("md")]: {
                fontSize: "3em",
              },
              [theme.breakpoints.up("lg")]: {
                fontSize: "4em",
              },
            }}
            lineHeight={"1.5"}
            className="typeone appeareffect"
          >
            Join us & show your caliber
          </Typography>

          <Box
            className="imaginary newEffect"
            sx={{
              [theme.breakpoints.up("md")]: {
                display: "none",
              },
              [theme.breakpoints.up("md")]: {
                height: "40vh",
              },
              [theme.breakpoints.up("lg")]: {
                height: "52vh",
                width: "50%",
              },
            }}
          />

          <Paper
            component={"img"}
            className="newEffect"
            sx={{
              backgroundColor: "transparent",
              position: "absolute",
              bottom: "0",
              right: "10%",
              zIndex: "1 !important",
              [theme.breakpoints.up("xs")]: {
                height: "150px",
              },
              [theme.breakpoints.up("sm")]: {
                height: "200px",
              },
              [theme.breakpoints.up("md")]: {
                height: "225px",
              },
              [theme.breakpoints.up("lg")]: {
                height: "250px",
              },
            }}
            elevation={0}
            src={cardblog}
          />

          <Paper
            component={"img"}
            className="newEffect"
            src={calc}
            elevation={0}
            sx={{
              right: "0% !important",
              backgroundColor: "transparent",
              position: "absolute",
              zIndex: "2",
              [theme.breakpoints.up("xs")]: {
                height: "150px",
                bottom: "-5% !important",
              },
              [theme.breakpoints.up("sm")]: {
                height: "225px",
                bottom: "-10% !important",
              },
              [theme.breakpoints.up("md")]: {
                height: "250px",
                bottom: "-10% !important",
              },
              [theme.breakpoints.up("lg")]: {
                height: "275px",
                bottom: "-10% !important",
              },
            }}
          />

          <Paper
            component={"img"}
            className="newEffect"
            src={flowergreen}
            elevation={0}
            sx={{
              backgroundColor: "transparent",
              position: "absolute",
              [theme.breakpoints.up("xs")]: {
                bottom: "10% !important",
                height: "20vh ",
                left: "-5%",
              },
              [theme.breakpoints.up("sm")]: {
                bottom: "10% !important",
                height: "250px",
              },
              [theme.breakpoints.up("md")]: {
                height: "300px ",
              },
              [theme.breakpoints.up("lg")]: {
                left: -"5% !important",
                top: "10% !important",
                height: "60vh ",
              },
            }}
          />

          <Paper
            component={"img"}
            className="newEffect"
            src={cup}
            elevation={0}
            sx={{
              backgroundColor: "transparent",
              position: "absolute",
              [theme.breakpoints.up("xs")]: {
                height: "80px ",
                left: "10% !important",
                bottom: "5% !important",
              },
              [theme.breakpoints.up("sm")]: {
                height: "100px",
              },
              [theme.breakpoints.up("md")]: {
                height: "150px",
              },
              [theme.breakpoints.up("lg")]: {
                left: "15% !important",
                top: "50% !important",
                height: "200px ",
              },
            }}
          />

          <Button
            variant="contained"
            className="appeareffect"
            sx={{
              background: "orangered",
              marginY: "20px",
              width: "200px",
              ":hover": { background: "#ff4500ad" },
            }}
            onClick={() => {
              isLogin ? navigate("/createblog") : navigate("/login");
            }}
          >
            Create your blog
          </Button>
        </Stack>
      </Stack>
      <Stack
        direction={{ md: "row", xs: "column" }}
        sx={{
          zIndex: 100,
          position: "relative",
          background: "#ff8000",
          overflow: "hidden",
          [theme.breakpoints.up("xs")]: {
            flexDirection: "column",
            height: "60vh",
          },
          [theme.breakpoints.up("md")]: {
            height: "80vh",
            flexDirection: "row",
          },
        }}
      >
        <Stack
          sx={{
            [theme.breakpoints.up("sm")]: {
              width: "80%",
            },
            [theme.breakpoints.up("lg")]: {
              width: "50%",
            },
          }}
          justifyContent="center"
        >
          <Container>
            <Typography
              variant="h1"
              lineHeight={"1.5"}
              color="#fff"
              sx={{
                [theme.breakpoints.up("xs")]: {
                  fontSize: "2em",
                },
                [theme.breakpoints.up("md")]: {
                  fontSize: "3em",
                },
              }}
            >
              Create a new content
            </Typography>
            <Typography
              paragraph
              sx={{
                [theme.breakpoints.up("xs")]: {
                  fontSize: ".8em",
                },
                [theme.breakpoints.up("md")]: {
                  fontSize: "1.1em",
                },
              }}
              color="#fff"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
              atque dolore tempora optio molestias. Vel vero harum esse, aliquam
              corrupti accusantium iste, numquam accusamus exercitationem, atque
              dolore tempora optio molestias. Vel vero harum esse, aliquam
              corrupti accusantium iste, numquam accusamus exercitationem,
            </Typography>
          </Container>
        </Stack>
        <Paper
          component={"img"}
          className="newEffect"
          src={blogYellow}
          elevation={0}
          height={{ xs: "300px", md: "400px", lg: "600px" }}
          sx={{
            backgroundColor: "transparent",
            right: "-10%",
            bottom: "-15%",
            position: "absolute",
          }}
        />

        <Paper
          component={"img"}
          className="newEffect"
          src={blogblue}
          elevation={0}
          height={{ xs: "250px", sm: "350px", md: "350px", lg: "500px" }}
          sx={{
            backgroundColor: "transparent",
            right: "-15%",
            bottom: "-20%",
            position: "absolute",
          }}
        />

        <Paper
          component={"img"}
          className="newEffect"
          src={pens}
          elevation={0}
          sx={{
            backgroundColor: "transparent",
            position: "absolute",
            right: "20%",
            [theme.breakpoints.up("xs")]: {
              height: "70px",
              top: "40%",
              right: "5%",
            },
            [theme.breakpoints.up("sm")]: {
              height: "85px",
              top: "20%",
              right: "5%",
            },
            [theme.breakpoints.up("md")]: {
              height: "100px",
              top: "40%",
              right: "5%",
            },
            [theme.breakpoints.up("lg")]: {
              height: "150px",
              top: "10%",
            },
          }}
        />
      </Stack>

      <Stack
        direction={{ md: "row", xs: "column" }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "80vh",
          background: "#444",
          zIndex: 100,
          position: "relative",
        }}
      >
        <Stack
          sx={{
            [theme.breakpoints.up("xs")]: {
              width: "80%",
            },
            [theme.breakpoints.up("md")]: {
              width: "50%",
            },
          }}
          color="white"
        >
          <Container>
            <Typography
              variant="h3"
              sx={{
                [theme.breakpoints.up("xs")]: {
                  fontSize: "2em",
                },
                [theme.breakpoints.up("md")]: {
                  fontSize: "3em",
                },
              }}
            >
              Make a blog over the world
            </Typography>
            <Typography
              sx={{
                [theme.breakpoints.up("xs")]: {
                  fontSize: ".8em",
                },
                [theme.breakpoints.up("md")]: {
                  fontSize: "1.1em",
                },
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
              fugit assumenda provident corporis veritatis perspiciatis, itaque,
              porro similique, nam at atque ipsam. Recusandae ea nihil nostrum
              odit illo sequi repellat. Ipsum consectetur eligendi accusamus eos
              officia a nesciunt earum amet atque nostrum, voluptas quae
              exercitationem inventore repellat ullam, nihil repudiandae
              mollitia, veniam ducimus harum! Assumenda nisi eius fugit a nulla?
            </Typography>
          </Container>
        </Stack>
        <Stack width={"50%"} alignItems="center">
          <img src={map} alt="" width="80%" />
          <img src={graph} alt="" width="80%" />
        </Stack>
      </Stack>

      <Footer />
    </>
  );
};

export default Home;

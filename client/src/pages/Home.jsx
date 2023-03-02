import { Button, Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StateContext from "../context/Hooks/StateContext";
import Footer from "../utils/Footer";
// import CategoryGrid from "../components/CategoryGrid";
import img1 from "../img/imgae.png";
import cardblog from "../img/card.png";
import calc from "../img/calc.png";
import flowergreen from "../img/flowergreen.png";
import cup from "../img/cup.png";
import blogYellow from "../img/blogYellow.png";
import blogblue from "../img/blogblue.png";
import pens from "../img/pens.png";
import graph from "../img/graph.png";
import map from "../img/map.png";

const Home = () => {
  const navigate = useNavigate();

  const { isLogin } = useContext(StateContext);
  return (
    <>
      <Stack
        direction={{ md: "row", sm: "column" }}
        height={"100vh"}
        className=" homeBack"
      >
        <Stack
          marginX={"40px"}
          marginY={"100px"}
          alignItems={"center"}
          width={"100%"}
        >
          <Typography className="basic appeareffect">
            Surf the interactive blog and create your own space{" "}
          </Typography>
          <Typography
            variant="h1"
            fontSize="4em"
            lineHeight={"1.5"}
            className="typeone  appeareffect"
          >
            Join us & show your caliber
          </Typography>

          <img src={img1} className="imaginary newEffect" alt="none" />
          <img src={cardblog} className="imaginaryLeft newEffect" alt="none" />

          <img src={calc} className="imaginaryLeft img2 newEffect" alt="none" />
          <img
            src={flowergreen}
            className="imaginaryLeft img3 newEffect"
            alt="none"
          />
          <img src={cup} className="imaginaryLeft img4 newEffect" alt="none" />
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
        direction={{ md: "row", sm: "column" }}
        height={"80vh"}
        sx={{
          zIndex: 1000,
          position: "relative",
          background: "#ff8000",
          overflow: "hidden",
        }}
      >
        <Stack width={"50%"} justifyContent="center">
          <Container>
            <Typography
              variant="h1"
              fontSize={"3em"}
              lineHeight={"1.5"}
              color="#fff"
            >
              Create a new content
            </Typography>
            <Typography paragraph fontSize={"1em"} color="#fff">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente
              atque dolore tempora optio molestias. Vel vero harum esse, aliquam
              corrupti accusantium iste, numquam accusamus exercitationem, atque
              dolore tempora optio molestias. Vel vero harum esse, aliquam
              corrupti accusantium iste, numquam accusamus exercitationem,
            </Typography>
          </Container>
        </Stack>
        <img
          src={blogYellow}
          className="imaginaryLeft"
          style={{
            height: "80vh",
            right: "-10%",
            bottom: "-15%",
            position: "absolute",
          }}
          alt="none"
        />
        <img
          src={blogblue}
          className="imaginaryLeft"
          style={{
            height: "70vh",
            right: "-15%",
            bottom: "-20%",
            position: "absolute",
          }}
          alt="none"
        />
        <img
          src={pens}
          className="imaginaryLeft"
          style={{
            height: "150px",
            right: "20%",
            top: "10%",
            position: "absolute",
          }}
          alt="none"
        />
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "80vh",
          background: "#444",
          zIndex: 1000,
          position: "relative",
        }}
      >
        <Stack width={"50%"} color="white">
          <Container>
            <Typography variant="h3">Make a blog over the world</Typography>
            <Typography>
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

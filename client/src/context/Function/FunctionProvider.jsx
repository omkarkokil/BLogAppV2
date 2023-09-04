import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StateContext from "../State/StateContext";
import FunctionContext from "./FunctionContext";
import axios from "axios";
import { toast } from "react-toastify";

const FunctionProvider = ({ children }) => {
  const {
    user,
    setUser,
    setIsLoading,
    setMakeComment,
    setSelect,
    blog,
    setBlog,
    setSearch,
    setOpen,
    setPic,
  } = useContext(StateContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const toastOption = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
  };

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser(() => {
      return {
        ...user,
        [name]: value,
      };
    });
    console.log(user);
  };

  const handleBlog = (e) => {
    const { name, value } = e.target;
    setBlog(() => {
      return {
        ...blog,
        [name]: value,
      };
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const postDetailes = (pic) => {
    setIsLoading(true);
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "BlogApp");
    data.append("cloud_name", "dfxyr6c40");

    fetch("https://api.cloudinary.com/v1_1/dfxyr6c40/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        if (pic != "") {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleComment = (e) => {
    setMakeComment(e.target.value);
  };

  return (
    <FunctionContext.Provider
      value={{
        handleUser,
        postDetailes,
        handleComment,
        handleSelect,
        handleBlog,
        handleSearch,
        handleOpen,
        handleClose,
        toastOption,
      }}
    >
      {children}
    </FunctionContext.Provider>
  );
};

export default FunctionProvider;

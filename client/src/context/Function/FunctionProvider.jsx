import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StateContext from "../Hooks/StateContext";
import FunctionContext from "./FunctionContext";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const FunctionProvider = ({ children }) => {
  const Navigate = useNavigate();
  const { user, setUser, currentUser, setCurrentUser, setIsLogin } =
    useContext(StateContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const token = localStorage.getItem("user");
      const decode = jwt_decode(token);
      const { id } = decode;

      setCurrentUser({
        name: id.name,
        email: id.email,
        pic: id.pic,
        id: id._id,
      });

      setIsLogin(true);
    }
  }, [localStorage.getItem("user")]);

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
  };

  const handlePic = (e) => {
    setUser({ ...user, pic: e.target.files[0] });
  };

  const RegisterUser = async () => {
    try {
      const formdata = new FormData();
      formdata.append("name", user.name);
      formdata.append("email", user.email);
      formdata.append("password", user.password);
      formdata.append("myFile", user.pic);
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/registeruser",
        formdata
      );

      if (!data.status) {
        toast.error(data.msg, toastOption);
        return false;
      }
      if (data.status) {
        toast.success(data.msg, toastOption);
        localStorage.setItem("user", data.token);
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.clear();
    Navigate("/");
  };

  return (
    <FunctionContext.Provider
      value={{ logOut, handleUser, handlePic, RegisterUser }}
    >
      {children}
    </FunctionContext.Provider>
  );
};

export default FunctionProvider;

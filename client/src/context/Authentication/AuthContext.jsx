import { createContext, useContext, useEffect } from "react";
import StateContext from "../State/StateContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const {
    setIsLoading,
    user,
    pic,
    toastOption,
    setIsLogin,
    setCurrentUser,
    setGetLoginBlog,
  } = useContext(StateContext);

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

  const LoginUser = async () => {
    try {
      setIsLoading(true);
      const { email, password } = user;
      const { data } = await axios.post(
        "https://magicalwinds.onrender.com/api/auth/loginUser",
        { email, password }
      );

      if (!email || !password) {
        toast.error("Please fill the credentials", toastOption);
      }
      if (!data.status) {
        toast.error(data.msg, toastOption);
        return false;
      }
      if (data.status) {
        toast.success(data.msg, toastOption);
        localStorage.setItem("user", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const RegisterUser = async () => {
    try {
      setIsLoading(true);
      // Extracting User credentials
      const { name, email, password } = user;

      // Api call for register user
      const { data } = await axios.post(
        "https://magicalwinds.onrender.com/api/auth/registeruser",
        {
          name,
          email,
          password,
          pic,
        }
      );

      // Checking data status from backend
      if (!data.status) {
        toast.error(data.msg, toastOption);
        return false;
      }

      // After true Making Login for user
      if (data.status) {
        toast.success(data.msg, toastOption);
        localStorage.setItem("user", data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = () => {
    localStorage.clear();
    toast.success("Log out successfully", toastOption);
    setIsLogin(false);
    navigate("/");
  };

 

  return (
    <AuthContext.Provider
      value={{ RegisterUser, LoginUser, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

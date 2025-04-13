import axios from "axios";
import jwt_decode from "jwt-decode";
import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FunctionContext from "../Function/FunctionContext";
import StateContext from "../State/StateContext";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setIsLoading, user, pic, setIsLogin, setCurrentUser } =
    useContext(StateContext);

  const { toastOption } = useContext(FunctionContext);

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
    // eslint-disable-next-line
  }, [localStorage.getItem("user")]);

  const LoginUser = async () => {
    try {
      setIsLoading(true);
      const { email, password } = user;
      const { data } = await axios.post(process.env.REACT_APP_LOGIN_USER, {
        email,
        password,
      });

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
      const { data } = await axios.post(process.env.REACT_APP_REGISTER_USER, {
        name,
        email,
        password,
        pic,
      });

      // Checking data status from backend
      if (!data.status) {
        toast.error(data.msg);
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
    <AuthContext.Provider value={{ RegisterUser, LoginUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

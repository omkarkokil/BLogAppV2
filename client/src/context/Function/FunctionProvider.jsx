import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StateContext from "../Hooks/StateContext";
import FunctionContext from "./FunctionContext";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const FunctionProvider = ({ children }) => {
  const navigate = useNavigate();
  const {
    user,
    setUser,
    currentUser,
    setCurrentUser,
    setIsLogin,
    setItems,
    setIsLoading,
    setItem,
    setComments,
    makeComment,
    setMakeComment,
    allComments,
    comments,
    setAllComments,
    select,
    setSelect,
    blog,
    setBlog,
    getLoginBlog,
    setGetLoginBlog,
    search,
    item,
    setSearch,
    blogdesc,
    open,
    setBlogdesc,
    setOpen,
  } = useContext(StateContext);

  //TODO basic
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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

  const handleBlog = (e) => {
    const { name, value } = e.target;
    setBlog(() => {
      return {
        ...blog,
        [name]: value,
      };
    });
  };

  const handlePic = (e) => {
    setUser({ ...user, pic: e.target.files[0] });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const RegisterUser = async () => {
    try {
      setIsLoading(true);
      const formdata = new FormData();
      formdata.append("name", user.name);
      formdata.append("email", user.email);
      formdata.append("password", user.password);
      formdata.append("myFile", user.pic);
      const { data } = await axios.post(
        "https://magicalwinds.onrender.com/api/auth/registeruser",
        formdata
      );

      if (!data.status) {
        toast.error(data.msg, toastOption);
        setIsLoading(false);
        return false;
      }

      if (data.status) {
        toast.success(data.msg, toastOption);
        localStorage.setItem("user", data.token);
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LoginUser = async () => {
    setIsLoading(true);
    try {
      const { email, password } = user;
      const { data } = await axios.post(
        "https://magicalwinds.onrender.com/api/auth/loginUser",
        { email, password }
      );

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
    }
    setIsLoading(false);
  };

  const logOut = () => {
    localStorage.clear();
    toast.success("Log out successfully", toastOption);
    setIsLogin(false);
    navigate("/");
  };

  const getBlogs = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://magicalwinds.onrender.com/api/blog/getAllBlogs",
        {
          params: {
            page: 1,
          },
        }
      );

      setItems(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loc = window.location.pathname;

  useEffect(() => {
    getBlogs();
  }, [loc]);

  const getBlog = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://magicalwinds.onrender.com/api/blog/getBlog/${id}`
      );
      setItem(data);

      if (loc.includes("editBlog")) {
        setBlog({
          title: data.title,
          desc: data.desc,
          pic: data.blogPic,
        });
        setBlogdesc(data.blog);
      }
      // setSelect(data.category);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://magicalwinds.onrender.com/api/blog/getcomment/${id}`
      );
      setComments(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComments = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://magicalwinds.onrender.com/api/blog/getAllComment/${id}`
      );
      setAllComments(data);
      console.log(allComments);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = (e) => {
    setMakeComment(e.target.value);
  };

  const createComment = async (id) => {
    // setIsLoading(true);
    try {
      if (!localStorage.getItem("user")) {
        navigate("/login");
        return false;
      }
      const { data } = await axios.post(
        `https://magicalwinds.onrender.com/api/blog/comment/${id}`,

        { comment: makeComment, author: currentUser._id, to: id },
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );
      if (!data.status) {
        toast.error(data.msg, toastOption);
        return false;
      }

      if (data.status) {
        toast.success(data.msg, toastOption);

        setAllComments((all) => [
          {
            author: {
              name: currentUser.name,
              pic: currentUser.pic,
              _id: currentUser._id,
            },
            comment: data.comments.comment,
            to: id,
            createdAt: "22 may 2002",
          },
          ...all,
        ]);

        const newElement =
          comments.length >= 5 ? comments.slice(0, -1) : comments;

        setComments(() => [
          {
            author: {
              name: currentUser.name,
              pic: currentUser.pic,
              _id: currentUser._id,
            },
            comment: data.comments.comment,
            to: id,
            createdAt: data.comments.createdAt,
          },
          ...newElement,
        ]);

        setMakeComment("");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // console.log(makeComment);

  const createBlog = async () => {
    setIsLoading(true);
    try {
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const nowdate = new Date();
      const date =
        month[nowdate.getMonth()] +
        " " +
        nowdate.getDate() +
        ", " +
        nowdate.getFullYear();

      const { title, desc, pic } = blog;
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("desc", desc);
      formdata.append("blog", blogdesc);
      formdata.append("category", select);
      formdata.append("userId", currentUser.id);
      formdata.append("name", currentUser.name);
      formdata.append("userPic", currentUser.pic);
      formdata.append("date", date);
      formdata.append("blogFile", user.pic);
      const { data } = await axios.post(
        "https://magicalwinds.onrender.com/api/blog/createBlog",
        formdata,
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );

      if (!data.status) {
        toast.error(data.msg, toastOption);
        return false;
      }

      if (data.status) {
        toast.success(data.msg, toastOption);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const currentUserBlog = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://magicalwinds.onrender.com/api/blog/getCurrentUserBlog",
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );
      setGetLoginBlog(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(getLoginBlog);

  const deleteBlog = async (id) => {
    setIsLoading(true);
    const { data } = await axios.delete(
      `https://magicalwinds.onrender.com/api/blog/deleteBlog/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      }
    );

    if (!data.status) {
      toast.error(data.msg, toastOption);
    }

    if (data.status) {
      toast.success(data.msg, toastOption);
      const newBlog = getLoginBlog.filter((item) => {
        return item._id !== id;
      });

      setGetLoginBlog(newBlog);
    }
    setIsLoading(false);
  };

  const editBlog = async (id) => {
    setIsLoading(true);
    try {
      const { title, desc } = blog;
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("desc", desc);
      formdata.append("blog", blogdesc);
      // formdata.append("category", select === "" ? item.category : select);

      const { data } = await axios.put(
        `https://magicalwinds.onrender.com/api/blog/editBlog/${id}`,
        formdata,
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );

      if (formdata.select === "") {
        toast.error(data.msg, toastOption);
        return false;
      }

      if (!data.status) {
        toast.error(data.msg, toastOption);
        return false;
      }

      if (data.status) {
        toast.success(data.msg, toastOption);
        setSelect("");
        navigate("/myprofile");
      }
    } catch (error) {
      // toast.error(data.msg, toastOption);
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <FunctionContext.Provider
      value={{
        logOut,
        handleUser,
        handlePic,
        RegisterUser,
        LoginUser,
        currentUserBlog,
        getBlog,
        getComments,
        createComment,
        handleComment,
        getAllComments,
        handleSelect,
        handleBlog,
        deleteBlog,
        createBlog,
        handleSearch,
        editBlog,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </FunctionContext.Provider>
  );
};

export default FunctionProvider;

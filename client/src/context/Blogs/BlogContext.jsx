import { createContext, useContext } from "react";
import StateContext from "../State/StateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const {
    setIsLoading,
    setSelect,
    select,
    blog,
    blogdesc,
    pic,
    toastOption,
    currentUser,
    setGetLoginBlog,
    getLoginBlog,
    setOtherLoading,
    setBlogdesc,
    setBlog,
    setItem,
  } = useContext(StateContext);

  const navigate = useNavigate();

  const createBlog = async () => {
    setIsLoading(true);
    try {
      const { title, desc } = blog;

      const { data } = await axios.post(
        process.env.REACT_APP_CREATE_BLOG,
        {
          title,
          desc,
          blog: blogdesc,
          category: select,
          userId: currentUser.id,
          name: currentUser.name,
          userPic: currentUser.pic,
          blogPic: pic,
        },
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );

      if (!data.status) {
        toast.error(data.msg, toastOption);
        setSelect("");
        setIsLoading(false);
        return false;
      }

      if (data.status) {
        toast.success(data.msg, toastOption);
        setSelect("");
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    setOtherLoading(true);
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
      setOtherLoading(false);
    }

    if (data.status) {
      toast.success(data.msg, toastOption);
      const newBlog = getLoginBlog.filter((item) => {
        return item._id !== id;
      });

      setOtherLoading(false);
      setGetLoginBlog(newBlog);
    }
  };

  const editBlog = async (id) => {
    setOtherLoading(true);
    try {
      const { title, desc } = blog;

      const { data } = await axios.put(
        `${process.env.REACT_APP_EDIT_BLOG}/${id}`,
        { title, desc, blog: blogdesc },
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );

      if (!data.status) {
        setOtherLoading(false);
        toast.error(data.msg, toastOption);
        return false;
      }

      if (data.status) {
        toast.success(data.msg, toastOption);
        setOtherLoading(false);
        setSelect("");
        navigate("/myprofile");
      }
    } catch (error) {
      setOtherLoading(false);
      console.log(error);
    }
  };

  const getBlog = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_GET_BLOG}/${id}`
      );
      setItem(data);

      if (window.location.pathname.includes("editBlog")) {
        setBlog({
          title: data.title,
          desc: data.desc,
          pic: data.blogPic,
        });
        setBlogdesc(data.blog);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <BlogContext.Provider value={{ createBlog, editBlog, deleteBlog, getBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;

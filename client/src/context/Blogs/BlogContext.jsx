import { createContext, useCallback, useContext } from "react";
import StateContext from "../State/StateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FunctionContext from "../Function/FunctionContext";

export const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const {
    setIsLoading,
    setSelect,
    select,
    blog,
    blogdesc,
    pic,

    currentUser,
    setGetLoginBlog,
    getLoginBlog,
    setOtherLoading,
    setBlogdesc,
    setBlog,
    setItem,
    setItems,
    FillterData,
    setHasMore,
    setFillterData,
    page,
    setPage,
  } = useContext(StateContext);

  const { toastOption } = useContext(FunctionContext);

  const navigate = useNavigate();

  const createBlog = async () => {
    setIsLoading(true);
    try {
      const { title, desc } = blog;

      const { data } = await axios.post(
        process.env.REACT_APP_CREATE_BLOG,
        {
          title,
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

  const getBlogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(process.env.REACT_APP_GET_ALL_BLOGS, {
        params: {
          page: 1,
          limit: 5,
          items: FillterData,
        },
      });
      setItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchData = async () => {
    try {
      if (page >= 1) {
        const { data } = await axios.get(
          "http://localhost:5000/api/blog/getAllBlogs",
          {
            params: {
              page: page,
              items: FillterData,
            },
          }
        );
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setItems((prevItems) => [...prevItems, ...data]);
          setPage((prevPage) => prevPage + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetFiltter = async (items) => {
    try {
      setPage(1);
      setHasMore(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/blog/getAllBlogs",
        {
          params: {
            items: items,
            page: 1,
          },
        }
      );

      setItems(data);
      setPage((prevPage) => prevPage + 1);
      setFillterData(items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        createBlog,
        editBlog,
        deleteBlog,
        getBlog,
        fetchData,
        GetFiltter,
        getBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;

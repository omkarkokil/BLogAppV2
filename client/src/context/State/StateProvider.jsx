import React, { useState } from "react";
import StateContext from "./StateContext";

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [pic, setPic] = useState("");

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    id: "",
    pic: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [otherLoading, setOtherLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
  const [makeComment, setMakeComment] = useState("");
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [getLoginBlog, setGetLoginBlog] = useState([]);
  const [select, setSelect] = useState("");
  const [search, setSearch] = useState();
  const [blog, setBlog] = useState({
    title: "",
    desc: "",
  });

  const [blogdesc, setBlogdesc] = useState("");

  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(2);

  const [FillterData, setFillterData] = useState("all");
  const [hasMore, setHasMore] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchBlogs, setSearchBlogs] = useState([]);

  return (
    <StateContext.Provider
      value={{
        isLogin,
        setIsLogin,
        user,
        setUser,
        currentUser,
        setCurrentUser,
        items,
        setItems,
        isLoading,
        setIsLoading,
        item,
        setItem,
        comments,
        setComments,
        makeComment,
        setMakeComment,
        allComments,
        setAllComments,
        select,
        setSelect,
        blog,
        setBlog,
        getLoginBlog,
        setGetLoginBlog,
        search,
        setSearch,
        blogdesc,
        setBlogdesc,
        open,
        setOpen,
        page,
        setPage,
        pic,
        setPic,
        otherLoading,
        setOtherLoading,
        FillterData,
        setFillterData,
        hasMore,
        setHasMore,
        openSearch,
        setOpenSearch,
        searchBlogs,
        setSearchBlogs,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;

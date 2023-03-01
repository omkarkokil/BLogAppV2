import React, { useState } from "react";
import StateContext from "./StateContext";

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    title: "",
    desc: "",
    password: "",
    pic: "",
  });

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    id: "",
    pic: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
  const [makeComment, setMakeComment] = useState(undefined);
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [getLoginBlog, setGetLoginBlog] = useState([]);
  const [select, setSelect] = useState("Entertainment");
  const [blog, setBlog] = useState({
    title: "",
    desc: "",
  });

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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;

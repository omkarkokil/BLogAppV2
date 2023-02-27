import React, { useState } from "react";
import StateContext from "./StateContext";

const StateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
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
  const [item, setItem] = useState();

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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;

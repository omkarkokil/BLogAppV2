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

  return (
    <StateContext.Provider
      value={{
        isLogin,
        setIsLogin,
        user,
        setUser,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;

import { createContext, useContext } from "react";
import StateContext from "../State/StateContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FunctionContext from "../Function/FunctionContext";

export const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  const navigate = useNavigate();
  const {
    makeComment,
    setAllComments,
    setMakeComment,
    currentUser,
    setOtherLoading,
    setIsLoading,
  } = useContext(StateContext);

  const { toastOption } = useContext(FunctionContext);

  const createComment = async (id) => {
    setOtherLoading(true);
    try {
      if (!localStorage.getItem("user")) {
        navigate("/login");
        setOtherLoading(false);
        return false;
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_MAKE_COMMENT}/${id}`,
        { comment: makeComment, author: currentUser._id, to: id },
        {
          headers: {
            Authorization: localStorage.getItem("user"),
          },
        }
      );
      if (!data.status) {
        toast.error(data.msg, toastOption);
        setOtherLoading(false);
        return false;
      }

      if (data.status) {
        toast.success(data.msg, toastOption);
        setOtherLoading(false);
        setAllComments((all) => [
          {
            author: {
              name: currentUser.name,
              pic: currentUser.pic,
              _id: currentUser._id,
            },
            comment: data.comments.comment,
            to: id,
          },
          ...all,
        ]);
        setMakeComment("");
      }
    } catch (error) {
      console.log(error);
      setOtherLoading(false);
    }
  };

  const getAllComments = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_GET_ALL_COMMENTS}/${id}`
      );
      setAllComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommentContext.Provider value={{ createComment, getAllComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AuthProvider from "./context/Authentication/AuthContext";
import BlogProvider from "./context/Blogs/BlogContext";
import CommentProvider from "./context/Comment/CommentContext";
import FunctionProvider from "./context/Function/FunctionProvider";
import StateProvider from "./context/State/StateProvider";
import MainBlog from "./pages/AllBlogs/MainBlog";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Blog from "./pages/Blog/SingleBlog";
import Comment from "./pages/Comments/Comment";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Home from "./pages/Home/Home";
import MyProfile from "./pages/Profile/MyProfile";
import Navbar from "./utils/Navbar/Navbar";
import PreviewModal from "./utils/PreviewModal";
import Search from "./utils/Search/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <StateProvider>
          <FunctionProvider>
            <AuthProvider>
              <BlogProvider>
                <CommentProvider>
                  <PreviewModal />
                  <Search />
                  <Navbar />
                  <ToastContainer />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/allblog" element={<MainBlog />} />
                    <Route path="/blog/:id" element={<Blog />} />
                    <Route path="/comment/:id" element={<Comment />} />
                    <Route path="/createblog" element={<CreateBlog />} />
                    <Route path="/myprofile" element={<MyProfile />} />
                    <Route path="/editBlog/:id" element={<EditBlog />} />
                  </Routes>
                </CommentProvider>
              </BlogProvider>
            </AuthProvider>
          </FunctionProvider>
        </StateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

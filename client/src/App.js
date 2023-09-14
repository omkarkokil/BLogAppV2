import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainBlog from "./pages/AllBlogs/MainBlog";
import Navbar from "./utils/Navbar/Navbar";
import StateProvider from "./context/State/StateProvider";
import FunctionProvider from "./context/Function/FunctionProvider";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Blog from "./pages/Blog/SingleBlog";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import MyProfile from "./pages/Profile/MyProfile";
import EditBlog from "./pages/EditBlog";
import PreviewModal from "./utils/PreviewModal";
import AuthProvider from "./context/Authentication/AuthContext";
import BlogProvider from "./context/Blogs/BlogContext";
import Home from "./pages/Home/Home";
import Comment from "./pages/Comments/Comment"
import CommentProvider from "./context/Comment/CommentContext";
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

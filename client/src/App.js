import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainBlog from "./pages/MainBlog";
// import MyBlog from "./pages/MyBlog";
import Navbar from "./utils/Navbar";
import StateProvider from "./context/Hooks/StateProvider";
import FunctionProvider from "./context/Function/FunctionProvider";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Blog from "./utils/Blog";
import Comment from "./pages/Comment";
import CreateBlog from "./pages/CreateBlog";
import MyProfile from "./pages/MyProfile";
import EditBlog from "./pages/EditBlog";
import PreviewModal from "./utils/PreviewModal";

function App() {
  return (
    <>
      <>
        <BrowserRouter>
          <StateProvider>
            <FunctionProvider>
              {/* <PreviewModal /> */}
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
            </FunctionProvider>
          </StateProvider>
        </BrowserRouter>
      </>
    </>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{ background: "#222" }}
      className="text-center text-lg-start  text-light"
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us </span>
        </div>
      </section>
      <section>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3" />
                MagicalWinds
              </h6>
              <p>
                Here you can create your blogs and publish on the website easily
                and also watch content.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <Link to="/" className="text-reset">
                  Home
                </Link>
              </p>
              <p>
                <Link to="/allBlog" className="text-reset">
                  Blogs
                </Link>
              </p>
              <p>
                <Link to="/login" className="text-reset">
                  Login
                </Link>
              </p>
              <p>
                <Link to="/register" className="text-reset">
                  Register
                </Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3" /> Satara, Khandala-Bavada, IND
              </p>
              <p>
                <i className="fas fa-envelope me-3" />
                nsravan2709@gmail.com
              </p>
              <p>
                <i className="fas fa-print me-3" /> + 01 234 567 89
              </p>
              <p>
                <i className="fas fa-phone me-3" /> Created by OMKAR KOKIL
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright:
        <Link className="text-reset fw-bold" to="/">
          MagicalWinds.in
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

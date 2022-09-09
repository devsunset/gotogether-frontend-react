import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo"></div>
              <h4>Sign-In</h4>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="email"
                    placeholder="UserId"
                    size="lg"
                    className="h-auto"
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="lg"
                    className="h-auto"
                  />
                </Form.Group>
                <div className="mt-3">
                  <Link
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    to="/dashboard"
                  >
                    SIGN IN
                  </Link>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Don't have an account?{" "}
                  <NavLink
                    to={"/gotogether/register"}
                    className="nav-link"
                    activeClassName="active"
                  >
                    Create
                  </NavLink>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

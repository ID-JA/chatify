import React, { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import "./Signin.scss";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";

const Signin = () => {
  /**
   * ==================== STATES ====================
   */
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  /**
   * ==================== FUNCTIONS ====================
   */
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * TODO: Add validation
   * TODO: onSubmit function
   */

  return (
    <div className="signin">
      <Container>
        <h2 className="signin__branding">Chatify</h2>
        <div className="signin__form">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
                name="email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
                name="password"
              />
            </Form.Group>

            <Form.Group className="mt-4" controlId="formBasicPassword">
              <Button text="Sign Up" color="info" stretch={true} />
            </Form.Group>

            <p className="mt-2">
              Don't have an account?{" "}
              <Link className="link" to="/signup">
                Signup
              </Link>
            </p>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Signin;

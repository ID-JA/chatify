import React, { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import "./Signup.scss";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  /**
   * ==================== STATES ====================
   */
  const fileInput = useRef(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    picture: "",
  });
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  /**
   * ==================== FUNCTIONS ====================
   */
  const handleChange = (e) => {
    if (e.target.name === "picture") {
      setUser({
        ...user,
        picture: e.target.files[0].name,
      });
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  /**
   * TODO: Add validation
   * TODO: onSubmit function
   */

  return (
    <div className="signup">
      <Container>
        <h2 className="signup__branding">Chatify</h2>
        <div className="signup__form">
          <div
            className="signup__imgPlaceholder"
            onClick={() => fileInput.current.click()}
          >
            <input
              type="file"
              name="picture"
              id="signup__imgFileInput"
              ref={fileInput}
              hidden
              accept="image/*"
              multiple={false}
              onChange={(e) => {
                setFile(URL.createObjectURL(e.target.files[0]));
                setUser({ ...user, picture: e.target.files[0].name });
              }}
            />
            {/* if no img selected, show camera */}
            {file == null ? (
              <FaCamera />
            ) : (
              <img src={file} className="signup__imgPreview" />
            )}
          </div>
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
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={user.username}
                onChange={(e) => handleChange(e)}
                name="username"
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

            <p className="mt-2 signup__bottom">
              Already have an account?{" "}
              <Link className="link" to="/signin">
                Signin
              </Link>
            </p>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Signup;

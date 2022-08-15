import React, { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import validator from "email-validator";
import axios from "../../../config/axios.js";

import { useSignup } from "../../../hooks/useAxios.users.js";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";

import "./Signup.scss";

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
  const [error, setError] = useState("");

  /**
   * ==================== HOOKS ====================
   */
  const {
    mutate,
    isError,
    isLoading,
    error: mutationError,
    data,
  } = useSignup();

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

  const validateInputs = () => {
    const { username, email, password } = user;
    if (
      username.length > 0 &&
      email.length > 0 &&
      validator.validate(email) &&
      password.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleFileChanged = (e) => {
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
    setUser({ ...user, picture: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      if (validateInputs()) {
        // send data to server
        let formData = new FormData();
        const { username, email, password, picture } = user;

        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("picture", picture);
        mutate(formData);
      } else {
        setError("Please fill out all fields with valid information.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setUser({ username: "", email: "", password: "", picture: "" });
    }
  };

  return (
    <div className="signup">
      <Container>
        <h2 className="signup__branding">Chatify</h2>
        <div className="signup__form">
          {/* Error alert */}
          {isError && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {mutationError?.response.data.message.toString()}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}
          {/* Response alert */}
          {data && (
            <Alert variant="info" dismissible>
              {data.data.message}
            </Alert>
          )}
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
                handleFileChanged(e);
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
              <Button
                text="Sign Up"
                color="info"
                stretch={true}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
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

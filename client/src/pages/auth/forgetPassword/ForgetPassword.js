import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import "./ForgetPassword.scss";
import Button from "../../../components/button/Button";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  /**
   * ==================== STATES ====================
   */
  const [email, setEmail] = useState("");

  /**
   * ==================== FUNCTIONS ====================
   */
  const handleChange = (e) => setEmail((prev) => e.target.value);

  /**
   * TODO: Add validation
   * TODO: onSubmit function
   */

  return (
    <div className="fp">
      <Container>
        <h2 className="fp__branding">Chatify</h2>
        <div className="fp__form">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => handleChange(e)}
                name="email"
              />
            </Form.Group>

            <Form.Group className="mt-4" controlId="formBasicButton">
              <Button text="Submit" color="info" stretch={true} />
            </Form.Group>

            <p className="mt-2 mb-0 fp__bottom">
              Back to{" "}
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

export default ForgetPassword;

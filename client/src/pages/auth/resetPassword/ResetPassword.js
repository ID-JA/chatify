import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import "./ResetPassword.scss";
import Button from "../../../components/button/Button";

const ResetPassword = () => {
  /**
   * ==================== STATES ====================
   */
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  /**
   * ==================== FUNCTIONS ====================
   */

  /**
   * TODO: Add validation
   * TODO: onSubmit function
   */

  return (
    <div className="resetPassword">
      <Container>
        <h2 className="resetPassword__branding">Chatify</h2>
        <div className="resetPassword__form">
          <Form>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPasswordConfirmation">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                name="passwordConfirmation"
              />
            </Form.Group>

            <Form.Group className="mt-4" controlId="formBasicPassword">
              <Button text="Reset Password" color="info" stretch={true} />
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;

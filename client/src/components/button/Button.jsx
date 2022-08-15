import React from "react";
import "./Button.scss";

const Button = ({ color, text, stretch, handleSubmit, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <button
          type="button"
          className={`button ${color} ${stretch ? "stretch" : ""} loading`}
          onClick={handleSubmit}
        >
          <i className="fa-solid fa-circle-notch fa-spin"></i> submitting...
        </button>
      ) : (
        <button
          type="button"
          className={`button ${color} ${stretch ? "stretch" : ""} ${
            isLoading ? "loading" : ""
          }`}
          onClick={handleSubmit}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;

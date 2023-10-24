import React from "react";

const Modal = ({ children }) => {
  return (
    <div style={modalContainerStyle}>
      <div style={modalContentStyle}>
        {children}
      </div>
    </div>
  );
};

const modalContainerStyle = {
  position: "fixed",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000, // Make sure it's on top of other content
};

const modalContentStyle = {
  position: "relative",
  backdropFilter: "blur(12px)",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.2)",
  padding: "20px", // Increased padding for better readability
  backgroundColor: "white",
  width: "50%", // Adjust the width as needed
  borderRadius: "10px", // Rounded corners
};

export default Modal;

import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.css";

const Modal = ({ show, onClose, data }) => {
  // Modal component that is used to show the details of selected child in the list
  if (!show) return null; // Hide modal until selected
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="body">
        <ul>
          {Object.entries(data).map((value) => {
            // passing raw data from parent component and rendering using Object.entries to show all the key value pairs available
            return (
              // if value does not exist, hide key value pair
              value[1] && (
                <li key={value[0]}>
                  <strong style={{ textTransform: "capitalize" }}>
                    {value[0].replace(/_/g, " ")}:{" "}
                  </strong>
                  <span>{value[1]}</span>
                </li>
              )
            );
          })}
        </ul>
        <button className="btn" type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body // Appending the modal on body
  );
};

export default Modal;

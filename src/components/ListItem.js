import React, { useState } from "react";
import Modal from "./Modal";
import "../styles/listitem.css";

const ListItem = ({ value, children }) => {
  //Component used to render individual parent list items
  const [childVisible, setChildVisible] = useState(true); // state to track the visibility of child items
  const [activeModal, setActiveModal] = useState(null); // state to track which modal has to be currently opened

  const toggleList = () => {
    // toggle child items on click using css
    setChildVisible(!childVisible);
  };

  const openDialog = (id) => {
    // open a modal for only the selected child item
    setActiveModal(id);
  };

  const closeDialog = () => {
    // close the active modal
    setActiveModal(null);
  };

  return (
    <li className="list-item">
      <div className="title" onClick={toggleList}>
        {value}
      </div>
      {children &&
        children.length > 0 && ( // if children exist, render list of children. "active" css class used here to toggle between show and hide
          <ul className={"child-list" + (childVisible ? " active" : "")}>
            {children.map((child) => {
              return (
                // Fragment to hold both child list items and respective Modal
                <React.Fragment key={child.id}>
                  <li
                    onClick={() => openDialog(child.id)}
                    className="child-list-item"
                    key={child.id}
                  >
                    {child.title}
                  </li>
                  <Modal // Modal activated on click of child item
                    show={activeModal === child.id}
                    onClose={() => closeDialog()}
                    data={child}
                  />
                </React.Fragment>
              );
            })}
          </ul>
        )}
    </li>
  );
};

export default ListItem;

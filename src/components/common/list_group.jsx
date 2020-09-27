import React from "react";

const ListGroup = (props) => {
  const {
    valueProperty,
    textProperty,
    items,
    onSelection,
    selectedGenre,
  } = props;
  console.log(selectedGenre);
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onSelection(item)}
          className={
            selectedGenre._id === item._id
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;

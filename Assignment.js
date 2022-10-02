
/*

1.  Explain what the simple List component does.

    Answer:- It is used for display the list of items in the items array as single list items.
    We can perform various operations on it such as .map() to iterate over the list/array to list down all the elements.
    The wrappedListComponent returns a memoized components list. By memoized it states that it doesn't re-render unnecessarily that is if the component's props don't change it doesn't re-render.


2.  What problems/warnings are there with code?

    Answer:- Syntactical error while defining WrappedListComponent.propTypes - it would be arrayOf instead of shapeOf.
    Definitions of items was null and hence one can't go for null.map() in WrappedListComponent.defaultProps
    
    WrappedListComponent.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired
        })
    )
    };


 */



// 3.   Please fix, optimize, and/or modify the component as much as you think is necessary.

import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      onClick={onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
  const [setSelectedIndex, selectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex}
        />
      ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  items: [{text: "firstName", index: 1},{text: "lastName", index: 2}],
};

const List = memo(WrappedListComponent);

export default List;

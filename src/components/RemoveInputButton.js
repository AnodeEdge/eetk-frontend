import React from 'react';

function RemoveButton(props) {
    const handleButton = (evt) => {
      evt.preventDefault();
      props.removeData(props.index);
    };
    return <button onClick={handleButton}>{props.inputDescription}</button>;
  }

export default RemoveButton
import React from 'react';

function AddInputButton(props) {
    const handleButton = (evt) => {
      evt.preventDefault();
      props.addData(props.addedRow);
    };
    return <button onClick={handleButton}>{props.inputDescription}</button>;
  }

  export default AddInputButton;
import React from "react";

const FormRowTextArea = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-textarea"></input>
    </div>
  );
};

export default FormRowTextArea;

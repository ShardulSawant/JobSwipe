const FormRowSelectPosition = ({
  labelText,
  name,
  value,
  handleChange,
  list,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-select">
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue.position}>
              {itemValue.position}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelectPosition;

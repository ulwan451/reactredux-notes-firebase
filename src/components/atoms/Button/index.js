import React from "react";
const Button = ({ title, onClick, loading }) => {
  if (loading) {
    return <button className="btn disable">Loading...</button>;
  }
  return (
    <button onClick={onClick} className="btn btn-info">
      {title}
    </button>
  );
};

export default Button;

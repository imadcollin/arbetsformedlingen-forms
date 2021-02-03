import React from "react";

const Alert = ({ children, title, id }) => {
  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <div role="alertdialog" aria-labelledby={id}>
      <h1 id={id}>{title}</h1>
      <h3>{children}</h3>
      <button onClick={refreshPage}> close</button>
    </div>
  );
};
export default Alert;

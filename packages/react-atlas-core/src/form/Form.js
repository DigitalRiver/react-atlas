import React, { PropTypes } from "react";

/**
 * A simple wrapper around the regular HTML `<form>` element.
 */
const Form = ({ children, ...props }) => {
  return (
    <form {...props}>
      {children}
    </form>
  );
};

Form.propTypes = {
  "children": PropTypes.node
};

export default Form;

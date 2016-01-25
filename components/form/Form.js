import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node
};

const Form = ({ children, ...props }) => {
    return (
      <form {...this.props}>
        {children}
      </form>
    );
};

Form.propTypes = propTypes;

export default Form;

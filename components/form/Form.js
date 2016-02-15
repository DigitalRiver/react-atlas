import React, { PropTypes } from 'react';

const Form = ({ children, ...props }) => {
    return (
      <form {...this.props}>
        {children}
      </form>
    );
};

Form.propTypes = {
  children: PropTypes.node
};

export default Form;

import React from "react";
import PropTypes from 'prop-types';

class Form extends React.PureComponent {
  render() {
    const { className, children} = this.props;
    return (
      <form className={cx(className)}>
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  "children": PropTypes.node
};

export default Form;

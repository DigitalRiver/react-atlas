import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cx from 'classnames';

class SearchField extends Component {
  render() {
    const {
      className,
      defaultValue,
      placeholder,
      onKeyUp,
      ...rest
    } = this.props;
    return (
      <div>
        <input
          className={cx("form-control", className)}
          type='text'
          defaultValue={defaultValue}
          placeholder={placeholder || SearchField.defaultProps.placeholder}
          onKeyUp={onKeyUp}
          style={{ "zIndex": 0 }}
        {...rest}/>
        <icon className={"ra_Table__magnifying-glass"} />
      </div>
    );
  }
}

SearchField.propTypes = {
  "className": PropTypes.string,
  "defaultValue": PropTypes.string,
  "placeholder": PropTypes.string,
  "onKeyUp": PropTypes.func
};
SearchField.defaultProps = {
  "className": '',
  "defaultValue": '',
  "placeholder": 'Search',
  "onKeyUp": undefined
};

export default SearchField;

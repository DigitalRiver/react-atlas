import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames/bind';
import style from './checkbox.css';

const propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    label: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string
};

class Checkbox extends Component {
  render () {
      const {title, label, disabled, inline, className, ...props} = this.props;
      const cx = ClassNames.bind(style);
      const componentClass = cx({
          "block": !inline,
          inline,
          disabled,
          [className]: className
      });

      return (
          <label className={componentClass} title={title}>
              <input type="checkbox" disabled={disabled} className={style.input} {...props} />
              {label && <span className={style.label}>{label}</span>}
          </label>
      );
  }
}

Checkbox.propTypes = propTypes;

export default Checkbox;

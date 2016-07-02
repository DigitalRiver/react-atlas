import React, { Component, PropTypes } from 'react';
import { classNames } from '../utils';
import themeable from 'react-themeable';

const Radio = ({className, disabled, inline, name, label, ...props}) => {
  const theme = themeable(props.theme);
  const labelClasses = classNames({
    block: !inline,
    inline,
    disabled
  }, className);

  return (
    <label {...theme(1, ...labelClasses)}>
      <input
        {...props}
        disabled={disabled}
        name={name}
        type="radio"
      />
      {label ? <span> {label}</span> : null}
    </label>
  );
};

Radio.propTypes = {
  defaultChecked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.any
};

Radio.defaultProps = {
  className: '',
  disabled: false,
  inline: false
};

Radio.styleguide = {
  category: 'Form Components',
  index: '3.8',
  example: `
<section>
  <h5>Individual Radio Buttons</h5>
  <p>Not aware of each other, use RadioGroup for that.</p>
  <Radio label="Checked Radio" value="checkedRadio" defaultChecked />
  <Radio label="Disabled Radio" value="disabledRadio" disabled/>
  <Radio label="Inlined 1" value="inlined1" className="someClassIMadeUp" inline />
  <Radio label="Inlined 2" value="inlined2" inline />
</section>
`
};

export default Radio;

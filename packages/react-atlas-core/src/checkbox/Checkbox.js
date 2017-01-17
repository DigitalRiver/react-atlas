import React, { Component, PropTypes } from 'react';
import { classNames } from '../utils';
import themeable from 'react-themeable';

/**
 * Simple component for a basic checkbox
 */
const Checkbox = ({title, label, disabled, inline, className, ...props}) => {
      const theme = themeable(props.theme);
      const componentClasses = classNames({
          "block": !inline,
          inline,
          disabled,
          [className]: className
      });

      /* If title is not set use label as the title. */
      title = title ? title : label;

      return (
          <label {...theme(1, ...componentClasses)} title={title}>
              <input {...props} type="checkbox" disabled={disabled} {...theme(2, 'input')} />
              {label && <span {...theme(3, 'label')}>{label}</span>}
          </label>
      );
};

Checkbox.propTypes = {
  /**
   * Text for checkbox label
   * @examples 'Some Label'
   */
  label: PropTypes.string,
	/**
   * A css class name that will be appended to the wrapping <label> element around the <input> and <span> elements.
   */
  className: PropTypes.string,
	/**
   * If included, checkbox is disabled
   * @examples <Checkbox disabled />, <Checkbox disabled={true} />
   */
  disabled: PropTypes.bool,
	/**
   * If included, renders the checkbox and it's label inline, so it can be side-by-side to other content.
   */
  inline: PropTypes.bool,
  /**
   * Text for checkbox label title. (i.e. "alt-text" for checkboxes, useful for accessibility). If not provided, will be label text.
   * @examples 'Some Title'
   */
  title: PropTypes.string,
	/**
   * Defines if checkbox should be checked on load.
   */
  defaultChecked: PropTypes.bool
};

Checkbox.defaultProps = {
  className: '',
  disabled: false,
  inline: false,
  theme: {
    'block': true
  }
};

Checkbox.styleguide = {
  category: "Form Components",
  index: "3.2",
  example: `
<section style={{textAlign:"left"}}>
  <h4 style={{marginBottom: "10px"}}>Checkboxes</h4>
  <Checkbox
    defaultChecked={true}
    label="Checked"
  />
  <Checkbox
    defaultChecked={false}
    label="Not checked"

  />
  <Checkbox
    defaultChecked={true}
    label="Disabled checkbox"
    disabled
  />
  <Checkbox
    defaultChecked={false}
    label="Inline checkbox 1"
    inline
  />
  <Checkbox
    defaultChecked={false}
    label="Inline checkbox 2"
    inline
  />
</section>
`
};

export default Checkbox;

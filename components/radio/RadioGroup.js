import React, { Component, PropTypes } from 'react';
import Radio from './Radio';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  name: PropTypes.string
};

const defaultProps = {
  className: ''
};

const RadioGroup = ({className, children, name, ...props}) => {
  return (
      <div {...props} className={className}>
        {React.Children.map(children, (child) => {
          if (child.type === Radio) {
            return <Radio {...child.props} name={name}/>
          } else {
            return child
          }
        })}
      </div>
  )
};

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default RadioGroup;

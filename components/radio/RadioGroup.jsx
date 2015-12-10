import React from 'react';
import RadioButton from './RadioButton';

class RadioGroup extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    name: React.PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  renderRadioButtons = () => {
    return React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          "name": this.props.name
        });
    });
  }

  render () {
    return (
      <div className={this.props.className}>
        {this.renderRadioButtons()}
      </div>
    );
  }
}

export default RadioGroup;

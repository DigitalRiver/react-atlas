import React, { Component, PropTypes } from 'react';
import blacklist from 'blacklist';
import A from '../constants';

const propTypes = {
	children: React.PropTypes.node.isRequired,
	className: React.PropTypes.string,
	gutter: React.PropTypes.number,
	style: React.PropTypes.object
};

const defaultProps = {
	gutter: A.width.gutter
};

class Row extends Component {
	render() {
		let { gutter } = this.props;
		let rowStyle = {
			display: 'flex',
			flexWrap: 'wrap',
			msFlexWrap: 'wrap',
			WebkitFlexWrap: 'wrap',
			marginLeft: (gutter / -2),
			marginRight: (gutter / -2)
		};

		let props = blacklist(this.props, 'className', 'gutter', 'style');

		return (
			<div {...props} style={Object.assign(rowStyle, this.props.style)} className={this.props.className} />
		);
	}
}

Row.propTypes = propTypes;

Row.defaultProps = defaultProps;

export default Row;
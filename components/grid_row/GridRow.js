import React, { Component, PropTypes } from 'react';
import blacklist from 'blacklist';
import A from '../constants';

const propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	gutter: PropTypes.number,
	style: PropTypes.object
};

const defaultProps = {
	gutter: A.width.gutter
};

class GridRow extends Component {
	render () {
		const { gutter } = this.props;
		const rowStyle = {
			display: 'flex',
			flexWrap: 'wrap',
			msFlexWrap: 'wrap',
			WebkitFlexWrap: 'wrap',
			marginLeft: (gutter / -2),
			marginRight: (gutter / -2)
		};

		const props = blacklist(this.props, 'className', 'gutter', 'style');

		return (
			<div {...props} style={Object.assign(rowStyle, this.props.style)} className={this.props.className} />
		);
	}
}

GridRow.propTypes = propTypes;

GridRow.defaultProps = defaultProps;

export default GridRow;

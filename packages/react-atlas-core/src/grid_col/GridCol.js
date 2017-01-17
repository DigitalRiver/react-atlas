/** GridCol.js mostly taken and inspired from Elemental UI.
 * used for Grid functionality
 * Copyright (c) 2016 Thinkmill Pty Ltd
 */

import React, { Component, PropTypes } from 'react';
import blacklist from 'blacklist';
import A from '../constants';

/**
 * Component that handles Col/Column part of a Grid system. Syntax  somewhat similar to bootstraps grid class syntax.
 */
class GridCol extends Component {
	constructor (props) {
        super(props);
        this.state = {
            windowWidth: (typeof window !== 'undefined') ? window.innerWidth : 0
        };
    }

  componentDidMount () {
		if (typeof window !== 'undefined') window.addEventListener('resize', this._handleResize);
	}
	componentWillUnmount () {
		if (typeof window !== 'undefined') window.removeEventListener('resize', this._handleResize);
	}

	_handleResize() {
		this.setState({
			windowWidth: (typeof window !== 'undefined') ? window.innerWidth : 0
		});
	};

	render () {
		const { basis, gutter, xs, sm, md, lg } = this.props;
		const { windowWidth } = this.state;

		const columnStyle = {
			minHeight: 1,
			paddingLeft: (gutter / 2),
			paddingRight: (gutter / 2),
			boxSizing: 'border-box'
		};

		// if no width control is provided fill available space
		if (!basis && !xs && !sm && !md && !lg) {
			columnStyle.flex = '1 1 auto';
			columnStyle.msFlex = '1 1 auto';
			columnStyle.WebkitFlex = '1 1 auto';
		}

		// set widths / flex-basis
		if (basis) {
			columnStyle.flex = '1 0 ' + basis;
			columnStyle.msFlex = '1 0 ' + basis;
			columnStyle.WebkitFlex = '1 0 ' + basis;
		} else if (windowWidth < A.breakpoint.xs) {
			columnStyle.width = xs;
		} else if (windowWidth < A.breakpoint.sm) {
			columnStyle.width = sm || xs;
		} else if (windowWidth < A.breakpoint.md) {
			columnStyle.width = md || sm || xs;
		} else {
			columnStyle.width = lg || md || sm || xs;
		}

		if (!columnStyle.width) {
			columnStyle.width = '100%';
		}

		if (columnStyle.width in A.fractions) {
			columnStyle.width = A.fractions[columnStyle.width];
		}

		const props = blacklist(this.props, 'basis', 'gutter', 'style', 'xs', 'sm', 'md', 'lg');

		return <div style={Object.assign(columnStyle, this.props.style)} {...props} />;
	}

}

GridCol.propTypes = {
	/* eslint-disable react/jsx-sort-prop-types */
	basis: PropTypes.oneOfType([
		PropTypes.number, // allow pixels
		PropTypes.string // allow percentage
	]),
	children: PropTypes.node,
	gutter: PropTypes.number,
	style: PropTypes.object,
	lg: PropTypes.string, // width as a percentage or fraction
	md: PropTypes.string, // width as a percentage or fraction
	sm: PropTypes.string, // width as a percentage or fraction
	xs: PropTypes.string // width as a percentage or fraction
	/* eslint-enable */
};

GridCol.defaultProps = {
	gutter: A.width.gutter
};

GridCol.styleguide = {
  category: 'Layout',
  index: '4.3',
  example: `
<section>
  <h5>GridCol Example</h5>
    <GridRow>

      <GridCol sm="1" md="1/2">
        <Card>
          <h1>Title Goes Here</h1>
          <p>I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.</p>
          <Button>Action 1</Button>
          <Button>Action 2</Button>
        </Card>
      </GridCol>

      <GridCol sm="1" md="1/2">
        <Card>
          <h1>Title Goes Here</h1>
          <p>So when you get something that has the name Kanye West on it, it’s supposed to be pushing the furthest possibilities.</p>
          <Button>Action 1</Button>
          <Button>Action 2</Button>
        </Card>
      </GridCol>

      <GridCol sm="1">
        <Card>
            <h1>Basic Card</h1>
          <h2>You can also use a subtitle like this</h2>
          <p>I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus.</p>
        </Card>
      </GridCol>

    </GridRow>
</section>
`
};

export default GridCol;

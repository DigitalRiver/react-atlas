import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Card extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Card {...this.props}></Atlas.Card>
    )
  }
}

Card.propTypes = {
  /**
   * Any HTML element or React Component.
   * @examples <p>Some Text.</p>
   */
  "children": PropTypes.node.isRequired,

  /**
   * Custom classnames prop
   */
  "className": PropTypes.string
};
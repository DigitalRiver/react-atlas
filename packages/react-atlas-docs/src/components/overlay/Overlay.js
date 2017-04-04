import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Overlay extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Overlay {...this.props}></Atlas.Overlay>
    )
  }
}
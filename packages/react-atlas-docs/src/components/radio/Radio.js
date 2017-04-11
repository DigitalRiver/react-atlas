import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Radio extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Radio {...this.props}></Atlas.Radio>
    )
  }
}
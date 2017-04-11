import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Form extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Button {...this.props}></Atlas.Button>
    )
  }
}
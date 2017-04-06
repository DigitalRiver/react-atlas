import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Input extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Input {...this.props}></Atlas.Input>
    )
  }
}
import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Tab extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Tab {...this.props}></Atlas.Tab>
    )
  }
}
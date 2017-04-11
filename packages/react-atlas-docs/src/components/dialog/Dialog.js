import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Drawer extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Drawer {...this.props}></Atlas.Drawer>
    )
  }
}
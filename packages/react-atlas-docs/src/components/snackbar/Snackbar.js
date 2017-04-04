import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Snackbar extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Snackbar {...this.props}></Atlas.Snackbar>
    )
  }
}
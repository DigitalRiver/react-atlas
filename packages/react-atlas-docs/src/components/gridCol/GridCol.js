import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class GridCol extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.GridCol {...this.props}></Atlas.GridCol>
    )
  }
}
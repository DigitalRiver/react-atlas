import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class List extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.List {...this.props}></Atlas.List>
    )
  }
}
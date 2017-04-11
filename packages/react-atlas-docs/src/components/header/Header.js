import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Header extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Header {...this.props}></Atlas.Header>
    )
  }
}
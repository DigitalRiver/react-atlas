import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Tr extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Tr {...this.props}></Atlas.Tr>
    )
  }
}
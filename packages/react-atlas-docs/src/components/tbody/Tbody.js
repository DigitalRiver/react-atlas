import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Tbody extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Tbody {...this.props}></Atlas.Tbody>
    )
  }
}
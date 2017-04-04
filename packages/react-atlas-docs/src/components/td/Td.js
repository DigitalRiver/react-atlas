import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Td extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Td {...this.props}></Atlas.Td>
    )
  }
}
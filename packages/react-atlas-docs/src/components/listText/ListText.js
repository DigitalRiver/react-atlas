import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class ListText extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.ListText {...this.props}></Atlas.ListText>
    )
  }
}
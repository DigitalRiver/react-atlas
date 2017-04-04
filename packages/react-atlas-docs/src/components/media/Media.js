import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Media extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Media {...this.props}></Atlas.Media>
    )
  }
}
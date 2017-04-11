import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Hint extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Hint {...this.props}></Atlas.Hint>
    )
  }
}
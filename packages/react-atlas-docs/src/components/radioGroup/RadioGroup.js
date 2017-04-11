import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class RadioGroup extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.RadioGroup {...this.props}></Atlas.RadioGroup>
    )
  }
}
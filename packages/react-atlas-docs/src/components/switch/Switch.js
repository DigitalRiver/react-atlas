import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Switch extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Switch {...this.props}></Atlas.Switch>
    )
  }
}
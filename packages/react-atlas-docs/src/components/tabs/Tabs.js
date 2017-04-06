import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Tabs extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Tabs {...this.props}></Atlas.Tabs>
    )
  }
}
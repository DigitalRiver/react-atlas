import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class TabContent extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.TabContent {...this.props}></Atlas.TabContent>
    )
  }
}
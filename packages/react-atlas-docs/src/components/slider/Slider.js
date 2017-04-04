import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Slider extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Slider {...this.props}></Atlas.Slider>
    )
  }
}
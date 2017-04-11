import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Button extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Atlas.Button {...this.props}></Atlas.Button>
        )
    }
}
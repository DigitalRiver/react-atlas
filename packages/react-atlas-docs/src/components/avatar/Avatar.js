import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Avatar extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Atlas.Avatar {...this.props}></Atlas.Avatar>
        )
    }
}
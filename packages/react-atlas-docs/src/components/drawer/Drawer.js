import React, { PropTypes } from "react";
import * as atlas from 'react-atlas';

export default class Drawer extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <atlas.Drawer {...this.props}></atlas.Drawer>
        )
    }
}
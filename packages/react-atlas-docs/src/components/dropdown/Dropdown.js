import React, { PropTypes } from "react";
import * as atlas from 'react-atlas';

export default class Dropdown extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <atlas.Dropdown {...this.props}></atlas.Dropdown>
        )
    }
}
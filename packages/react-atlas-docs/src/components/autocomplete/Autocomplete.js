import React, { PropTypes } from "react";
import * as atlas from 'react-atlas';

export default class Autocomplete extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <atlas.Autocomplete {...this.props}></atlas.Autocomplete>
        )
    }
}
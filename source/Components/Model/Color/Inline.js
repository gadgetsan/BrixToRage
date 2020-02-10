import React, { Component } from "react";
import { getContrastYIQ } from "/source/Shared/helpers";

export default class ColorInlineDisplay extends Component {
    render() {
        var style = {
            background: "#" + this.props.color.Hex,
            color: getContrastYIQ(this.props.color.Hex),
            fontSize: "12px",
            padding: "3px",
            borderRadius: "3px"
        };
        return <span style={style}>{this.props.color.Name}</span>;
    }
}

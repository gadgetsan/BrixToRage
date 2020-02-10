import React, { Component } from "react";

export default class LocationInlineDisplay extends Component {
    render() {
        return (
            <span>
                <strong>{this.props.location.LocationCode}</strong>
                {this.props.hideName ? "" : " - " + this.props.location.Name}
            </span>
        );
    }
}

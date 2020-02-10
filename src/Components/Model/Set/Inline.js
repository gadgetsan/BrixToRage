import React, { Component } from "react";

export default class SetInlineDisplay extends Component {
    render() {
        return (
            <span>
                {this.props.set.Name}{" "}
                <small>({this.props.set.RebrickableId})</small>
            </span>
        );
    }
}

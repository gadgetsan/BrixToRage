import React, { Component } from "react";

export default class WaitForLoad extends Component {
    render() {
        if (this.props.loading === undefined) {
            return null;
        } else {
            return (
                <>{this.props.loading ? "Loading..." : this.props.children}</>
            );
        }
    }
}

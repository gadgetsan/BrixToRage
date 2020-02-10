import React, { Component } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";

export default class TableList extends Component {
    render() {
        return (
            <MDBTable small className="partsTable">
                <MDBTableHead>
                    <tr>{this.props.children}</tr>
                </MDBTableHead>
                <MDBTableBody>
                    {this.props.data.map(element => {
                        return React.cloneElement(this.props.row, {
                            key: element.id,
                            item: element
                        });
                    })}
                </MDBTableBody>
            </MDBTable>
        );
    }
}

import React, { Component } from "react";
import PageLayout from "/src/Shared/Layout/PageLayout";
import { MDBCol, MDBRow, MDBCard, MDBCardHeader, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBCardTitle, MDBIcon } from "mdbreact";

export default class StoreViewLocationTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBCard narrow>
                <MDBCardHeader>
                    <h4>List of Locations</h4>
                </MDBCardHeader>
                <MDBCardBody cascade>
                    <MDBCardTitle>
                        <MDBRow>
                            <MDBCol size="4">
                                <form className="form-inline mt-4 mb-4" id="searchForm" onSubmit={this.handleSearch}>
                                    <MDBIcon icon="search" />
                                    <input
                                        className="form-control form-control-sm ml-3 w-75"
                                        type="text"
                                        placeholder="Search"
                                        aria-label="Search"
                                        label="Search"
                                        value={this.state.searchTerm}
                                        onChange={this.searchChange}
                                    />
                                </form>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardTitle>
                    <MDBTable small className="partsTable">
                        <MDBTableHead>
                            <tr>
                                <th>Image</th>
                                <th>Part #</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody />
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
        );
    }
}

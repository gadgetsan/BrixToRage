import React, { Component } from "react";
import PageLayout from "/src/Shared/Layout/PageLayout";
import PartListPartRow from "/src/Scenes/PartListView/PartListPartRow";
import helpers from "./Shared/helpers";
import StoreViewPartImage from "/src/Scenes/StoreView/StoreViewPartImage";
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCardTitle,
    MDBInput,
    MDBIcon,
    MDBBtn,
    MDBFormInline
} from "mdbreact";

export default class Pagination extends Component {
    render() {
        return (
            <ul className="pagination">
                <li className={"paginate_button page-item previous"} id="dtBasicExample_previous">
                    <a aria-controls="dtBasicExample" data-dt-idx="0" tabIndex="0" className="page-link" onClick={this.props.pageMinus}>
                        Previous
                    </a>
                </li>
                <li className="paginate_button page-item active">
                    <a aria-controls="dtBasicExample" data-dt-idx="1" tabIndex="0" className="page-link">
                        {this.props.currentPage}
                    </a>
                </li>
                <li className="paginate_button page-item next" id="dtBasicExample_next">
                    <a aria-controls="dtBasicExample" data-dt-idx="7" tabIndex="0" className="page-link" onClick={this.props.nextPage}>
                        Next
                    </a>
                </li>
            </ul>
        );
    }
}

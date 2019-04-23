import React, { Component } from "react";
import PageLayout from "./Shared/Layout/PageLayout";
import SetsImportModal from "./Scenes/SetsView/SetsImportModal";
import helpers from "./Shared/helpers";
import SetsSetRow from "./Scenes/SetsView/SetsSetRow";
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

export default class SetsPage extends Component {
    constructor(props) {
        super(props);
        this.searchChange = this.searchChange.bind(this);
        this.fetchSets = this.fetchSets.bind(this);
        this.state = {
            isLoading: true,
            searchTerm: ""
        };
    }

    fetchSets(page) {
        if (!page) {
            page = 1;
        }
        this.setState({ isLoading: true, currentPage: page });
        helpers.fetchHelperWithData("getSets", { searchTerm: this.state.searchTerm, currentPage: page }, sets => {
            this.setState({
                sets: sets,
                isLoading: false
            });
            //console.dir(parts);
        });
    }

    componentDidMount() {
        this.fetchSets();
    }

    searchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        return (
            <PageLayout>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard narrow>
                            <MDBCardHeader>
                                <h4>Sets List</h4>
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
                                        <MDBCol size="4">
                                            <SetsImportModal update={this.fetchSets} />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardTitle>
                                <MDBTable small className="partsTable">
                                    <MDBTableHead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.state.isLoading ? (
                                            <tr>
                                                <td colSpan="6">loading...</td>
                                            </tr>
                                        ) : (
                                            this.state.sets.map(set => <SetsSetRow key={set.RebrickableId} set={set} />)
                                        )}
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </PageLayout>
        );
    }
}

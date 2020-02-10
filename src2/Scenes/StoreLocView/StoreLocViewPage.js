import React, { Component } from "react";
import PageLayout from "../../Shared/Layout/PageLayout";
import StoreLocViewRow from "../../Scenes/StoreLocView/StoreLocViewRow";
import StoreLocCreateModal from "../../Scenes/StoreLocView/StoreLocCreateModal";
import helpers from "../../Shared/helpers";
import Pagination from "../../Shared/Pagination";
import StoreViewPartImage from "../../Scenes/StoreView/StoreViewPartImage";
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

export default class StoreLocViewPage extends Component {
    constructor(props) {
        super(props);
        this.searchChange = this.searchChange.bind(this);
        this.fetchlocations = this.fetchlocations.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.pagePlus = this.pagePlus.bind(this);
        this.pageMinus = this.pageMinus.bind(this);
        this.state = {
            isLoading: true,
            searchTerm: "",
            currentPage: 1
        };
    }

    handleSearch(event) {
        event.preventDefault();
        this.fetchlocations();
    }

    fetchlocations(page) {
        if (!page) {
            page = 1;
        }
        this.setState({ isLoading: true, currentPage: page });
        helpers.fetchHelperWithData("getLocations", { searchTerm: this.state.searchTerm, currentPage: page }, locations => {
            this.setState({
                locations: locations,
                isLoading: false
            });
            //console.dir(parts);
        });
    }

    componentDidMount() {
        this.fetchlocations();
    }

    searchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    pagePlus() {
        this.fetchlocations(this.state.currentPage + 1);
    }
    pageMinus() {
        this.fetchlocations(this.state.currentPage - 1);
    }

    render() {
        return (
            <PageLayout>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard narrow>
                            <MDBCardHeader>
                                <h4>Locations List</h4>
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
                                            <StoreLocCreateModal />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardTitle>
                                <MDBTable small className="partsTable">
                                    <MDBTableHead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Name</th>
                                            <th>Parts Qt.</th>
                                            <th>Actions</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.state.isLoading ? (
                                            <tr>
                                                <td colSpan="6">loading...</td>
                                            </tr>
                                        ) : (
                                            this.state.locations.map(location => (
                                                <StoreLocViewRow
                                                    key={location.LocationCode}
                                                    location={location}
                                                    update={function() {
                                                        this.fetchlocations(this.state.currentPage);
                                                    }}
                                                />
                                            ))
                                        )}
                                    </MDBTableBody>
                                </MDBTable>
                                <Pagination currentPage={this.state.currentPage} nextPage={this.pagePlus} previousPage={this.pageMinus} />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </PageLayout>
        );
    }
}

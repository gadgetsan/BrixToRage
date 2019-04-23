import React, { Component } from "react";
import PageLayout from "./Shared/Layout/PageLayout";
import PartListPartRow from "./Scenes/PartListView/PartListPartRow";
import helpers from "./Shared/helpers";
import Pagination from "./Shared/Pagination";
import StoreViewPartImage from "./Scenes/StoreView/StoreViewPartImage";
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

export default class PartListPage extends Component {
    constructor(props) {
        super(props);
        this.locationUpdate = this.locationUpdate.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.fetchParts = this.fetchParts.bind(this);
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
        this.fetchParts();
    }

    fetchParts(page) {
        if (!page) {
            page = 1;
        }
        this.setState({ isLoading: true, currentPage: page });
        helpers.fetchHelperWithData("getParts", { searchTerm: this.state.searchTerm, currentPage: page }, parts => {
            this.setState({
                parts: parts,
                isLoading: false
            });
            //console.dir(parts);
        });
    }

    componentDidMount() {
        this.fetchParts();
    }

    searchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    pagePlus() {
        this.fetchParts(this.state.currentPage + 1);
    }
    pageMinus() {
        this.fetchParts(this.state.currentPage - 1);
    }

    locationUpdate(newLocation, partId, cb) {
        console.log("changing location: " + newLocation, " part: " + partId);
        //TODO: aller changer dans la liste l'item en question pour le mettre à jour
        var newParts = this.state.parts;
        var currentIndex = 0;
        var idToUpdate = 0;
        //console.dir(editedIdea);

        for (var part of newParts) {
            if (part.RebrickableId == partId) {
                idToUpdate = currentIndex;
                break;
            }
            currentIndex++;
        }

        newParts[idToUpdate].LocationCode = newLocation;
        this.setState({
            parts: newParts,
            isLoading: false
        });
        //console.dir(parts);
        cb();
    }

    render() {
        return (
            <PageLayout>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard narrow>
                            <MDBCardHeader>
                                <h4>
                                    Unsorted Parts List <small>ordered by quantity</small>
                                </h4>
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
                                    <MDBTableBody>
                                        {this.state.isLoading ? (
                                            <tr>
                                                <td colSpan="6">loading...</td>
                                            </tr>
                                        ) : (
                                            this.state.parts.map(part => (
                                                <PartListPartRow key={part.RebrickableId} part={part} locationUpdate={this.locationUpdate} />
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

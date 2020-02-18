import React, { Component } from "react";
import Page from "../Shared/Page";
import TableList from "../Shared/TableList";
import Pagination from "../Shared/Pagination";
import SearchForm from "../Shared/SearchForm";
import { connect } from "react-redux";
import { fetchList } from "Actions/shared";

import LocationTableRow from "../../Model/Location/TableRow";
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle
} from "mdbreact";

import { getList, getListError, getListIsLoading } from "Selectors/shared";

//FOLLOWING THOSE GUIDE:
//https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3
//https://engineering.haus.com/connecting-redux-to-your-api-eac51ad9ff89
//https://techblog.appnexus.com/five-tips-for-working-with-redux-in-large-applications-89452af4fdcb
//--Reselect pour des Selectors? https://redux.js.org/recipes/computing-derived-data/

export class Locations extends Component {
    constructor(props) {
        super(props);
        this.pageChange = this.pageChange.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            page: 1,
            searchTerm: ""
        };
    }

    fetch() {
        this.props.fetchList(
            "locations",
            this.state.page,
            this.state.searchTerm
        );
    }
    componentDidMount() {
        this.fetch();
    }

    pageChange(newPage) {
        this.setState({ ...this.state, page: newPage }, this.fetch);
    }

    search(newTerm) {
        this.setState({ ...this.state, searchTerm: newTerm }, this.fetch);
    }

    render() {
        return (
            <Page>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard narrow>
                            <MDBCardHeader>
                                <h4>
                                    Unsorted Locations List{" "}
                                    <small>ordered by quantity</small>
                                </h4>
                            </MDBCardHeader>
                            <MDBCardBody cascade>
                                <MDBCardTitle>
                                    <MDBRow>
                                        <MDBCol size="4">
                                            <SearchForm execute={this.search} />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardTitle>
                                {this.props.error ? (
                                    <p>
                                        Sorry! There was an error loading the
                                        Locations:
                                    </p>
                                ) : null}
                                {this.props.isLoading ? <p>Loading…</p> : null}

                                {!this.props.isLoading && !this.props.error ? (
                                    <TableList
                                        className="partsTable"
                                        row={<LocationTableRow />}
                                        data={this.props.locations}
                                    >
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Parts Count</th>
                                        <th>Distinct Parts</th>
                                        <th>Actions</th>
                                    </TableList>
                                ) : null}

                                <Pagination
                                    currentPage={this.state.page}
                                    pageChange={this.pageChange}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </Page>
        );
    }
}

const mapStateToProps = state => {
    return {
        locations: getList(state, "locations"),
        error: getListError(state, "locations"),
        isLoading: getListIsLoading(state, "locations")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchList: (type, page, search) =>
            dispatch(fetchList(type, page, search))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Locations);

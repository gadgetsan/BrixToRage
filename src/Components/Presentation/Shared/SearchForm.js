import React, { Component } from "react";
import { MDBIcon } from "mdbreact";

export default class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.doSearch = this.doSearch.bind(this);
        this.searchChange = this.searchChange.bind(this);
        this.state = {
            searchTerm: ""
        };
    }
    doSearch(event) {
        event.preventDefault();
        this.props.execute(this.state.searchTerm);
    }
    searchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }
    render() {
        return (
            <form
                className="form-inline mt-4 mb-4"
                id="searchForm"
                onSubmit={this.doSearch}
            >
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
        );
    }
}

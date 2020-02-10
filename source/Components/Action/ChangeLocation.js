import React, { Component } from "react";
import Select from "react-select";
import {
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter
} from "mdbreact";
import { connect } from "react-redux";
import { changeLocation } from "/source/Actions/parts";
import { fetchTemporaryList } from "/source/Actions/shared";
import {
    getList,
    getListError,
    getListIsLoading
} from "/source/Selectors/shared";

export class ChangeLocation extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.render = this.render.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.id = 0;
    }
    state = {
        modal: false
    };
    toggle = () => {
        if (this.state.modal === false) {
            this.props.fetchTemporaryList("locations");
        }
        this.setState({
            modal: !this.state.modal
        });
    };

    handleChange(event) {
        this.id = event.id;
    }

    saveChanges(event) {
        console.log(
            "Assigning new Location: " +
                this.id +
                " to part with id " +
                this.props.part.id
        );
        this.props.changeLocation(this.props.part.id, this.id);
        this.toggle();
    }
    render() {
        var button = (
            <MDBBtn color="primary" size="sm">
                Change Location
            </MDBBtn>
        );
        if (this.props.customButton) {
            button = this.props.customButton;
        }
        button = React.cloneElement(button, {
            onClick: this.toggle
        });
        return (
            <>
                {button}
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>
                        Add an emplacement for part #
                        {this.props.part.RebrickableId}
                    </MDBModalHeader>
                    <MDBModalBody>
                        <Select
                            onChange={this.handleChange}
                            options={this.props.locations}
                            isSearchable
                            isLoading={this.props.isLoading}
                            getOptionLabel={location => {
                                return (
                                    location.Name +
                                    " (" +
                                    location.LocationCode +
                                    ")"
                                );
                            }}
                            getOptionValue={location => {
                                return location.id;
                            }}
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="primary" onClick={this.saveChanges}>
                            Move to this location
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        locations: getList(state, "temp"),
        error: getListError(state, "temp"),
        isLoading: getListIsLoading(state, "temp")
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLocation: (partId, locationId) =>
            dispatch(changeLocation(partId, locationId)),
        fetchTemporaryList: (type, page) =>
            dispatch(fetchTemporaryList(type, page))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeLocation);

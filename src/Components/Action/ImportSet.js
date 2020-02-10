import React, { Component } from "react";
import { connect } from "react-redux";
import {
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBInput
} from "mdbreact";
import { importSet } from "/src/Actions/sets";

export class SetsImportModal extends Component {
    constructor(props) {
        super(props);
        this.createLocation = this.createLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            modal: false,
            SetCode: ""
        };
    }

    toggle = nr => () => {
        this.setState({
            modal: !this.state.modal,
            SetCode: ""
        });
    };

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    createLocation() {
        //console.log({ SetCode: this.state.SetCode });
        this.props.importSet(this.state.SetCode);
    }

    render() {
        var importedMessage = "";
        if (Object.keys(this.props.importedSet).length !== 0) {
            importedMessage = (
                <p className="green-text">
                    {"Imported set " +
                        this.props.importedSet.Name +
                        " successfully"}
                </p>
            );
        }
        if (this.props.error) {
            importedMessage = (
                <p className="red-text">There was an error importing the set</p>
            );
        }

        return (
            <>
                <MDBBtn
                    color="green"
                    size="sm"
                    onClick={this.toggle(4)}
                    className="actionButton"
                >
                    <i className="fa fa-download" /> Import/Update a Set
                </MDBBtn>
                <MDBModal
                    isOpen={this.state.modal}
                    toggle={this.toggle(4)}
                    size="s"
                >
                    <MDBModalHeader toggle={this.toggle(4)}>
                        Import or Update a Set
                    </MDBModalHeader>
                    <MDBModalBody style={{ textAlign: "left" }}>
                        <MDBInput
                            id="SetCode"
                            label="Set Rebrickable Code"
                            group
                            type="text"
                            onChange={this.handleChange}
                        />
                        {this.props.loading ? (
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            importedMessage
                        )}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(4)}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="primary" onClick={this.createLocation}>
                            Import or Update
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        importedSet: state.importSet.set,
        loading: state.importSet.loading,
        error: state.importSet.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        importSet: setCode => dispatch(importSet(setCode))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetsImportModal);

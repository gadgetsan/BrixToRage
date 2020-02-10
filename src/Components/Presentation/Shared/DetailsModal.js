import React, { Component } from "react";
import { connect } from "react-redux";
import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter
} from "mdbreact";

import { fetchElement } from "/src/Actions/shared";
import {
    getElement,
    getElementError,
    getElementIsLoading
} from "/src/Selectors/shared";

export class DetailsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            size: props.size ? props.size : "sm"
        };
    }

    componentDidMount() {}

    toggle = () => {
        if (this.state.modal === false) {
            /*
            console.log(
                "FETCHING ITEM FOR MODAL type: " +
                    this.props.type +
                    ", id: " +
                    this.props.id
            );*/
            this.props.fetchElement(this.props.type, this.props.id);
        }
        this.setState({
            modal: !this.state.modal
        });
    };
    render() {
        //on affiche le children seulement si le loading est terminé
        var renderBody = <span>Loading...</span>;
        if (this.state.modal && this.props.isLoading !== undefined) {
            if (!this.props.isLoading) {
                renderBody = React.cloneElement(this.props.children[0], {
                    key: this.props.id,
                    id: this.props.id,
                    item: this.props.element
                });
            }
        }
        var button = (
            <MDBBtn color="primary" size="sm" className="actionButton">
                <i className="fa fa-ellipsis-h" />
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
                <MDBContainer>
                    <MDBModal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        size={this.state.size}
                    >
                        <MDBModalHeader toggle={this.toggle}>
                            {this.props.title}
                        </MDBModalHeader>
                        <MDBModalBody>{renderBody}</MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>
                                Close
                            </MDBBtn>
                            {false ? (
                                <MDBBtn color="primary">Save changes</MDBBtn>
                            ) : null}
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        element: getElement(state, ownProps.type, ownProps.id),
        error: getElementError(state, ownProps.type, ownProps.id),
        isLoading: getElementIsLoading(state, ownProps.type, ownProps.id)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchElement: (type, id) => dispatch(fetchElement(type, id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsModal);

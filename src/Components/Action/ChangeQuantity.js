import React, { Component } from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBInput
} from "mdbreact";
import { connect } from "react-redux";
import { changeQuantity } from "Actions/sets";

export class ChangeQuantity extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.render = this.render.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.state = {
            quantity: this.props.quantity,
            modal: false
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            ...prevState,
            modal: !this.state.modal
        }));
    };

    handleChange(event) {
        event.preventDefault();
        this.setState({
            quantity: event.target.value
        });
    }

    saveChanges(event) {
        event.preventDefault();
        console.log(
            "Assigning new Quantity: " +
                this.state.quantity +
                " to set with id " +
                this.props.set.id
        );
        this.props.changeQuantity(this.props.set.id, this.state.quantity);
        this.toggle();
    }
    render() {
        var button = (
            <MDBBtn color="primary" size="sm">
                Change Quantity
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
                        Chanque quantity owned for set #
                        {this.props.set.RebrickableId}
                    </MDBModalHeader>
                    <MDBModalBody style={{ textAlign: "left" }}>
                        <MDBInput
                            id="quantity"
                            label="quantity"
                            value={this.state.quantity}
                            type="number"
                            onChange={this.handleChange}
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>
                            Cancel
                        </MDBBtn>
                        <MDBBtn color="primary" onClick={this.saveChanges}>
                            Change Quantity
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.changeQuantity.error,
        isLoading: state.changeQuantity.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeQuantity: (setId, neqQuantity) =>
            dispatch(changeQuantity(setId, neqQuantity))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangeQuantity);

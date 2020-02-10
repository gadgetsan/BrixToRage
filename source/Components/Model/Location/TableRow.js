import React, { Component } from "react";

import DetailsModal from "/source/Components/Presentation/Shared/DetailsModal";
import LocationDetailsModal from "/source/Components/Model/Location/DetailsModal";

export default class LocationTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.item.LocationCode}</td>
                <td>{this.props.item.Name}</td>

                <td className="actionCell">
                    <DetailsModal
                        title={"location #" + this.props.item.LocationCode}
                        id={this.props.item.id}
                        type="location"
                        size="lg"
                    >
                        <LocationDetailsModal />{" "}
                    </DetailsModal>
                </td>
            </tr>
        );
    }
}

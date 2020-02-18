import React, { Component } from "react";

import DetailsModal from "Components/Presentation/Shared/DetailsModal";
import LocationDetailsModal from "Components/Model/Location/DetailsModal";

export default class LocationTableRow extends Component {
    render() {
        var parts = this.props.item.parts_locations.reduce(function(map, obj) {
            map[obj.PartId] = obj.PartId;
            return map;
        }, {});
        return (
            <tr>
                <td>{this.props.item.LocationCode}</td>
                <td>{this.props.item.Name}</td>
                <td>
                    {this.props.item.parts_locations.reduce(
                        (acc, value) => acc + value.Quantity,
                        0
                    )}
                </td>
                <td>{Object.keys(parts).length}</td>

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

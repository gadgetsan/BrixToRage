import React, { Component } from "react";

import DetailsModal from "/src/Components/Presentation/Shared/DetailsModal";
import PartDetailsModal from "/src/Components/Model/Part/DetailsModal";
import LocationInlineDisplay from "/src/Components/Model/Location/Inline";

export default class PartTableRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <img
                        src={this.props.item.RebrickableImageUrl}
                        height="25"
                        target="_blank"
                        alt="the brick"
                    />
                </td>
                <td>{this.props.item.Name}</td>
                <td>
                    <a>{this.props.item.RebrickableId}</a>
                </td>
                <td>
                    {this.props.item.locations.map(location => {
                        return (
                            <LocationInlineDisplay
                                key={location.id}
                                location={location}
                            />
                        );
                    })}
                </td>
                <td className="actionCell">
                    <DetailsModal
                        title={"part #" + this.props.item.RebrickableId}
                        id={this.props.item.id}
                        type="part"
                        size="lg"
                    >
                        <PartDetailsModal />{" "}
                    </DetailsModal>
                </td>
            </tr>
        );
    }
}

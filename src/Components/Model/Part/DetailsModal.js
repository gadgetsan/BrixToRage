import React, { Component } from "react";
import { mapIfLoaded } from "Shared/helpers";

import ColorInlineDisplay from "Components/Model/Color/Inline";
import SetInlineDisplay from "Components/Model/Set/Inline";
import LocationInlineDisplay from "Components/Model/Location/Inline";

import ChangeLocation from "Components/Action/ChangeLocation";

export default class PartDetailsModal extends Component {
    render() {
        return (
            <div style={{ textAlign: "left" }}>
                <img alt="the brick" src={this.props.item.RebrickableImageUr} />
                <br />
                <strong>Name: </strong>
                {this.props.item.Name}
                <br />
                <strong>Quantity: </strong>???
                <br />
                <strong>Years: </strong>???
                <br />
                <strong>Location(s): </strong>
                {mapIfLoaded(this.props.item.locations, location => {
                    return (
                        <LocationInlineDisplay
                            key={location.id}
                            location={location}
                        />
                    );
                })}
                <br />
                <ChangeLocation part={this.props.item} />
                <br />
                <strong>Colors: </strong>
                <table width="100%">
                    <tbody>
                        {mapIfLoaded(
                            this.props.item.parts_colors,
                            partsColor => {
                                return (
                                    <tr key={partsColor.id}>
                                        <td width="50px;">
                                            <img
                                                src={partsColor.ImageURL}
                                                width="100%"
                                                alt="the brick"
                                            />
                                            <br />
                                            {partsColor.Color ? (
                                                <ColorInlineDisplay
                                                    color={partsColor.Color}
                                                />
                                            ) : (
                                                ""
                                            )}
                                        </td>
                                        <td>
                                            {mapIfLoaded(
                                                partsColor.PartLocations,
                                                partLocation => {
                                                    return (
                                                        <span
                                                            key={
                                                                partLocation.id
                                                            }
                                                        >
                                                            <strong>
                                                                x
                                                                {
                                                                    partLocation.Quantity
                                                                }
                                                            </strong>{" "}
                                                            in{" "}
                                                            {partLocation.Location ? (
                                                                <LocationInlineDisplay
                                                                    location={
                                                                        partLocation.Location
                                                                    }
                                                                    hideName={
                                                                        true
                                                                    }
                                                                />
                                                            ) : (
                                                                "???"
                                                            )}
                                                        </span>
                                                    );
                                                },
                                                "None in inventory"
                                            )}
                                        </td>
                                        <td>
                                            {mapIfLoaded(
                                                partsColor.SetPart,
                                                setPart => {
                                                    return (
                                                        <span key={setPart.id}>
                                                            <strong>
                                                                x
                                                                {
                                                                    setPart.Quantity
                                                                }
                                                            </strong>{" "}
                                                            in{" "}
                                                            <SetInlineDisplay
                                                                set={
                                                                    setPart.Set
                                                                }
                                                            />
                                                            <br />
                                                        </span>
                                                    );
                                                },
                                                ""
                                            )}
                                        </td>
                                    </tr>
                                );
                            },
                            "This Brick doesn't have a location assigned to it"
                        )}
                    </tbody>
                </table>
                <br />
            </div>
        );
    }
}

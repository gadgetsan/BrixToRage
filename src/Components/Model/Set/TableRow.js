import React, { Component } from "react";

import DetailsModal from "Components/Presentation/Shared/DetailsModal";
import SetDetailsModal from "Components/Model/Set/DetailsModal";

export default class SetTableRow extends Component {
  render() {
    return (
      <tr>
        <td>
          <img
            src={this.props.item.ImageURL}
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
          <a>{this.props.item.PartCount}</a>
        </td>
        <td className="actionCell">
          <DetailsModal
            title={"part #" + this.props.item.RebrickableId}
            id={this.props.item.id}
            type="set"
            size="lg"
          >
            <SetDetailsModal id={this.props.item.id} />{" "}
          </DetailsModal>
        </td>
      </tr>
    );
  }
}

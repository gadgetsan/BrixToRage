import React, { Component } from "react";

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.pagePlus = this.pagePlus.bind(this);
        this.pageMinus = this.pageMinus.bind(this);
    }
    pagePlus() {
        this.props.pageChange(this.props.currentPage + 1);
    }
    pageMinus() {
        if (this.props.currentPage > 1) {
            this.props.pageChange(this.props.currentPage - 1);
        }
    }

    render() {
        return (
            <ul className="pagination">
                <li
                    className={"paginate_button page-item previous"}
                    id="dtBasicExample_previous"
                >
                    <a
                        aria-controls="dtBasicExample"
                        data-dt-idx="0"
                        tabIndex="0"
                        className="page-link"
                        onClick={this.pageMinus}
                    >
                        Previous
                    </a>
                </li>
                <li className="paginate_button page-item active">
                    <a
                        aria-controls="dtBasicExample"
                        data-dt-idx="1"
                        tabIndex="0"
                        className="page-link"
                    >
                        {this.props.currentPage}
                    </a>
                </li>
                <li
                    className="paginate_button page-item next"
                    id="dtBasicExample_next"
                >
                    <a
                        aria-controls="dtBasicExample"
                        data-dt-idx="7"
                        tabIndex="0"
                        className="page-link"
                        onClick={this.pagePlus}
                    >
                        Next
                    </a>
                </li>
            </ul>
        );
    }
}

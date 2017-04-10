import React, { Component, PropTypes } from 'react';
import paginationStyles from './styles/Pagination.css';

export default class Page extends Component {
    static propTypes = {
        pageText: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        pageNumber: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired
    }

    render() {
        const text = this.props.pageText || this.props.pageNumber;

        if (React.isValidElement(text)) {
            return text;
        }

        return (
            <li className={this.props.isActive ? paginationStyles.active: ''}>
                <a onClick={ (e) => {
                    e.preventDefault();
                    this.props.onClick(this.props.pageNumber);
                }} href='#'>
                    { text }
                </a>
            </li>
        );
    }
}

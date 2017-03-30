import React, { Component, PropTypes } from 'react';

import Styles from '../../PatternAddAnAsset/js/components/singlefileupload.css';
class AccordionSection extends Component{

    constructor(props) {
    super(props);
    this.displayName = 'AccordionSection';
    this.onSelect = this.onSelect.bind(this);

 }
 onSelect(event) {
    event.preventDefault();
        // tell the parent Accordion component that this section was selected
        this.props._onSelect(this.props.id);
    }


    render() {
        let className = Styles.accordionSection + (this.props._selected ? ' ' + Styles.selected : '');

        return (
            <div className={className}>
            <div className={Styles.sec}>
                <a href="#" className="fa fa-angle-down" onClick={this.onSelect}>
                <span>{this.props.title}</span>
                </a>
            </div>
                <div className={Styles.body}>
                    {this.props.children}
                </div>
            </div>
        );
    }

};

AccordionSection.propTypes = {
    _onSelect: PropTypes.func,
    _selected: PropTypes.bool,
    id: PropTypes.string,
    title:  PropTypes.string,
    children: PropTypes.object
}

module.exports = AccordionSection;

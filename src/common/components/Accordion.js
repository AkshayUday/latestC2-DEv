import React, { Component, PropTypes } from 'react';
import Styles from '../../PatternAddAnAsset/js/components/singlefileupload.css';

class Accordion extends Component{

constructor(props) {
    super(props);
    this.displayName = 'Accordion';
    this.enhanceSection = this.enhanceSection.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
            selected: this.props.selected,
    };
 }


 enhanceSection(child) {
        const selectedId = this.state.selected;
        const id = child.props.id;

        return React.cloneElement(child, {
            key: id,
            // private attributes/methods that the Section component works with
            _selected: id === selectedId,
            _onSelect: this.onSelect
        });
    }

  onSelect(id) {
        this.setState({selected: id});
    }

render() {
    	let children = React.Children.map(
            this.props.children, this.enhanceSection);

        return (
            <div className={Styles.accordion}>
                {children}
            </div>
        );
    }

};

Accordion.propTypes = {
    _onSelect: PropTypes.func,
    selected: PropTypes.string,
    children: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ])

}

module.exports = Accordion;


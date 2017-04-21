/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class DropDown used to create Dropdown component which will display
 * grid and list view component 
 * @author TDC
 **/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DropdownStyles from './styles/DropDownStyles.css'
class DropDown extends Component{

    /**
    * @contructor will be used to initialize Dropdown 
    * objects and it will bind few method in it
    * @param {function} show
    * @param {function} hide
    * @param {function} select
    */
    constructor(props){
        super(props);
         this.state={
            listVisible: false,
            lists : this.props.selected
        };
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.select = this.select.bind(this);
    }
    /**
    * @function select is used for change the state of the Dropdown component
    * and calls the parent class
    * @param {object} item
    */
    select(item) {
        //console.log(item.value);
        this.setState({lists:item});
        this.props.onChange(item.value);
    }

    /**
    * @function show method is used for show the dropdown list
    */
    show() {
        this.setState({ listVisible: true });
        document.addEventListener('click', this.hide);
    }
    /**
    * @function hide method is used for hide the dropdown list
    */
    hide() {
        this.setState({ listVisible: false });
        document.removeEventListener('click', this.hide);
    }

    /**
    * @function renderListItems method is used for render the drop down list
    * @param {string} selectedName - used to find the selected name
    */
    renderListItems(selectedName) {
        let items = [];
        let item;
        for (let i = 0; i < this.props.list.length; i++) {
            item = this.props.list[i];
            if(selectedName !== item.name){
                items.push(<div className={item.value} key={item.name} onClick={this.select.bind(null, item)}>
                    <span><i className={item.name}></i></span>
                </div>);
            }
        }
        return items;
    }
    
    /**
    * @default render method is used for returning the DOM
    */
    render() {
        return (<div id='viewDropDownContainer' className={DropdownStyles.dropdownContainer}>
            <div className={DropdownStyles.dropdownDisplay}
            onClick={this.show.bind(this)}>
                <span><i className={this.state.lists.name}></i></span>
                <span className={DropdownStyles.viewIconStyle}><i className="fa fa-chevron-down"></i></span>
            </div>
            <div className={(this.state.listVisible ? DropdownStyles.show: DropdownStyles.hide)}>
                    {this.renderListItems(this.state.lists.name)}
            </div>
        </div>)
    }


}

DropDown.propTypes = {
    selected : PropTypes.object,
    list : PropTypes.array,
    onChange : PropTypes.func,
}
module.exports= DropDown;

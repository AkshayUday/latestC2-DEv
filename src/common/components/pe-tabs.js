import PE_Tab from "./pe-tab.js"
import React, { Component, PropTypes } from 'react';

class PE_Tabs extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            selected : this.props.selected ? this.props.selected : 0
        };
    };

    componentDidMount(){
        this.setState({
            selected: this.state.selected
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            selected : nextProps.selected ? nextProps.selected : 0
        })
    }

    _renderTabContent(selectedIndex) {
        var self = this
        return (
            <div className="tt">
                {
                    this.props.children.map(function (e, i) {
                        var classNames = selectedIndex === i ? "pe-tabpanel pe-tabpanel--active" : "pe-tabpanel";
                        return (
                            <div key={i} className={classNames}>
                                {e}
                            </div>
                        )
                    })
                }
         </div>
        );
    }

    _renderTitles(selectedIndex) {
        function labels(child, index) {
            let activeClass = (selectedIndex === index ? 'pe-tab pe-tab--active' : 'pe-tab');
            return (
                <li key={index}
                    className = {activeClass}
                    >
                    <a href="#"
                       onClick={this._handleClick.bind(this, index)}
                       onFocus={this._selectTab.bind(this, index)}
                       onKeyDown={this._handleKey.bind(this, index)}
                        >
                        {child.props.title}
                    </a>
                </li>
            );
        }

        return (
            <ul className="pe-tablist">
                {this.props.children.map(labels.bind(this))}
            </ul>
        );
    }

    _renderAccordion(){
        var tabs = [],
            activeSet = false,
            self = this

        React.Children.forEach(this.props.children, function(child, key){
            var id = self.genUuid(),
                tab = {
                    title : child.props.title,
                    content : child.props.children,
                    id : id,
                    href : "#"+id,
                    active : self.state.selected == key ? true : false
                }
            tabs.push(tab)
        })

        return (
            <div>
                {
                    tabs.map(function(item, key){
                        var tabid = "tab-"+key,
                            id = "tab-"+key

                        return (
                            <div className="pe-accordionitem" key={"accordionKey"+key}>
                                <div className={
                                    item.active ? "pe-accordion pe-accordion--active" : "pe-accordion"
                                }   role="presentation"
                                    >
                                    <a href={item.href} role="tab" id={id}
                                        tabIndex="0"
                                        aria-controls={item.id}
                                        aria-selected={item.active ? "true" : "false"}
                                        onClick={this._selectTab.bind(this, key)}
                                        onFocus={this._selectTab.bind(this, key)}
                                        onKeyDown={this._handleKey.bind(this, key)}
                                    >{item.title}</a>
                                </div>

                                <div className={
                                        item.active ? "pe-tabpanel pe-tabpanel--active" : "pe-tabpanel"
                                    } id={item.id}
                                    aria-describedby={tabid}
                                    tabIndex="0"
                                    role="tabpanel"
                                    aria-hidden={item.active ? "false" : "true"}>
                                    {item.content}
                                </div>
                            </div>
                        )
                    }.bind(this))
                }
            </div>
        )
    }

    genUuid(){
        var d = new Date().getTime()
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0
            d = Math.floor(d/16)
            return (c=='x' ? r : (r&0x3|0x8)).toString(16)
        })
        return uuid
    }

    _selectTab(index, e){
        this.setState({
            selected : index
        })
        // fire off the change
        // send back the key for the active tab
        if(this.props.onTabNav) this.props.onTabNav(index)
    }

    _handleKey(index, e){
        // left == 37 and right == 39
        var keyCode = e.keyCode,
            list = this.props.type == "accordion" ? document.getElementById(this.id).querySelectorAll(".pe-accordion") : document.getElementById(this.id).querySelectorAll("ul.pe-tablist li"),
            id = e.target.href,
            selected = 0
        if(keyCode == 37 || keyCode == 39){
            // move the focus left or right now
            // falling back to basic DOM manipulation here,
            // not sure if there's a better way to do it...
            for(var i=0;i<list.length;i++){
                var item = list[i].querySelector("a")
                if(id == item.href) selected = i
            }
            if(keyCode == 37 && selected != 0){
                list[selected - 1].querySelector("a").focus()
            }
            if(keyCode == 39 && selected != list.length - 1){
                list[selected + 1].querySelector("a").focus()
            }
        }
        if(keyCode == 9){
            e.preventDefault()
            // guide the focus here
            var newId = id.split("#")[1]
            document.getElementById(newId).focus()
        }
    }

    _handleClick(index, e){
        e.preventDefault()
    }

    render(){
        var self = this

        return (
            <div className="pe-tabs--wrapper" id={this.id}>
                {
                    this.props.type == "accordion" ?
                    <div className="pe-accordiongroup">
                        {this._renderAccordion()}
                    </div>
                    :
                    <div className="pe-tabs pe-tabs--stroke">
                        {this._renderTitles(this.state.selected)}
                        {this._renderTabContent(this.state.selected)}
                    </div>

                }
            </div>
        )
    }
}

module.exports= PE_Tabs;
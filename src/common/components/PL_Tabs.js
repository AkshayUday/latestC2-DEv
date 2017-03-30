import React, { Component, PropTypes } from 'react';
import R_Tab from 'react-responsive-tabs';
import PLTabStyles from './styles/PL_TabsStyles.css'

class PL_Tabs extends React.Component{

    constructor(props) {
        super(props);
        
    }

    render() {

      let wrapper = this.props.wrapperClass ? this.props.wrapperClass : PLTabStyles.parentTabWrapper;
      let tabs = this.props.tabClass ? this.props.tabClass : PLTabStyles.parentTabs;
      let panel = this.props.panelClass ? this.props.panelClass : PLTabStyles.parentTabPanel;
        return (
                   <R_Tab items={this.props.items} 
                   showMore={false} 
                   transformWidth={this.props.transformWidth } 
                   wrapperClass={wrapper} 
                   tabClass={tabs} 
                   panelClass={panel}
                   onChange={this.props.onChange}
                   selectedTabKey={this.props.selectedTabKey}
                   />
        )
    }

}

PL_Tabs.propTypes= {
        items:React.PropTypes.array,
        transformWidth:React.PropTypes.number,
        wrapperClass:React.PropTypes.string,
        tabClass:React.PropTypes.string,
        panelClass: React.PropTypes.string,
        onChange: React.PropTypes.func,
        selectedTabKey:React.PropTypes.number
}


PL_Tabs.defaultProps ={
        TabData:[],
        transformWidth:600
    }

module.exports = PL_Tabs;

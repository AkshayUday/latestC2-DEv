import React, { Component, PropTypes } from 'react';

import styles from './styles/PL_SiteDetailStyles.css';

class PL_SiteDetails extends React.Component{

    constructor(props) {
        super(props);
        
    }

    render() {
       let siteLabelCls = this.props.siteLabelCls ? this.props.siteLabelCls : styles.siteLabel;
       let siteTitleCls = this.props.siteLabelCls ? this.props.siteTitleCls : styles.siteTitle;
  
        return (
            <div className={styles.container}>
              <span className={siteLabelCls}>{this.props.siteLabel}</span> 
              <span className={siteTitleCls}>{this.props.siteTitle}</span>
           </div>
        )
    }
}

PL_SiteDetails.propTypes= {
      siteLabel:React.PropTypes.string,
      siteTitle:React.PropTypes.string,
      siteLabelCls: React.PropTypes.string,
      siteTitleCls: React.PropTypes.string,
}


PL_SiteDetails.defaultProps ={
      
    }

module.exports = PL_SiteDetails;

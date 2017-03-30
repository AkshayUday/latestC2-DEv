//"use strict";
import React from 'react';


class Heading extends React.Component{
  constructor(props) {
    super(props);
    this.displayName = 'Heading';
  }
    static propTypes = {
        value: React.PropTypes.string.isRequired,
        headingType : React.PropTypes.string.isRequired,
    }
    static defaultProps = {
          value: 'Default Heading',
          headingType:'h3',

  }
    state= {
            value: this.props.value,
            headingType: this.props.headingType,
  }
  render() {
        let style = {
          heading:{
           backgroundColor: '#ECEAEA'
          }
        };

        //need to handle heading type also
        return (

            <h3 style={style.heading}>{this.props.value}</h3>
        )
  }

};

module.exports = Heading;

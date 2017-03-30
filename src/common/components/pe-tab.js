import React, { Component, PropTypes } from 'react';

class PE_Tab extends Component {
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default PE_Tab
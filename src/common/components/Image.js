import React, { Component, PropTypes } from 'react';

const IconComponent = ({src}) => { return <img className="img" src={src}/> };

IconComponent.propTypes = {
    src : PropTypes.string
}
export default IconComponent;

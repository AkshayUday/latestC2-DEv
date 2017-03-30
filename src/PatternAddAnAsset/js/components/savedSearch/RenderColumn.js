import React, { Component, PropTypes } from 'react';
import savedsearchStyles from './styles/savedSearchStyles.css';

class RenderColumn extends Component{

render() {
    let column = this.props.cols.map(function (column,index)
    {
        return <div className={savedsearchStyles.column} key={index}><b><u>{column}</u></b></div>;
    });

    return(
        <div className="row">
            {column}
        </div>
        )
}
}

RenderColumn.propTypes = {
    cols: PropTypes.any
}

export default RenderColumn;

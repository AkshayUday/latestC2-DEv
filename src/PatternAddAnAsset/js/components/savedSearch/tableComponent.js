import React, { Component, PropTypes } from 'react';
import Row from './RenderRow.js';
import Column from './RenderColumn.js';

class tableComponent extends Component {

  constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

  handleChange(obj){
    if(this.props.checkboxOnchange){
            this.props.checkboxOnchange(obj);
    }
  }
  render(){
    return(
      <div>
        <Column cols={this.props.columns}/>
        <Row rows={this.props.rows} CheckboxHandler={this.handleChange}/>
        </div>

      );
  }
}

tableComponent.propTypes = {
  checkboxOnchange: PropTypes.func,
  rows: PropTypes.any,
  columns: PropTypes.any
}

module.exports= tableComponent;

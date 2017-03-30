import React, { Component, PropTypes } from 'react';

class Checkbox extends Component{

constructor(props) {
    super(props);
    this.state = {
      id:'',
      value: true,
      name: '',
      disabled:false,
      required:false,
      maxLength:'30',
      autofocus: false,
      record: {}
    }
    this.assetSelectedEvent = props.parent.bind(this);
    this.customFn = props.customFn.bind(this);
 }

render() {

    const inputState = (value) => {
      if (this.props.value.touched && this.props.value.error) {
        return 'pe-input--error'
      } else if (this.props.value.touched && this.props.value.value) {
        return ''
      } else {
        return ''
      }
    }

        return (
            <input
            id={this.props.id}
            className= {this.props.className +' '+ inputState(this.props.value)}
              ref="input" type="checkbox"
              name={this.props.name}
              record = {this.props.record}
               required={this.props.required}
               onClick={this.assetSelectedEvent}
               maxLength={this.props.maxLength}
                value ={this.props.value} {...this.props.value}
                placeholder={this.props.placeholder}
                readOnly={this.props.readOnly}
                 disabled={this.props.disabled}
            />
        )
    }

};

Checkbox.propTypes= {
    id:PropTypes.string,
    value: PropTypes.bool,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    maxLength:PropTypes.string,
    autofocus: PropTypes.bool,
    parent : PropTypes.func,

}
module.exports = Checkbox;

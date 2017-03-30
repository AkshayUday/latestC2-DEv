import React, { Component, PropTypes } from 'react';

class Radio extends Component{

constructor(props) {
    super(props);
    this.state = {
      value : ''
    }
    this.assetSelectedEvent = props.parent.bind(this);
    this.customFn = props.customFn.bind(this);
 }
 static propTypes= {
    id:PropTypes.string,
    value: PropTypes.bool,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    maxLength:PropTypes.string,
    autofocus: PropTypes.bool,
    parent : PropTypes.func,
    customFn: PropTypes.func,
    className: PropTypes.string,
    record: PropTypes.object,
    placeholder: PropTypes.string,
    readOnly: PropTypes.string,
    checked: PropTypes.bool

}
static defaultProps ={
      id:'',
      value: true,
      name: '',
      disabled:false,
      required:false,
      maxLength:'30',
      autofocus:false,
      record: {}
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
              ref="input" type="radio"
              name={this.props.name}
               required={this.props.required}
               onChange={this.assetSelectedEvent}
               maxLength={this.props.maxLength}
                value ={this.props.value} {...this.props.value}
                placeholder={this.props.placeholder}
                readOnly={this.props.readOnly}
                disabled={this.props.disabled}
                checked={this.props.checked}
            />
        )
    }

};

module.exports = Radio;

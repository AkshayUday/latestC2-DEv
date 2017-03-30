import React from 'react';

class TextBox extends React.Component{

constructor(props) {
    super(props);
    this.displayName = 'TextBox';
 }

static propTypes= {
        id:React.PropTypes.string,
        value: React.PropTypes.object,
        placeholder: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        required: React.PropTypes.bool,
        maxLength:React.PropTypes.string,
        autofocus: React.PropTypes.bool,
        readOnly: React.PropTypes.bool,

}
static defaultProps ={
          id:'',
          value: '',
          placeholder:'',
          disabled:false,
          required:false,
          maxLength:'30',
          autofocus: false,
}

render() {

        return (
            <input className="pe-input"
            id={this.props.id}
              ref="input" type="text"
               required={this.props.required}
               maxLength={this.props.maxLength}
                value ={this.props.value} {...this.props.value} 
                placeholder={this.props.placeholder}
                readOnly={this.props.readOnly}
                 disabled={this.props.disabled}
                 onFocus={() => { console.log(this)} }	 />
        )
    }

};

module.exports = TextBox;

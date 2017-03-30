//"use strict";
import React from 'react';


class TextArea extends React.Component{

constructor(props) {
    super(props);
    this.displayName = 'TextArea';

     this.state = {
         data: '300 characters remaining',
         value: 'test'
     }

    this.handleKeyUp = this.handleKeyUp.bind(this);

}
static propTypes = {
        id:React.PropTypes.string,
        value: React.PropTypes.any,
        placeholder: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        readOnly: React.PropTypes.bool,
        required: React.PropTypes.bool,
        maxLength:React.PropTypes.string,
        autofocus: React.PropTypes.bool,
        rows: React.PropTypes.number,
        cols: React.PropTypes.number

}
static defaultProps= {
          id: '',
          value: '',
          placeholder:'',
          disabled:false,
          readOnly:false,
          required:false,
          maxLength:'300',
          autofocus: false,
          rows:4,
          cols:50
}

 updateState(msg) {
      this.setState({data: msg});
 }

 handleKeyUp(e, noOfChar) {
 	//console.log('handleKeyUp');
      //console.log(noOfChar);
      //console.log(e);

      let text_max = 300 , textLength;
      if (e === 'loadEvent') {
        textLength = noOfChar.value.length;
      }
      else {
        textLength = e.target.value.length;
      }
      if (textLength > 300) {
        e.target.value.substring(0, 300);
      } 
      let remainLength = text_max - textLength;
      this.setState({data: remainLength + 'characters remaining'});
 }

 componentWillReceiveProps(nextProps) { 	
    this.handleKeyUp('loadEvent', nextProps.value);
 }

render() {
  let style ={
          spacing :{
          /*'marginLeft': '770px',*/
          textAlign :'right'
        }
    };
     //console.log('TExt');
     //console.log(this.props.value.value);

        return (      
         	
        <div>
            <div>
                <textarea  {...this.props.value} value={this.props.value.value || ''}  className="pe-textarea" maxLength={this.props.maxLength}></textarea>
            </div>
            <div id="textFeedBack" style={style.spacing}> {this.state.data} </div>
        </div>
        )
    }

};

module.exports = TextArea;

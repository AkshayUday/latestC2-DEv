import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class CheckboxComponent extends Component {

	constructor(props){
    		super(props);
    		this.state={
      			id: this.props.id,
      			name : this.props.name,
            checked:this.props.checked
  			};
        this.changedBox = this.changedBox.bind(this);
	}

  changedBox(e){
    console.log(this.state);
      if(this.state.checked===true){
        this.state.checked = false;
      }else{
        this.state.checked = true;
      }


    if (this.props.onChangeHandler) {
          console.log('this.state.checked:-------------------> '+this.state.checked);
          this.state={
            id: this.props.id,
            name : this.props.name,
            checked:this.state.checked,
        };
          this.props.onChangeHandler(this.state);
    }
  }

  componentWillReceiveProps(nextprops){
      this.setState({
        checked: nextprops.checked,
     });
  }


   render() {
    console.log('inside render of CheckBocConponent');
   	 let name = this.props.name;
   	 let id = this.props.id;
     let checked = this.props.checked;
   	  let self = this;
      return (
         <input type="checkbox" name={name} id={id} checked={checked} onChange={this.changedBox}/>

      );
   }
}

CheckboxComponent.propTypes = {
        id: PropTypes.any,
        name: PropTypes.string,
        checked: PropTypes.any,
        onChangeHandler: PropTypes.func
    }

module.exports= CheckboxComponent;

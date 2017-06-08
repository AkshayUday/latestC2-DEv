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
     let value = this.props.val;
     let className = this.props.className;
      let self = this;
      return (
        <label>
         <input type="checkbox" value={value} className={className} name={name} id={id} checked={this.state.checked} onChange={this.changedBox}/>&nbsp;&nbsp;{value}
        </label>
      );
   }
}

CheckboxComponent.propTypes = {
        id: PropTypes.any,
        name: PropTypes.string,
        checked: PropTypes.any,
        className: PropTypes.string,
        val: PropTypes.string,
        onChangeHandler: PropTypes.func
    }

module.exports= CheckboxComponent;

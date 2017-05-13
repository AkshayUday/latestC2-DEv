import React, { Component, PropTypes } from 'react';

class ChooseFile extends Component{

constructor(props) {
    super(props);
    this.displayName = 'Choose File';
 }

render() {

        return (
            <input 
                id={this.props.id} 
                type="file"
                required={this.props.required}
                disabled={this.props.disabled}
                name={this.props.name}
                className={this.props.choosefileclass}
                onChange={this.props.value.onBlur}
                state={this.state.file}
            />
        )
    }

};

ChooseFile.propTypes = {
    value:PropTypes.object,
    name: PropTypes.string,
    choosefileclass: PropTypes.string,
    id:PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool
}

module.exports = ChooseFile;


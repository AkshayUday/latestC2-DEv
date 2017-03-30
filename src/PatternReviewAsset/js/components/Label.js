//'use strict';
import React from 'react';


class Label extends React.Component{
    constructor(props) {
        super(props);
        this.displayName = 'Label';
    }
    static propTypes = {
        for: React.PropTypes.string,
        text : React.PropTypes.string.isRequired,
    }
    static defaultProps ={
          for:'',
          text: ''
    }
    render() {
        let forTxt = this.props.for;
        let text = this.props.text;

        //below is the pearson label
       // var divAsLabel = "<div class='pe-label pe-label--bold' >{text}</div>";
        return (
            <label className="pe-label pe-label--bold" htmlFor={forTxt}> {text} </label>
        );
    }

};

module.exports = Label;

import React, { Component, PropTypes } from 'react';


class PE_tooltip extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            content : this.props.content,
            shown : false,
            position : this.props.position
        }
    }

    _toggleTip(e){
        // show tooltip
        let shown = false
        if(this.state.shown) shown = false
        else shown = true

        this.setState({
            shown : shown
        })
    }

    _tooltipClass(){
        let newClasses = this.state.shown ? 'pe-tooltip pe-tooltip--show' : 'pe-tooltip'
        switch(this.state.position){
            case 'right' :
                newClasses += ' pe-tooltip--right'
                break
            case 'left' :
                newClasses += ' pe-tooltip--left'
                break
            case 'top' :
                newClasses += ' pe-tooltip--top'
                break
            case 'bottom' :
                newClasses += ' pe-tooltip--bottom'
                break
            default :
                newClasses += ' pe-tooltip--top'
                break
        }
        return newClasses
    }

    _positionTip(){
        let styles = {
            top : '0',
            left : '0'
        }
        if(this._tooltip){
            // position it based on this._container
            let width = this._tooltip.offsetWidth,
                height = this._tooltip.offsetHeight
            if(this.state.position == 'right'){
                // set this._tooltip to the right of this._container
                styles = {
                    top : '-'+(height/2 - 10)+'px',
                    right : '-'+(width+15)+'px'
                }
            } else if(this.state.position == 'left'){
                // TODO: test all the below and refine positioning
                styles = {
                    top : '-'+(height/2 - 10)+'px',
                    left : '-'+(width+15)+'px'
                }
            } else if(this.state.position == 'top'){
                styles = {
                    top : '-'+(height+15)+'px'
                }
            } else if(this.state.position == 'bottom'){
                styles = {
                    bottom : '-'+(height+15)+'px'
                }
            }
        }

        return styles
    }

    render(){
        let self = this;
        let content = [];
        let contentStr = this.state.content;
        if(contentStr !== undefined){
            if(contentStr.indexOf('@') !== -1){
                let cStr = contentStr.split('@');
                for(let c=0; c<cStr.length; c++){
                    if(cStr[c] !== ''){
                        content.push(cStr[c]);
                        content.push(<br/>);
                    }
                }
            }else{
                content = contentStr;
            }
        }
        return (
            <span ref={function (cont){self._container = cont}}
            className={this.props.className +' pe-tooltip--wrapper'}
            onMouseOver={this._toggleTip.bind(this)}
            onMouseOut={this._toggleTip.bind(this)}>
                {this.props.children}
                <div ref={function (tip){self._tooltip = tip}}
                className={this._tooltipClass.bind(this)()}
                style={this._positionTip.bind(this)()}>
                    <span className='pe-tooltip--arrow'></span>
                    <p className="pe-tooltip--pTag">{content}</p>
                </div>
            </span>
        )
    }
}

PE_tooltip.propTypes = {
  content: PropTypes.string,
  position: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.object
}


export default PE_tooltip;

import React, { Component, PropTypes } from 'react';
import Styles from '../../PatternAddAnAsset/js/components/checkJobStatus/table.css';

//import Label from '../../../../common/components/Labels.js';
let interval = {};

class ProgressBarComp extends Component{

        constructor() {
            super();
            this.state = {
                start: true,
                stop: false
            };
        }
        componentWillReceiveProps(nextProps) {
            this.setState({percentage: nextProps.percentage + '%'});
        }
        shouldComponentUpdate(nextProps, nextState) {
            if (nextState.stop === true) {
                clearInterval(interval);
            }
            return (nextState.stop !== true);
        }

        stopProgress() {
            this.setState({stop: true});
        }
        render() {
            return (
                    < div id = 'show-progress-with-jsx' ref = 'foo' >
                    < div className = {Styles.progress} >
                    < div className = {Styles.progressBar}
                    style = {{width:this.props.percentage+'%'}} > < /div>
                < /div>
                < /div>
                );
        }
}

ProgressBarComp.propTypes = {
    percentage: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      
    ])
}

module.exports = ProgressBarComp;

import React, {Component} from 'react';
import './ButtonLong.scss';
import bean from 'bean';

export default class ButtonLong extends Component {
    constructor(props) {
        super(props);
        this.link = this.props.patConfig.patSetup.link;
        console.log('link is ' + this.link);
        this.onClick = this.onClick.bind(this);  // this stmt make 'this' avail within the onClick() callback.
    }

    onClick(event) {
        event.preventDefault();
	      // The response back to host must occur from action processing
        bean.fire(this.props.patConfig, this.props.patConfig.resultsEventId,
		              { key:'some key', value:'some value from PaternBeta widget '  +
                    this.props.patConfig.patSetup.link });
    }
    render() {
	      return (<button className={'buttonLong'} onClick={this.onClick} type='button'>
                {this.props.patConfig.patSetup.link}
                </button>
		    );
    }
}
ButtonLong.propTypes = {
	  patConfig: React.PropTypes.object
};

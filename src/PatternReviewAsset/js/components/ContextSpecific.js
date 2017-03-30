 "use strict";
import React from 'react';
import Label from'./../components/Label';
import TextBox from './../components/TextBox';
import {messages} from './../components/ReviewAssetMetadataDefaultMessages';
import {injectIntl, intlShape} from 'react-intl';

class ContextSpecific extends React.Component{
	    static PropTypes = {
        intl: intlShape.isRequired
    }

	render() {		
		console.log(this.props);
		const ShowContextSpecific = this.props.ShowContextSpecific;
		return ();
	}
 }

export default ContextSpecific;

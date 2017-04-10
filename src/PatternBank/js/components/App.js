import React from 'react'
import MVMContainer from '../container/MetadataContainer';
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import store from '../store/index'
import {addLocaleData, IntlProvider} from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
addLocaleData(frLocaleData);
const translations = {
	'fr' : {
			 'Review_Asset_MetaData': 'Métadonnées du produit',			 		 
		  }
};
const locale = 'en';

/*if (!global.Intl) {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}
*/

class App extends React.Component{
constructor(props) {
    super(props);
    this.displayName = 'App';
}

static propTypes= {
    patConfig:React.PropTypes.object,
    libConfig:React.PropTypes.object
}


render() {
        return (
			  <IntlProvider locale={locale} messages={translations[locale]}>
				  <Provider store={store}>
				    <div>
				    	<MVMContainer ref="mvmContainer" patConfig={this.props.patConfig} 
				    	libConfig={this.props.libConfig} />	  
				  	</div>
				  </Provider>
			  </IntlProvider>
			 )
		}
}

export default App

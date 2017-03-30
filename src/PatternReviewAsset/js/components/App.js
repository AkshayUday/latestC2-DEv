//YS import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from '../store';
import { addLocaleData, IntlProvider } from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
//import ReviewAssetMetaContainer from '../containers/ReviewAssetMetaContainer';
import ReviewAssetMetadataContainer from '../containers/ReviewAssetMetadataContainer';

addLocaleData(frLocaleData);

const translations = {
	'fr': {
			 'Review_Asset_MetaData': 'Métadonnées du produit',			 		 
		  }
};


const locale = 'en';
//const filename = window.location.pathname.split('.')[0];


class App extends React.Component{
	constructor(props){
     super(props)
	}

	static propTypes= {
    patConfig:React.PropTypes.object,
    libConfig:React.PropTypes.object
}


render(){
 return(
		<IntlProvider locale={locale} messages={translations[locale]}>
		  <Provider store={store}>
		   <div>
		    	<ReviewAssetMetadataContainer  ref="ReviewAssetsContainer" 
		    		patConfig={this.props.patConfig} libConfig={this.props.libConfig}/>
		   </div>
		  </Provider>
  		</IntlProvider>
  )
}
}

export default App;






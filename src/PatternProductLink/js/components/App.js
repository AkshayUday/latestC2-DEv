//YS import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from '../store';
import { addLocaleData, IntlProvider } from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';

import ProductLink from '../components/ProductLink';

// import Modal from 'react-modal';

import Modal from 'react-responsive-modal';

// Import Component Style
import styles from './app.css';

addLocaleData(frLocaleData);

const translations = {
	'fr': {
			 'Link_to_a_Product': 'Lien vers un produit',			 		 
		  }
};


const locale = 'en';

class App extends React.Component{
	constructor(props){
     super(props);
     this.openModal = this.openModal.bind(this);
     this.closeModal = this.closeModal.bind(this);
     this.state = {
     	open:true
     }    
     document.querySelector('body').style.overflow='hidden';// Prevent background 
	}

	static propTypes= {
    patConfig:React.PropTypes.object,
    libConfig:React.PropTypes.object
}


  openModal() { 
 	this.setState({open: true}); 
 }

 closeModal() { 
 	this.setState({open: false}); 
 	document.querySelector('body').style.overflow='auto';
 }
render(){
// 	const customStyles = {

//   content : {
//     // top                   : '25%',
//     // left                  : '30%',
//     // /*right                 : '50%',*/
//     // bottom                : 'auto',
//     // /*marginRight           : '-50%',
//     // transform             : 'translate(-50%, -50%)'*/
//     // width : '38%'
//     top: '180px',
//     bottom: '180px'
//   }
// };


/* ORIGINAL CODE
return(  
	<IntlProvider locale={locale} messages={translations[locale]}>
		<Provider store={store}>
		
		
    <Modal ref="ProductLinkModal" isOpen={this.state.open}  portalClassName='ProductLinkModal' role="ProductLinkModal"  style={customStyles} contentLabel="linkModal">
		<div className='row modalHeadDiv'>
		<div className='pageTitle'>Link to a Product</div>
		<div className='closeButtonDiv'>
		<i className='fa fa-times' aria-hidden='true' onClick={this.closeModal} ></i></div>
		</div>
		<div className='modalBodyDiv'>
		
				
				<div>
				<ProductLink  ref="ProductLink" patConfig={this.props.patConfig} libConfig={this.props.libConfig} closeModal={this.closeModal}/>
				<div className="pe-btn-bar">
				<button className="pe-btn pe-cancel-btn" type="button" onClick={() => { this.closeModal()}}>Cancel</button>		
				</div>
				</div>
				
		
		</div>        
  	</Modal>
	
	</Provider>
	</IntlProvider>

  )
*/ 

// return(  
// 	<IntlProvider locale={locale} messages={translations[locale]}>
// 		<Provider store={store}>
		
		
//     <Modal ref="ProductLinkModal" isOpen={this.state.open}  portalClassName='ProductLinkModal' role="ProductLinkModal"  style={customStyles} contentLabel="linkModal">
// 		<div className='row modalHeadDiv'>
// 		<div className={styles.pageTitle}>Link to a Product aaa</div>
// 		<div className={styles.closeButtonDiv}>
// 		<i className='fa fa-times' aria-hidden='true' onClick={this.closeModal} ></i></div>
// 		</div>
// 		<div className='modalBodyDiv'>
		
				
// 				<div>
// 				<ProductLink  ref="ProductLink" patConfig={this.props.patConfig} libConfig={this.props.libConfig} closeModal={this.closeModal}/>
// 				<div className="pe-btn-bar">
// 				<button className="pe-btn pe-cancel-btn" type="button" onClick={() => { this.closeModal()}}>Cancel</button>		
// 				</div>
// 				</div>
				
		
// 		</div>        
//   	</Modal>
	
// 	</Provider>
// 	</IntlProvider>

//   )


 return(  
	<IntlProvider locale={locale} messages={translations[locale]}>
		<Provider store={store}>
		 <Modal open={this.state.open} overlayClassName={styles.plContainer} closeOnOverlayClick={false} modalClassName={styles.plProductLinkModal} onClose={this.closeModal} little>
        <div className={styles.plModalHeadDiv}>
			<div className={styles.plModalTitle}>Link to a Product</div>
			
		</div>
		<div className={styles.plModalBodyDiv}>
			<ProductLink  ref="ProductLink" patConfig={this.props.patConfig} libConfig={this.props.libConfig} closeModal={this.closeModal}/>
		</div>
		<div className={styles.plModalFooterDiv}>
			<button type="button" className={styles.plCancelButton} onClick={() => { this.closeModal()}}>Cancel</button>		
		</div>
       </Modal>
	</Provider>
	</IntlProvider>

  )
}
}

export default App;






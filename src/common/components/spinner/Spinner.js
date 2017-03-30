import React from 'react';
import { connect } from 'react-redux';

// import Loadable from '../../../../lib/react-loading-overlay'; 

 import Loadable from 'react-loading-overlay'; 

const mapStateToProps = (state) => { return {isActive:state.SpinnerReducer.isActive} };
const mapDispatchProps = (dispatch) => { return {} };

class Spinner extends React.Component {

 constructor(props) {
        super(props);
     }
	 
 render() {	 

   console.log(this.props);
	// style={{position:'static'}}
  	return(
      <Loadable active={this.props.isActive} spinner  background='transparent' color="black" spinnerSize="70px" text='Loading ...' >
         {this.props.children}

       </Loadable>
     );
		 
     }
}	


Spinner.propTypes = {
 isActive:React.PropTypes.any,
 children:React.PropTypes.any
}

const SpinnerConnectComponent = connect(mapStateToProps,mapDispatchProps)(Spinner);

export default SpinnerConnectComponent;

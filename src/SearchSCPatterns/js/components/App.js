import React, {Component, PropTypes} from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import store from '../store';
import ModalContainer from '../container/ModalContainer';
import SearchConfig from '../config/Config.json'
class App extends Component{
constructor(props) {
    super(props);
    if (props.patConfig) {
      window.tdc = {
        patConfig: props.patConfig,
        libConfig: props.libConfig
      };
    }
  }
	render() {
    return (
         <Provider store={store}>
           <div>
           <ModalContainer componentConfig = {SearchConfig} patConfig={this.props.patConfig} 
              libConfig={this.props.libConfig}/>
          </div>
        </Provider>
      );
  }
}

App.propTypes = {
    patConfig:React.PropTypes.object,
    libConfig:React.PropTypes.object,
}

export default App;

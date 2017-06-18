import { combineReducers } from 'redux';
import ProductLinkReducer from './ProductLinkReducer';
import TreePaneReducers from './TreePaneReducer';

const productLinkReducers = combineReducers({  
  ProductLinkReducer,
  TreePaneReducers
})

export default productLinkReducers

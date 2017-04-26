/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class SortAssets component will be used to create a Drop down sorted 
 * value to render on Search Library and Browse asset Page
 * @author TDC
 **/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import SortAssetStyles from './styles/SortAssetStyles.css'
class SortAssets extends Component{

	/**
	 * @constructor defines state of the SortAssets Component
	 */
	constructor(props){
		super(props);
		this.state={
			value: props.value
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.value) {
			this.setState({
				value: nextProps.value
			});
		}
	}

	/**
	* @function change method is used to change the state of the 
	* SortAssets component
	* @param {object} event
	*/
	change(event){
         this.setState({value: event.target.value});
         this.props.change(event.target.value);
     }

     /**
     * @function assignKeys method is used for returns the respective value
     * to the keys
     * @param {string} sortValue - Key used to identify the associated value
     */
     // assignKeys(sortValue){
     // 	if(sortValue === 'Date Uploaded (Descending)'){
     // 		return 'cm:created|false'
     // 	}else if(sortValue === 'Date Uploaded (Ascending)'){
     //        return 'cm:created|true';
     // 	}else if(sortValue === 'Name Ascending A-Z'){
     // 		return 'cm:name|true';
     // 	}else if(sortValue === 'Name Descending Z-A'){
     // 		return 'cm:name|false';
     // 	}

     // }

        assignKeys(sortValue){
        if(sortValue === 'Date Uploaded (Descending)' || sortValue === 'date uploaded (descending)'){
            return 0
        }else if(sortValue === 'Date Uploaded (Ascending)' || sortValue === 'date uploaded (ascending)'){
            return 1
        }else if(sortValue === 'Filename Descending Z-A' || sortValue === 'filename descending Z-A'){
            return 2
        }else if(sortValue === 'Filename Ascending A-Z' || sortValue === 'filename ascending A-Z'){
            return 3
        }

     }

     /**
     * @function getSelect method is used to return the Select DOM to the \
     * render method
     * @param {object} options
     * @param {object} this object
     */
     getSelect(options, self){
     	let sortView = (<select id="sort" 
     						   className={SortAssetStyles.itemPerPageSelectBox} 
     						   onChange={self.change.bind(self)} 
     						   value={self.state.value}>{options}
     						   </select>);

     	return sortView;
     }
	render(){
		let self = this;
		let sorting = new Map();
		let sortOption = self.props.sortOptions;
		let options = sortOption.map(function (sortData, index){
						sorting.set(sortData, self.assignKeys(sortData));
                  	  return <option key={sortData} value={sorting.get(sortData)}>{sortData}</option>
                  	});

        let sortView = this.getSelect(options,self);

		return(
				<div className="sort-asset">
						{sortView}
				</div>

		)
	}

}
SortAssets.propTypes={
 sortOptions: PropTypes.array,
 change: PropTypes.func,
 value: PropTypes.string
};

module.exports= SortAssets;

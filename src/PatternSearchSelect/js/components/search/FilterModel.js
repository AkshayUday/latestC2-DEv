import React, {Component} from 'react';
import SelectBox from '../../../../common/components/SelectBox';
import Label from '../../../../common/components/Label';
import SearchModal from './styles/SearchSpec.css'
import FilterType from '../../container/FilterTypeContainer';
import SavedSearch from './SavedSearch';

class FilterModel extends Component{
	constructor(props){
		super(props);
		this.state={
			isSaveSuccess:false
		}
		this.saveLink = this.saveLink.bind(this);
		this.disableSaveImage = this.disableSaveImage.bind(this);
	}
	saveLink(event){
		event.preventDefault();
		this.state.isSaveSuccess = true;
		this.props.savedSearch();
	}
	disableSaveImage(boolValue){
		this.state.isSaveSuccess = boolValue;
	}
	render(){
		
		let filterModel = (
		<div className={SearchModal.filterDisplayWrapper}>
		<div className={SearchModal.filterRow}>
          <div className='filter-displayTxt'> 
       		<Label for='display' text='Display'/>
          </div>
          	<div className={SearchModal.DisplayItemCount}>
	          <SelectBox id='interactiveSelectBox'
	          value={this.props.displayCount}
	          onChange={this.props.onChange} 
	          options={this.props.displayOptions}/>
        	</div>
        	<div className='filter-displayTxt'> 
       			<Label for='results' text='results'/>
           </div>
        	<SavedSearch enableFromConfig={this.props.saveSearch} 
        				 onSaveClick={this.saveLink}
        				 disableSaveImage={this.disableSaveImage}
        				 saveSearchFromState={this.state.isSaveSuccess}
        				 className={SearchModal.saveSearch}/>
        </div>
        <div className={SearchModal.filterSecond}>
        	<div className={SearchModal.filterInteractive}>
        		<FilterType filterStatus={this.props.filterStatus} filters={this.props.filters}
        		localForData = {this.props.localForData} 
        		getAssetsWithManifestation = {this.props.getAssetsWithManifestation} 
        		getValue = {this.props.getValue} hostfilename = {this.props.hostfilename}/>
        	</div>
        </div>
        </div>
        );

        return(filterModel)

	}
}

FilterModel.propTypes={
	filterStatus : React.PropTypes.func,
	displayOptions: React.PropTypes.array,
	saveSearch: React.PropTypes.bool,
	filters: React.PropTypes.array,
	getAssetsWithManifestation :React.PropTypes.func,
	getValue : React.PropTypes.func,
	hostfilename : React.PropTypes.string,
	onSavedSearchLinkClick: React.PropTypes.func,
	saveType: React.PropTypes.string,
	savedSearch: React.PropTypes.func,
	onChange: React.PropTypes.func,
	selectedCount: React.PropTypes.number,
	localForData : React.PropTypes.object,		
	displayCount : React.PropTypes.string,
	isSuccess:React.PropTypes.bool,
	errMsg:React.PropTypes.string
}
export default FilterModel;

import React, {Component} from 'react';
import SelectBox from '../../../../common/components/SelectBox';
import Label from '../../../../common/components/Label';
import SearchModal from './styles/SearchSpec.css'
import Sort from '../../../../common/components/SortAssets'
import FilterType from '../../container/FilterTypeContainer';
import HyperLink from '../../../../common/components/HyperLink';

// import FilterType from './FilterType';


class FilterModel extends Component{
	constructor(props){
		super(props);


	}
	
	render(){
		if(this.props.isSuccess){
			debugger;
			//$('#successIcon').show().delay(5000).fadeOut();
			document.getElementById('successIcon').style.display='bllock';
			setTimeout(function () {
        		document.getElementById('successIcon').style.display='none';
    		}, 5000);
    	}
    	let style1={display:'none'}
		let saveSearch = this.props.saveSearch ? <HyperLink onClick={this.props.savedSearch} name='save search'/> : ''
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
        	<div className={SearchModal.saveSearch}>
        	<div id="successIcon" style={style1}>
        	<img src='/images/accept.png'/>
        	</div>
        		{saveSearch}
        	</div>
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
	sortOptions: React.PropTypes.array,
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
	isSuccess:React.PropTypes.bool
}
export default FilterModel;

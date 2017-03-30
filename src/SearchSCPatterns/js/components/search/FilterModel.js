import React, {Component} from 'react';
import SelectBox from '../../../../common/components/SelectBox';
import Label from '../../../../common/components/Label';
import SearchModal from './styles/SearchSpec.css'
import Sort from '../../../../common/components/SortAssets'
import FilterType from '../../container/FilterTypeContainer';

// import FilterType from './FilterType';


class FilterModel extends Component{
	constructor(props){
		super(props);

	}
	render(){
		let saveSearch = this.props.saveSearch ? <Label for='saveSearch' text='save search'/> : ''
		let filterModel = (
		<div className={SearchModal.filterDisplayWrapper}>
		<div className={SearchModal.filterRow}>
          <div className='filter-displayTxt'> 
       		<Label for='display' text='Display'/>
          </div>
          	<div className={SearchModal.filterSelectBox}>
	          <SelectBox id='interactiveSelectBox'
	          value={this.props.displayOptions}
	          className='selectbox' options={this.props.displayOptions}/>
        	</div>
        	<div className={SearchModal.saveSearch}>
        		{saveSearch}
        	</div>
        </div>
        <div className={SearchModal.filterSecond}>
        	<div className={SearchModal.filterInteractive}>
        		<FilterType filterStatus={this.props.filterStatus} filters={this.props.filters} />
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
	filters: React.PropTypes.array
}
export default FilterModel;

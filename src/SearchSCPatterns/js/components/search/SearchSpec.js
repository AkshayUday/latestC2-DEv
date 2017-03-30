import React, {Component} from 'react';
import SearchStyles from './styles/SearchSpec.css'
import SearchModel from './SearchModel'
import FilterModel from './FilterModel'
import ListView from './listview/ListView'
import Pagination from '../../../../common/components/PL_Pagination'
import Util from '../../util/SearchAssetsUtil'
const rows = [];
class SearchSpec extends Component{
	constructor(props){ 
		super(props);
		this.filterFlag = this.filterFlag.bind(this);
		this.getValue = this.getValue.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
		this.onColumnSort = this.onColumnSort.bind(this);
		let tempRow = rows.slice(0,9);
		if(this.getAssetsWithManifestation){
			this.getAssetsWithManifestation = props.getAssetsWithManifestation.bind(this);
		}
		this.state={
			filterStatus : false,
			config : this.props.componentConfig,
			pageNo:1,
			pageLimit:25,
			numberFound: rows.length,
			rows: tempRow,
			totalRecords: tempRow.length,
			index:0,
			columnsort : false,
			clickedItem : '',
			freeText: '',
			actionTypes: new Map()
			}
	}
	onColumnSort(columnName, mdsProperty){ 
		
		this.setState({clickedItem: columnName});
		this.setState({columnsort : !this.state.columnsort});
		let type = this.state.columnsort ? 'GET_SORT_DESC' : 'GET_SORT_ASC';
		this.state.actionTypes.set('ZSORT', Util.getActionObj(type, mdsProperty));
		this.getAssetsWithManifestation();
	}

	getAssetsWithManifestation(){ 
		this.props.getAssetsWithManifestation(this.state.actionTypes);
	}

	filterFlag(flag){
		this.setState({filterStatus : !flag});
	}
	handlePageChange(pageNo){
		this.setState({pageNo : pageNo});
		this.state.actionTypes.set('PAGE_INIT', Util.getActionObj('GET_INTIAL_PAGE', pageNo));
		this.state.actionTypes.set('PAGING_MAX', Util.getActionObj('GET_PAGE_MAX', this.state.pageLimit));
		this.getAssetsWithManifestation();
	}

	getValue(textValue){ 
		this.setState({freeText : textValue});
		this.state.actionTypes.set('PAGE_INIT', Util.getActionObj('GET_INTIAL_PAGE', this.state.pageNo));
		this.state.actionTypes.set('PAGING_MAX', Util.getActionObj('GET_PAGE_MAX', this.state.pageLimit));

		let type, value;
		if(textValue !== '' && textValue !== undefined){
				type = 'GET_GENERIC_ALL',
				value = textValue.trim();
		}else{
				type = 'GET_ALL';
				value = '';
		}

		this.state.actionTypes.set('FREE_TEXT', Util.getActionObj(type, value));
		this.getAssetsWithManifestation();
	}

	onRadioBtnClick(selectedRecord){
		this.props.getCallBackData(selectedRecord);
	}

	componentDidMount(){
		// degugger;
		this.props.getFilterType();
	}

	render(){ 
		const{columns, displayOptions, 
			  sortOptions, saveSearch,
			zibraRows,filters} = this.state.config;
       
		let lastPage = true;
		if(this.props.results.length>0){
			lastPage = false;
		}
		let displayHead = (
				<div className={SearchStyles.SearchWrapper}>
					<SearchModel filter={this.getValue}/>
					<FilterModel filterStatus={this.filterFlag.bind(this)} 
								 displayOptions={displayOptions}
								 sortOptions={sortOptions}
								 saveSearch={saveSearch} filters={filters} />
					<ListView flag={this.state.filterStatus} 
							  columns={columns}
							  zibraRows={zibraRows} rows={this.props.results}
							  radioHandler={this.onRadioBtnClick}
							  onColumnSort = {this.onColumnSort}
							  columnsort = {this.state.columnsort}
							  clickedItem = {this.state.clickedItem}
							  />
					<Pagination pageNumber={this.state.pageNo} lastPage={lastPage} onChange={this.handlePageChange}/>
				</div>
			);
		return(displayHead)
	}

}
SearchSpec.propTypes = {
	componentConfig : React.PropTypes.object,
	getAssetsWithManifestation: React.PropTypes.func,
	results: React.PropTypes.array,
	getFilterType: React.PropTypes.func,
	flagRender: React.PropTypes.bool,
	patConfig: React.PropTypes.object,
	getCallBackData: React.PropTypes.func
}
export default SearchSpec;


import React, {Component} from 'react';
import SearchStyles from './styles/SearchSpec.css'
import SearchModel from './SearchModel'
import FilterModel from './FilterModel'
import ListView from './listview/ListView'
import SearchPaging from './SearchPaging'

import Util from '../../util/SearchAssetsUtil'

const rows = [];
class SearchSpec extends Component{
	constructor(props){ 
		super(props);
		this.filterFlag = this.filterFlag.bind(this);
		this.getValue = this.getValue.bind(this);
		this.handleItemCountChange = this.handleItemCountChange.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
		this.onColumnSort = this.onColumnSort.bind(this);
		this.componentWillMount = props.componentWillMount;		
		this.savedSearch = props.savedSearch.bind(this);		
		this.currAutoData = this.currAutoData.bind(this);
		if(this.getAssetsWithManifestation){
			this.getAssetsWithManifestation = props.getAssetsWithManifestation.bind(this);
		}
		this.state={
			filterStatus : false,
			config : this.props.componentConfig,
			pageNo:1,
			pageLimit:25,
			columnsort : false,
			clickedItem : '',
			freeText: '',
			actionTypes: new Map(),
			sugSaveVal: ''
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

	handleItemCountChange(event){
		this.setState({pageNo : 1});
		this.setState({pageLimit: parseInt(event.target.value)});
		this.state.actionTypes.set('PAGE_INIT', Util.getActionObj('GET_INTIAL_PAGE', 1));
		this.state.actionTypes.set('PAGING_MAX', Util.getActionObj('GET_PAGE_MAX', parseInt(event.target.value)));
		this.getAssetsWithManifestation();
	}

	handlePageChange(pageNo){
		this.setState({pageNo : pageNo});
		this.state.actionTypes.set('PAGE_INIT', Util.getActionObj('GET_INTIAL_PAGE', pageNo));
		this.state.actionTypes.set('PAGING_MAX', Util.getActionObj('GET_PAGE_MAX', this.state.pageLimit));
		this.getAssetsWithManifestation();
	}

	getValue(textValue){ 
		this.setState({freeText : textValue});
		this.setState({pageNo: 1});
		this.state.actionTypes.set('PAGE_INIT', Util.getActionObj('GET_INTIAL_PAGE', 1));
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
	currAutoData(sugValue){		
		this.setState({sugSaveVal: sugValue});		
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
			zibraRows,filters, patternTitle} = this.state.config;
       
			let pageDetail ={
				totalRecords: this.props.results.length,
				pageNo: this.state.pageNo,
				pageLimit: this.state.pageLimit,
				lastPage: true
			}

		
		let displayHead = (
				<div className={SearchStyles.SearchWrapper}>
				<div id="errorDisplay" className={SearchStyles.errorDisplay}>
                {this.props.error}
				</div>
					<SearchModel patternTitle={patternTitle} filter={this.getValue} autoSuggestData= {this.props.autoSuggestData}
					getAutoData={this.props.getAutoData} currAutoData={this.currAutoData} hostfilename = {this.props.patConfig.patSetup.filename}/>
					<FilterModel filterStatus={this.filterFlag.bind(this)} 
								 displayOptions={displayOptions}
								 sortOptions={sortOptions}
								 saveSearch={saveSearch} filters={filters} 
								 getAssetsWithManifestation = {this.props.getAssetsWithManifestation.bind(this)} 
								 getValue = {this.getValue.bind(this)}
								 hostfilename = {this.props.patConfig.patSetup.filename}
								 savedSearch={this.savedSearch}
								 onChange={this.handleItemCountChange}
								 />
					<ListView flag={this.state.filterStatus} 
							  columns={columns}
							  zibraRows={zibraRows} rows={this.props.results}
							  radioHandler={this.onRadioBtnClick}
							  onColumnSort = {this.onColumnSort}
							  columnsort = {this.state.columnsort}
							  clickedItem = {this.state.clickedItem}
							  />
					<SearchPaging pageDetails={pageDetail} handlePageChange={this.handlePageChange}/>
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
	getCallBackData: React.PropTypes.func,
	error : React.PropTypes.string,
	componentWillMount: React.PropTypes.func,
	saveSearch: React.PropTypes.func,
	autoSuggestData: React.PropTypes.array,
	savedSearch: React.PropTypes.func,
	srSaveValue: React.PropTypes.string,
	getAutoData: React.PropTypes.string
}
export default SearchSpec;


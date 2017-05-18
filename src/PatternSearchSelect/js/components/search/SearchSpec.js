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
		let  isSortEnabled = false;
		let  sortLocalTitle='';
		if(this.props.localForData !== undefined){
			if(this.props.localForData[this.props.patConfig.pattern] != undefined && this.props.localForData[this.props.patConfig.pattern].columnSort !== undefined){
				isSortEnabled=this.props.localForData[this.props.patConfig.pattern].columnSort;
			}
			if(this.props.localForData[this.props.patConfig.pattern] != undefined && this.props.localForData[this.props.patConfig.pattern].sortColName !== undefined){
				sortLocalTitle=this.props.localForData[this.props.patConfig.pattern].sortColName;
			}
		}
		this.state={
			filterStatus : false,
			config : this.props.componentConfig,
			pageNo:1,
			pageLimit:25,
			columnsort : isSortEnabled,
			clickedItem : sortLocalTitle,
			freeText: '',
			actionTypes: new Map(),
			sugSaveVal: '',
			displayCount :'',
			isSuccess: false
		}
	}
	onColumnSort(mdsProperty){ 
		if(mdsProperty != 'taxonomicType'){
			this.setState({clickedItem: mdsProperty});
			//this.setState({columnsort : !this.state.columnsort});
			this.state.columnsort = !this.state.columnsort;
			//let type = this.state.columnsort ? 'GET_SORT_DESC' : 'GET_SORT_ASC';
			let type = this.state.columnsort ? 'GET_SORT_ASC' : 'GET_SORT_DESC';
			this.state.actionTypes.set('ZSORT', Util.getActionObj(type, mdsProperty));
			this.getAssetsWithManifestation();
		}
		
	}

	getAssetsWithManifestation(){ 
		this.props.getAssetsWithManifestation(this.state.actionTypes);
	}

	filterFlag(flag){
		this.setState({filterStatus : !flag});
	}

	handleItemCountChange(event){
		event.preventDefault();
		this.setState({pageNo : 1});
		//this.setState({pageLimit: parseInt(event.target.value)});
		this.state.pageLimit = parseInt(event.target.value);
		this.state.displayCount = this.state.pageLimit;
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
		if(textValue !== '' && textValue !== undefined && textValue.trim().length > 0){
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
	componentWillReceiveProps(newProps) {
		if(newProps.localForData !== undefined){
			if(newProps.localForData[this.props.patConfig.pattern] !== undefined && newProps.localForData[this.props.patConfig.pattern].sortSelection.order !== undefined){

				this.state.actionTypes.set('ZSORT', Util.getActionObj(newProps.localForData[this.props.patConfig.pattern].sortSelection.order,
				newProps.localForData[this.props.patConfig.pattern].sortSelection.columnName));

				if(newProps.localForData[this.props.patConfig.pattern].sortSelection.order === 'GET_SORT_ASC'){
					this.state.columnsort = true;
				}else{
					this.state.columnsort = false;
				}
				//this.state.columnsort = newProps.localForData[this.props.patConfig.pattern].columnSort;
			}
			if(newProps.localForData[this.props.patConfig.pattern] != undefined && newProps.localForData[this.props.patConfig.pattern].sortSelection.columnName !== undefined){
				this.state.clickedItem = newProps.localForData[this.props.patConfig.pattern].sortSelection.columnName;
			}
			if(newProps.localForData[this.props.patConfig.pattern] != undefined && newProps.localForData[this.props.patConfig.pattern].displayCount.listMode !== undefined){
				this.state.pageLimit = parseInt(newProps.localForData[this.props.patConfig.pattern].displayCount.listMode);
			    this.state.displayCount = this.state.pageLimit; 
			}
			if(newProps.localForData.isSuccess != undefined && newProps.localForData.isSuccess != null){		
				this.state.isSuccess = newProps.localForData.isSuccess;		
			}
		}
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
								 localForData = {this.props.localForData}
								 getAssetsWithManifestation = {this.props.getAssetsWithManifestation.bind(this)} 
								 getValue = {this.getValue.bind(this)}
								 hostfilename = {this.props.patConfig.patSetup.filename}
								 savedSearch={this.savedSearch}
								 onChange={this.handleItemCountChange}
								 displayCount={this.state.displayCount}
								 isSuccess={this.state.isSuccess}
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
	getAutoData: React.PropTypes.string,
	localForData : React.PropTypes.object
}
export default SearchSpec;


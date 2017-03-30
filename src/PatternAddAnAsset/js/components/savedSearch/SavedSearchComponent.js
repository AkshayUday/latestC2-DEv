import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import TableComponent from './tableComponent';
import Paginate from '../../../../common/components/PL_Pagination/paging';

import savedSearchStyles from './styles/savedSearchStyles.css';

class SavedSearchComponent extends Component {

  constructor(props) {
    super(props);
    this.displayName = 'SavedSearchComp';
    this.componentWillMount = props.componentWillMount;
    this.handleChange = props.handleChange.bind(this);
    this.handlePageChange = props.handlePageChange.bind(this);
    this.deleteSavedSearch = props.deleteSavedSearch;
    this.runSavedSearch = props.runSavedSearch;
  }

  render() {
   let columns = ['Search Term'];
   let self = this;
   let CheckedValues = this.props.CheckedValues;
   let rows = this.props.rows;
   let isShowDetail = true;
   if(CheckedValues.length>0){
    for(let i=0;i<rows.length;i++){
      for(let j=0;j<CheckedValues.length;j++){
        if(rows[i].id===CheckedValues[j].id){
          rows[i].isChecked = CheckedValues[j].checked;
        }
      }
    }
  }
  let body = (
  <div className={savedSearchStyles.container}>
      <TableComponent className={savedSearchStyles.savedSearchTable}
        columns={columns} rows={rows} checkboxOnchange={this.props.handleChange}/>
     <Paginate pageDetails={this.props.pageDetails} showDetail = {isShowDetail}  handlePageChange={this.props.handlePageChange} />
  </div>
)
let empty = < div className = {savedSearchStyles.alertMsg} > No results found < /div>;

return (
  <div>
  { this.props.rows.length > 0 ? body : empty }
  </div>
  );
}
}
  
SavedSearchComponent.propTypes = {
  handleChange: React.PropTypes.func,
  componentWillMount: React.PropTypes.func,
  handlePageChange: React.PropTypes.func,
  deleteSavedSearch: React.PropTypes.func,
  runSavedSearch: React.PropTypes.func,
  enableDelete: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.boolean,
  ]),
  enableSearch: React.PropTypes.func,
  pageDetails: React.PropTypes.object,
  CheckedValues: React.PropTypes.any,
  rows: React.PropTypes.any,
  columns: React.PropTypes.array
}

module.exports = SavedSearchComponent;

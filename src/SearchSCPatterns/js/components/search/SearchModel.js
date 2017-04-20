import React, {Component} from 'react';
import Label from '../../../../common/components/Label';
import TextBox from '../../../../common/components/TextBox';
import SearchModal from './styles/SearchSpec.css';
import Search from '../../../../common/components/AutoSuggest';

class SearchModel extends Component {

	constructor(props){
		super(props);
		this.textValueChange = this.textValueChange.bind(this);
		this.onSearchIconClick = this.onSearchIconClick.bind(this);
		this.state={
			textValue:'',
			value: '',		
	      	suggestions: []
		}
		this.getAutoData = this.getAutoData.bind(this);
	}
	textValueChange(textValue){ 
		this.setState({textValue: textValue.target.value});
	}
	onSearchIconClick(){ 
		this.props.filter(this.state.textValue);
	}
	getAutoData(val){ 		
      this.state.textValue = val;
      this.props.currAutoData(val);		
	}
	render(){

		return (
				<div className={SearchModal.header}>
					<div className={SearchModal.labelClass}>
						<Label for='searchInteractive' text={this.props.patternTitle}/>
					</div>
					<div className={SearchModal.seachTexBoxWrapper}>
						<div className={SearchModal.searchTextBox}>
							<Search autoSuggestData = {this.props.autoSuggestData}  hostfilename = {this.props.hostfilename} onSearchIconClick={this.onSearchIconClick} getAutoData = {this.getAutoData}/>
						</div>
						<div className={SearchModal.searchBtn}>
							<i className="fa fa-search" aria-hidden="true"  
							onClick={this.onSearchIconClick.bind(this)}></i>
						</div>
					</div>
				</div>
		)

	}
}
SearchModel.propTypes={
	filter: React.PropTypes.func,
	suggestions: React.PropTypes.object,		
	autoSuggestData: React.PropTypes.array,		
	currAutoData: React.PropTypes.func,
	hostfilename: React.PropTypes.string,
	patternTitle: React.PropTypes.string
}

export default SearchModel;

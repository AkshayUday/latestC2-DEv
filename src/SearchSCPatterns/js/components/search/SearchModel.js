import React, {Component} from 'react';
import Label from '../../../../common/components/Label';
import TextBox from '../../../../common/components/TextBox';
import SearchModal from './styles/SearchSpec.css'
class SearchModel extends Component {

	constructor(props){
		super(props);
		this.textValueChange = this.textValueChange.bind(this);
		this.onSearchIconClick = this.onSearchIconClick.bind(this);
		this.state={
			textValue:''
		}
	}
	textValueChange(textValue){ 
		this.setState({textValue: textValue.target.value});
	}
	onSearchIconClick(){ 
		this.props.filter(this.state.textValue);
	}
	render(){

		return (
				<div className={SearchModal.header}>
					<div className={SearchModal.labelClass}>
						<Label for='searchInteractive' text='Enter Name or Filename'/>
					</div>
					<div className={SearchModal.seachTexBoxWrapper}>
						<div className={SearchModal.searchTextBox}>
							<TextBox className='searchBox' onChange={this.textValueChange}/>
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
	filter: React.PropTypes.func
}

export default SearchModel;

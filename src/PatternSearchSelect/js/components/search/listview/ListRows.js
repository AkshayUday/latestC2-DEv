import React, {Component} from 'react';
import ListStyles from './ListViewStyles.css'
import RadioBtn from '../../../../../common/components/Radio'

class ListRows extends Component{

	constructor(props){ 
		super(props);
		this.setSelectedItem = this.setSelectedItem.bind(this);
		debugger;
		if(this.props.panel == 'assessment' && this.props.prevSelectedAssessment != ''){
			this.state = { setSelectedItemId: this.props.prevSelectedAssessment.id};	
		}else{
			this.state = { setSelectedItemId: ''};	
		}
		
		
	}
	setSelectedItem(selectedItem){ 

		this.props.radioHandler(selectedItem);
		this.setState({setSelectedItemId:selectedItem.id});

	}

	handleSelectedAssessment(){
		this.setState({setSelectedItemId:''});
	}

    assetSelectedEvent(me, isTrue=true) {
	    if (isTrue) {
	      this.customFn(this.props.record);
	    }
	    else {
	      this.customFn({});
	    }
   }

   componentDidMount() {
    if (typeof this.props.getChildToParent === 'function') {
      this.props.getChildToParent(this.exposedMethod.bind(this));
    }
   }

   exposedMethod(){
	   	  this.setState({
	      setSelectedItemId: ''
	    });
   }

	render(){ 
		let self = this;
		let isZibra = this.props.zibraRows ? ListStyles.zibrarows : ListStyles.noZibraRows;
		let rowContent = 'No Results Found';
		let length = this.props.rows ? this.props.rows.length : 0;
		if(length > 0){
			rowContent = this.props.rows.map(function (row){
            let checked = false;
		    
		    if(self.state.setSelectedItemId == row.id && self.state.setSelectedItemId != ''){
              checked = true;
		    } 



			return (
					<div className={ListStyles.rowContent}>

						<div className={ListStyles.rowTitleWrapper}>			
							<div className={ListStyles.rowRadioBtn}>
							<RadioBtn name='radiobtn' record={row} 
									  parent={self.assetSelectedEvent}
									  customFn={self.setSelectedItem} checked={checked}/>
							</div>
							
							<div className='rowTitle'>
								{row.title}
							</div>

						</div>
						{self.props.panel == 'assessment' && 
						<div className={ListStyles.rowType}>{row.type}</div>
					    }

						<div className={ListStyles.rowDatemodified}>{row.dateModified}</div>
					</div>
				
					)
		});

		}
		

		return(<div className={isZibra}>
				{rowContent}
				</div>
			   )
	}
}

ListRows.propTypes = {
	rows: React.PropTypes.array,
	zibraRows: React.PropTypes.bool,
	radioHandler: React.PropTypes.func,
	record : React.PropTypes.object,
	panel : React.PropTypes.string,
	prevSelectedAssessment: React.PropTypes.object,
	getChildToParent: React.PropTypes.object

}
export default ListRows;

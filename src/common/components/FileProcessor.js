import React,{Component} from 'react';
import ReactFile from 'react-file-processor'

import Styles from './styles/FileProcessorStyles.css'

class FileProcessor extends Component{
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
		this.handleFileSelect = this.handleFileSelect.bind(this);
	}
	handleClick(e) {
    this.refs.myFileInput.chooseFile();
  	}
	handleFileSelect(e, files) { 
		console.log('handleFileSelect in FileProcessor')
		console.log(files);
		e.preventDefault();
	    this.props.selectedFile(files);
	}
	render(){ 
		const self = this;
		let view = (
        			 <div>
			          <ReactFile
			            ref="myFileInput"
			            onFileSelect={self.handleFileSelect.bind(self)}>
			            <button className={Styles.chooseButton +' '+ Styles.uploadbutton} onClick={self.handleClick.bind(self)}>
			              Choose file
			            </button>
			          </ReactFile>
      				</div>
			)
		return(
			<div>
				{view}
			</div>
			)
	}
}

FileProcessor.propTypes = {
	selectedFile : React.PropTypes.func
}
export default FileProcessor;

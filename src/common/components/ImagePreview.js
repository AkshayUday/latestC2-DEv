/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 * @class DropDown used to create Dropdown component which will display
 * grid and list view component 
 * @author TDC
 **/
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ImageGallery from 'react-image-gallery';
import styles from './styles/image-gallery.css';
import ImgPreviewStyles from './styles/ImagePreview.css';
import Radio from './Radio';

class ImagePreview extends Component{

    constructor(props){
        super(props);
        this.assetObjects = props.imagelist;
        this.state = {
           displayFileSize : '',
           displayDescription : '',
           rawSize : 0,
        }
        this.handleImageLoad = this.handleImageLoad.bind(this);
    }

      handleImageLoad(currInd) { 
        document.getElementById('imageNameSpan').innerHTML = this.assetObjects[currInd].name;
        document.getElementById('desc').innerHTML = this.assetObjects[currInd].description;
        this.state.rawSize = this.assetObjects[currInd].size;
        this.state.displayFileSize = this.convertFileSize(this.state.rawSize);
        document.getElementById('size').innerHTML = this.state.displayFileSize;
        //document.getElementById('prvwImgRadio').setAttribute('data-index', currInd);
      }

      componentDidMount(){
        document.getElementById('imageNameSpan').innerHTML = this.props.imagelist[this.props.selIndex].name;
        document.getElementById('desc').innerHTML = this.props.imagelist[this.props.selIndex].description;
        this.state.rawSize = this.props.imagelist[this.props.selIndex].size;
        this.state.displayFileSize = this.convertFileSize(this.state.rawSize);
        document.getElementById('size').innerHTML = this.state.displayFileSize;
      }
      
       convertFileSize(rawFileSize){
        let sizeDisplay = '';
        let fileType = 'KB';
        let mbFileSize = '';
        let fileSize = parseFloat(this.state.rawSize/1024).toFixed(2);
        if (fileSize >= 1024) {
            mbFileSize = parseFloat(fileSize/1024).toFixed(2);
            fileType = 'MB'
            sizeDisplay = mbFileSize+' '+fileType;
        }
        sizeDisplay = fileSize+' '+fileType;
        return sizeDisplay
      }
 
      render() {

        const images = this.props.imagelist;
        // const images = [
        //   {
        //     original: 'http://lorempixel.com/1000/600/nature/1/',
        //     thumbnail: 'http://lorempixel.com/250/150/nature/1/',
        //   },
        //   {
        //     original: 'http://lorempixel.com/1000/600/nature/2/',
        //     thumbnail: 'http://lorempixel.com/250/150/nature/2/'
        //   },
        //   {
        //     original: 'http://lorempixel.com/1000/600/nature/3/',
        //     thumbnail: 'http://lorempixel.com/250/150/nature/3/'
        //   }
        // ]
        return (
                
                <div className={ImgPreviewStyles.prvwsize}>
                    <ImageGallery
                    items={images}
                    slideInterval={2000}
                    onSlide={this.handleImageLoad}
                    showThumbnails={false}
                    startIndex={this.props.selIndex}/>
                    <div className={ImgPreviewStyles.details}>
                    <div id='desc'></div>
                    </div>
                    <div className={ImgPreviewStyles.info}>
                    
                    <div id='size'></div>
                    </div>
                </div>
        );
      }

}

ImagePreview.propTypes = {
    imagelist: PropTypes.array,
    selIndex: PropTypes.number
}
module.exports= ImagePreview;

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
    }

      handleImageLoad(currInd) {
        console.log('Image loaded--------- ', this.items[currInd]); 
        document.getElementById('imageNameSpan').innerHTML = this.items[currInd].name;
        document.getElementById('prvwImgRadio').setAttribute('data-index', currInd);
      }

      componentDidMount(){
        document.getElementById('imageNameSpan').innerHTML = this.props.imagelist[0].name;
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
                    showThumbnails={false}/>
                </div>
        );
      }

}

ImagePreview.propTypes = {
    imagelist: PropTypes.array,
}
module.exports= ImagePreview;

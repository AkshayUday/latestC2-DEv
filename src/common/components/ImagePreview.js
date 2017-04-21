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

class ImagePreview extends Component{

    constructor(props){
        super(props);
    }

      handleImageLoad(event) {
        console.log('Image loaded ', event.target)
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
          <ImageGallery
            items={images}
            slideInterval={2000}
            onImageLoad={this.handleImageLoad}/>
        );
      }

}

ImagePreview.propTypes = {
    imagelist: PropTypes.array
}
module.exports= ImagePreview;


import React, { Component, PropTypes } from 'react';
import ImagePreview from '../../../common/components/ImagePreview';

import {addLocaleData, IntlProvider} from 'react-intl';
import { Provider } from 'react-redux';
import store from '../store';
import Entry from '../container/ImgPreviewEntryContainer';

import ImgPreviewStyles from './Styles/ImgPreviewStyles.css';

class ImagePreviewEntry extends Component {
    /**
  * @constructor defines states of the Browse Assets Component
  */
    constructor(props) {
        super(props);    
    }

    render() {
        const locale = 'en';
        const leftBr = '<';

        const translations = {
          'fr' : {
               'Review_Asset_MetaData': 'Métadonnées du produit',
              }
        };
        const assetObjList = this.props.assetObjList;
        assetObjList.forEach((asst) => {
          asst.original = asst.previewUrl;
          asst.originalAlt = 'Product Image';
        });

/*        const assetObjList = [
          {
            original: 'http://lorempixel.com/1000/600/nature/1/',
            thumbnail: 'http://lorempixel.com/250/150/nature/1/',
          },
          {
            original: 'http://lorempixel.com/1000/600/nature/2/',
            thumbnail: 'http://lorempixel.com/250/150/nature/2/'
          },
          {
            original: 'http://lorempixel.com/1000/600/nature/3/',
            thumbnail: 'http://lorempixel.com/250/150/nature/3/'
          }
        ]*/
        let selRadio = (<input type="radio"  id='prvwImgRadio' data-index='0'/>);
        return (

                <div>
                  <div className={ImgPreviewStyles.btnsContnr}>
                    <button className={ImgPreviewStyles.btnSelect + ' ' + ImgPreviewStyles.previewBtns} type="button" onClick={this.props.backhandle}> {leftBr} BACK</button>
                    <button id='selectImageBtn' className={ImgPreviewStyles.btnCancel + ' ' + ImgPreviewStyles.previewBtns} type="button" onClick={this.props.selectAsset}> {selRadio} SELECT</button>
                    <span id='imageNameSpan' className={ImgPreviewStyles.previewBtns}></span>
                  </div>
                  <div className={ImgPreviewStyles.entryCntnr}>
                    <Entry imagelist={assetObjList} />
                  </div>
                </div>
        );
    }
}

ImagePreviewEntry.propTypes = {
    assetObjList: PropTypes.array,
    backhandle: PropTypes.func,
    selectAsset: PropTypes.func
}

module.exports = ImagePreviewEntry;

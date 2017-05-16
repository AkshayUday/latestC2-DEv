
import React, { Component, PropTypes } from 'react';
import ImagePreview from '../../../common/components/ImagePreview';

class ImagePreviewEntry extends Component {
    /**
  * @constructor defines states of the Browse Assets Component
  */
    constructor(props) {
        super(props);
    }
    render() {
        const assetObjList = this.props.assetObjList;
        return (
            <ImagePreview imagelist={this.props.assetObjList} />
        );
    }
}

ImagePreviewEntry.propTypes = {
    assetObjList: PropTypes.array;
}

module.exports = ImagePreviewEntry;

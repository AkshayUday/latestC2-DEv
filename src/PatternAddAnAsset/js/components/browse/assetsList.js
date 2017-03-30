import React, { Component, PropTypes } from 'react';
import Assets from './assets';
import AssetListStyles from './styles/AssetListStyles.css'
class assetsList extends Component {
    render() { 
        let cssGridLayout = this.props.cssGridLayout,
        setSelectedItem = this.props.setSelectedItem,
        selectedRecord = this.props.selectedRecord,
        self = this,
        styleName = 'list-viewItems',
        listView = this.props.listViewStyle;


        if(this.props.pageView === 'grid-view'){
            styleName = AssetListStyles.resource;
        }
        let listItems = this.props.list.map(function (item) {
             return (
                <div key={Math.random()} className={styleName}>
                    <Assets
                            productTemp = {item}
                            selectedRecord = {selectedRecord}
                            setSelectedItem= {setSelectedItem}
                            pageView = {self.props.pageView}
                            listViewStyle = {listView}/>
                </div>
            );
        });

        return (
            <div className='assetListDiv'>
              {listItems}
            </div>
        )
    }
}


assetsList.propTypes = {
  cssGridLayout: PropTypes.number,
  setSelectedItem : PropTypes.func,
  selectedRecord: PropTypes.object,
  pageView: PropTypes.string,
  list: PropTypes.array,
  listViewStyle: PropTypes.string
}


module.exports = assetsList;

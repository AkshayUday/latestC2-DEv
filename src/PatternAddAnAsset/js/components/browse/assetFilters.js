import React, { Component, PropTypes } from 'react';
import PL_Tabs from '../../../../common/components/PL_Tabs';
import AssetsContainer from '../../container/assetsContainer';
import {injectIntl, intlShape} from 'react-intl';
import SavedSearchContainer from '../../container/SavedSearchContainer';
import {messages} from './assetFiltersDefaultMessages';
import CollapseIt from '../../../../common/components/CollapseFolder'
import AssetFilterStyle from './styles/AssetFiltersStyles.css'
class AssetFilters extends Component {

  constructor(props) {
    super(props);
       this.state = {
        selectedTab: this.props.selectedIndex, // Items per page
      }
    this.tabHandleSelect = this.tabHandleSelect.bind(this);
    //this.tabtoVisible = 0;
  }
  tabHandleSelect(index, last){
    this.setState({selectedTab : index});
    this.props.tabHandleSelect(index,last);
  }

  componentWillReceiveProps(nextProps){
     this.setState({
        selectedTab: nextProps.selectedIndex
     });
  }


  render() {
    let imageTab='',videoTab='',audioTab='',otherTab='';
    if(!this.props.tabVisibility.image){
      imageTab = AssetFilterStyle.disableTab;
    }
    if(!this.props.tabVisibility.video){
      videoTab = AssetFilterStyle.disableTab;
    }
    if(!this.props.tabVisibility.audio){
      audioTab = AssetFilterStyle.disableTab;
    }
    if(!this.props.tabVisibility.other){
      otherTab = AssetFilterStyle.disableTab;
    }

    // let selTab = 0;
    //   if(this.props.tabVisibility.image==false){
    //    if(this.state.selectedTab==0) {
    //    selTab=1;
    //     if(this.props.tabVisibility.video==false){
    //     selTab = 2;
    //       if(this.props.tabVisibility.audio==false){
    //     selTab = 3;
    //       }
    //     }

    //   this.setState({
    //       selectedTab: selTab
    //       });
    //   }
    // }

    

    /**
    * this code is for disable and enable the tabs for browse asset based on the 
    * tab visibility parameters from sample application
    **/

    let tabVisibility = JSON.parse(tdc.libConfig.tabVisibility)
    let tabtoVisible = this.state.selectedTab;
    if(!tabVisibility.image && this.state.selectedTab === 0){
      if(tabVisibility.video){
        tabtoVisible = 1;
      }else if(tabVisibility.audio){
        tabtoVisible = 2;
      }else if(tabVisibility.other){
        tabtoVisible = 3;
      }
    }

    // if(!this.props.tabVisibility.image){
    //   if(!this.props.tabVisibility.video){
    //     if(!this.props.tabVisibility.audio){
    //       if(!this.props.tabVisibility.other){

    //       }else{
    //       this.setState({
    //       selectedTab: 3
    //       });
    //       }
    //     }else{
    //       this.setState({
    //       selectedTab: 2
    //       });
    //     }
    //   }else{
    //     this.setState({
    //     selectedTab: 1
    //     });
    //   }
    // }

    const c2TabData = [
    {index:0, className:imageTab, name: 'Image', content: <AssetsContainer collapse={this.props.collapse} products={this.props.products} tabs={this.props.tabs} filter="image"/>},
    {index:1, className:videoTab, name: 'Video', content: <AssetsContainer collapse={this.props.collapse} products={this.props.products} filter="video"/>},
    {index:2, className:audioTab, name: 'Audio', content: <AssetsContainer collapse={this.props.collapse} products={this.props.products} filter="audio"/>},
    {index:3, className:otherTab, name: 'Other', content: <AssetsContainer collapse={this.props.collapse} products={this.props.products} filter="all"/>}
  ];

  function getTabs() {
  return c2TabData.map(c2TabData => ({
    key: c2TabData.index, // Optional. Equals to tab index if this property is omitted
    tabClassName: c2TabData.className, 
    title: c2TabData.name,
    getContent: () => c2TabData.content,
  }));
  }
    const {formatMessage} = this.props.intl;
    if(this.props.showTabs){
    return (
      <div id='browseTabsContainer' className={AssetFilterStyle.assetRightWrapper}>
       <CollapseIt toggle={this.props.toggleFolder} collapse={this.props.collapse} />
      <div className={AssetFilterStyle.peAssetFilters}>
         <PL_Tabs items={getTabs()} 
                 wrapperClass={AssetFilterStyle.childTabWrapper} 
                 tabClass={AssetFilterStyle.childTab} 
                 panelClass={AssetFilterStyle.childPanel} 
                 selectedTabKey={this.state.selectedTab}  
                 onChange={this.tabHandleSelect}/>
    </div>
    </div>
    )
  }else{
    return (
      <div></div>
      )
  }
  }
}
AssetFilters.propTypes = {
        intl: intlShape.isRequired,
        selectedIndex:PropTypes.number,
        tabHandleSelect: PropTypes.func,
        tabVisibility:PropTypes.object,
        products: PropTypes.string,
        tabs: PropTypes.string,
        toggleFolder : PropTypes.func,
        collapse : PropTypes.bool,
        showTabs: PropTypes.bool
  }


export default injectIntl(AssetFilters);

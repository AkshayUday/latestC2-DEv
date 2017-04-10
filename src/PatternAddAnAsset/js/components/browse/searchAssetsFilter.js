import React, { Component, PropTypes } from 'react';
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
//import C2Tabs from 'react-responsive-tabs';
import PL_Tabs from '../../../../common/components/PL_Tabs';
import SearchAssetsContainer from '../../container/searchAssetsContainer';
import {injectIntl, intlShape} from 'react-intl';
import SavedSearchContainer from '../../container/SavedSearchContainer';
import {messages} from './assetFiltersDefaultMessages';

import styles from './styles/searchAssetsFilterStyles.css';


class searchAssetsFilter extends Component {

  constructor(props) {
    super(props);
       this.state = {
        selectedTab: this.props.selectedIndex // Items per page
      }
    this.tabHandleSelect = props.tabHandleSelect.bind(this);
  }
  componentWillReceiveProps(nextProps){
     this.setState({
        selectedTab: nextProps.selectedIndex
     });
  }


  render() {
    let imageTab='',videoTab='',audioTab='',otherTab='';
    if(!this.props.tabVisibility.image){
      imageTab = styles.disableTab;
    }
    if(!this.props.tabVisibility.video){
      videoTab = styles.disableTab;
    }
    if(!this.props.tabVisibility.audio){
      audioTab = styles.disableTab;
    }
    if(!this.props.tabVisibility.other){
      otherTab = styles.disableTab;
    }

    let selTab = 0;
      if(this.props.tabVisibility.image==false){
        if(this.state.selectedTab==0) {
       selTab=1;
        if(this.props.tabVisibility.video==false){
        selTab = 2;
          if(this.props.tabVisibility.audio==false){
        selTab = 3;
          }
        }

      this.setState({
          selectedTab: selTab
          });
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
    {index:0, className:imageTab, name: 'Image', content: <SearchAssetsContainer products={this.props.products} filter="image"/>},
    {index:1, className:videoTab, name: 'Video', content: <SearchAssetsContainer products={this.props.products} filter="video"/>},
    {index:2, className:audioTab, name: 'Audio', content: <SearchAssetsContainer products={this.props.products} filter="audio"/>},
    {index:3, className:otherTab, name: 'Other', content: <SearchAssetsContainer products={this.props.products} filter="all"/>},
    {index:4, className:'',name: 'Saved Searches', content: <SavedSearchContainer/>}
  ];
  function getTabs() {
  return c2TabData.map(c2TabData => ({
    key: c2TabData.index, // Optional. Equals to tab index if this property is omitted
    tabClassName: c2TabData.className, // Optional
    title: c2TabData.name,
    getContent: () => c2TabData.content,
  }));
  }
    const {formatMessage} = this.props.intl;

    if(this.props.showTabs){
    return (
      <div id='searchTabsContainer' className={styles.searchTabsContainer}>
         <PL_Tabs items={getTabs()} showMore={false} transformWidth={600} wrapperClass={styles.c2TabsWrapper} tabClass={styles.c2Tab} panelClass={styles.c2Panel} selectedTabKey={this.state.selectedTab}  onChange={this.tabHandleSelect}/>
    </div>
    )
  }else{
    return(
      <div></div>
      )
  }
  }
}

searchAssetsFilter.propTypes = {
  selectedIndex: PropTypes.number,
  tabHandleSelect: PropTypes.func,
  intl: PropTypes.object,
  intl: intlShape.isRequired,
  tabVisibility:PropTypes.object,
  products:PropTypes.string,
  showTabs:PropTypes.bool
}

export default injectIntl(searchAssetsFilter);

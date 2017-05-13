import React, { Component, PropTypes } from 'react';
import AssetsList from './assetsList';
import ItemsPerPage from '../../../../common/components/PL_ItemsPerPage';
import Column from '../checkJobStatus/RenderColumn.js';
import Radio from '../../../../common/components/Radio';
import ToolBar from './toolBar';
import Sort from '../../../../common/components/SortAssets';
import TagElem from '../../../../common/components/TagElem';
import AssetGeneratorStyles from './styles/AssetGeneratorStyles.css'
class assetsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*how many columns going to display*/
            column: '',
            /* grid column count for responsive design*/
            cssGridLayout:4,
            /* how many records going to show per page*/
            limitRecords: 4,
            selectedItem:null,
            pageView : this.props.pageDetails.viewName,
            viewName : 'grid-view',
            sortValue : 0

        }
        if(this.saveSearch){
            this.saveSearch = props.saveSearch.bind(this);
        }
        this.componentWillMount = props.componentWillMount;

        if(this.handleDelete){
            this.handleDelete = props.handleDelete.bind(this);
        }
        this.onSort = this.onSort.bind(this)
    }
    componentDidMount(){
        //console.log(this.props.selectedRecord);
        //console.log('componentDidMount');

    }

    componentDidUpdate(){
        //let selectBtn = document.getElementsByClassName('selectBtn')[0];
        let selectBtn = document.getElementById('assetSelectBtn');

        if(selectBtn != undefined){
            if(!this.props.selectedRecord['nodeRef']){
                selectBtn.setAttribute('disabled',true);
            }else{
                selectBtn.removeAttribute('disabled');
            }
        }

    }
    onSelect(page, event){
        this.props.onSelect(page, event, this.state.sortValue);
    }

    // handlePageChange(page){
    //     this.props.handlePageChange(page, event, this.state.sortValue);
    // }

    changeView(view){
        this.setState({viewName:view});
        this.props.changeView(view,this.state.sortValue);
    }

    onSort(sortoption){
        this.setState({sortValue:sortoption});
        this.props.onSort(sortoption, this.state.viewName);
    }

    onChange(event){
        this.props.onChange(event,this.state.sortValue);
    }


    render() {
        let limit = this.state.limitRecords,
            dataArray,
            size,
            setSelectedItem = this.props.setSelectedItem,
            selectedRecord = this.props.selectedRecord,
            cssGridLayout = this.state.cssGridLayout,
            resultsArray = [],
            columnHeader = '',
            pageView,
            liComStyle = 'test',
            toolBar,
            sortBar,
            cssElement,
            toggleView,
            savedSearchLink= function (){return ''},
            filtersTag = function (){return ''},
            columns = ['Title', 'Type', 'Added by','Date Modified'],
            sortData = ['date uploaded (descending)',
                'date uploaded (ascending)',
                'filename descending Z-A',
                'filename ascending A-Z'],
            Filters =  [],
            difficultyLevelData = this.props.difficultLevelData
        dataArray = JSON.parse(JSON.stringify(this.props.assetsData));
        sortBar = <Sort sortOptions={sortData} value={this.props.sortIndex} change={this.onSort}/>
        toolBar = <ToolBar viewName={this.props.viewName} changeView={this.changeView.bind(this)}/>

        if(this.props.pageDetails.viewName === 'list-view' && dataArray != null){
            size = 1;
            pageView = 'list-view';
            liComStyle = 'list-width';
            const listViewTitle =  `${AssetGeneratorStyles.listViewTitle} ${this.props.isSearchLibrary ? AssetGeneratorStyles.searchListViewTitle : ''}`;
            columnHeader = (
              <div className={AssetGeneratorStyles.listViewColumn}>
                  <div className={listViewTitle}><b>Filename</b></div>
                  <div className={AssetGeneratorStyles.listViewType}><b>Type</b></div>
                  <div className={AssetGeneratorStyles.listViewAddedBy}><b>Added by</b></div>
                  <div className={AssetGeneratorStyles.listViewDateModifed}><b>Date Modifed</b></div>
              </div>
        )
        }

        let statusBar = (
            <div className={AssetGeneratorStyles.searchViewOptions}>
    <div className={AssetGeneratorStyles.peSortbox}>
    <span className='toolBar'>Sort: </span>
        <span>&nbsp;</span>{sortBar}
        </div>

        <div className={AssetGeneratorStyles.viewOptions}>
    <span className={AssetGeneratorStyles.toolBar}> View: </span>
        <span>&nbsp;</span> {toolBar}
        </div>
        </div>)

        let viewTabs;
        if(this.props.isSearchLibrary){
            let self = this;
            if(this.props.pageDetails.viewName !== 'list-view' && dataArray != null){
                size = 4;
                pageView = 'grid-view';
            }

            statusBar = (
                <div className={AssetGeneratorStyles.searchViewOptions}>
        <div className={AssetGeneratorStyles.slSortbox}>
        <span className='toolBar'>Sort: </span>
            <span>&nbsp;</span>{sortBar}
            </div>

            <div className={AssetGeneratorStyles.slOptions}>
        <span className={AssetGeneratorStyles.toolBar}> View: </span>
            <span>&nbsp;</span> {toolBar}
            </div>
            </div>)
            viewTabs = (
                <div className='row'>
                <div className={AssetGeneratorStyles.slFilterRow}>
        <div className={AssetGeneratorStyles.itemsPerPageDiv}>
        <ItemsPerPage searchValue={this.props.searchValue}
            pageView={pageView} itemsPerPageDetails={this.props.pageDetails}
            onChange={this.onChange.bind(this)}/>
        </div>
            <div className={AssetGeneratorStyles.savedSearchDiv}>
        <a href="#" onClick={self.props.saveSearch}>save search</a>
            </div>
            </div>
            <div className={AssetGeneratorStyles.statusBarDiv}>
            {statusBar}
        </div>
            </div>)

            if(difficultyLevelData.length>0){
                for(let i=0;i<difficultyLevelData.length;i++){
                    if(difficultyLevelData[i].checked === true){
                        let name = 'Difficulty Level: '+difficultyLevelData[i].name;
                        Filters.push({'id':difficultyLevelData[i].id,'name':name,
                            checked:difficultyLevelData[i].checked,schemaUrl:difficultyLevelData[i].schemaUrl});
                    }
                }
            }


        }else{ // browse Asset
            if(this.props.collapse){
                toggleView = AssetGeneratorStyles.unCollapseAsset;
            }else{
                toggleView = AssetGeneratorStyles.collapseAsset
            }
            if(this.props.pageDetails.viewName !== 'list-view' && dataArray != null){
                if(this.props.collapse){
                    size = 3;
                    cssElement = AssetGeneratorStyles.browseassetthree;
                }else{
                    size = 4;
                    cssElement = AssetGeneratorStyles.browseassetfour;
                }
                pageView = 'grid-view';
            }else if(this.props.pageDetails.viewName === 'list-view' && dataArray != null){
                if(this.props.collapse){
                    liComStyle = 'browListViewWidth';
                }else{
                    liComStyle = 'list-width';
                }
            }
            viewTabs = (
                <div className={AssetGeneratorStyles.filterTab}>
        <div className={AssetGeneratorStyles.displayBtn}>
        <ItemsPerPage searchValue={this.props.searchValue} pageView={pageView}
            itemsPerPageDetails={this.props.pageDetails}
            onChange={this.onChange.bind(this)}/>
        </div>
            <div className={cssElement}>
                {statusBar}
                </div>
                </div>
        )

        }

        while(dataArray && dataArray.length > 0)
            resultsArray.push(dataArray.splice(0, size));

        let indents = resultsArray.map(function (i) {
            return (
                <div key={i[0].nodeRef} className={AssetGeneratorStyles.assetRow}>
            <AssetsList list = {i}
            selectedRecord= {selectedRecord}
            setSelectedItem= {setSelectedItem}
            cssGridLayout = {cssGridLayout}
            pageView = {pageView}
            listViewStyle = {liComStyle}
                />
                </div>
            );
        });
        let body = (
            <div className={AssetGeneratorStyles.assetContainer+' '+toggleView}>
        {viewTabs}
    <div className={AssetGeneratorStyles.resultsContainer}>
        {columnHeader}
        {indents}
    </div>
        </div>
    );

        let empty = < div className = {AssetGeneratorStyles.alertMsg} > No results found </div>;
        return ( resultsArray.length > 0 ? body : empty );
    }
}

assetsContainer.propTypes = {
    componentWillMount: PropTypes.func,
    cssGridLayout:PropTypes.number,
    pageDetails: PropTypes.object,
    itemsPerPageDetails:PropTypes.object,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    onSort: PropTypes.func,
    saveSearch: PropTypes.func,
    changeView: PropTypes.func,
    setSelectedItem: PropTypes.func,
    selectedRecord: PropTypes.object,
    assetsData: PropTypes.array,
    products:PropTypes.string,
    tabs:PropTypes.string,
    isSearchLibrary:PropTypes.bool,
    savedSearchLink:PropTypes.func,
    handleDelete: PropTypes.func,
    difficultLevelData: PropTypes.any,
    //handlePageChange:PropTypes.func,
    searchValue:PropTypes.string,
    collapse : PropTypes.bool,
    sortIndex: PropTypes.string,
    viewName: PropTypes.string
}

module.exports = assetsContainer;

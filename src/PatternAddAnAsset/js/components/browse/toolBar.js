import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../../../../common/components/Dropdown'
import ToolBarStyles from './styles/ToolBarStyles.css'
class toolBar extends Component  {

  constructor(props) {
    super(props)
  }

  handleChange(element) {
    this.props.changeView(element);
  }

  render() {
    let views = [{
      name: 'fa fa-list',
      value: 'list-view'
    }, {
      name: 'fa fa-th',
      value: 'grid-view'
    }];
    let selectedItem
    if(this.props.viewName === 'list-view') {
      selectedItem = views[0]
    } else {
      selectedItem = views[1]
    }
    return (
        <div className={ToolBarStyles.dropdownWrapper}>
            <Dropdown
                  list={views}
                  selected={selectedItem}
                  onChange={this.handleChange.bind(this)}/>
      </div>
    )
  }
}

toolBar.propTypes = {
  changeView: PropTypes.func,
  viewName: PropTypes.string
}

module.exports = toolBar;

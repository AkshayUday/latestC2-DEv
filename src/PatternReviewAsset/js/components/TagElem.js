//"use strict";
import React from 'react';
import ReactTags from 'react-tag-autocomplete';

class TagElem extends React.Component{
    constructor(props) {
        super(props);
        this.displayName = 'TagElem';
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);

    }
   /* state= {
            tags: this.props.tags,
            suggestions: this.props.suggestions
    }*/
    handleDelete(i) {
        let tags = this.props.tags;
        tags.splice(i, 1);
    }
   handleAddition(tag) {
        let tags = this.props.tags;
        tags.push({
            id: tags.length + 1,
            name: tag.name
        });
    }
    render() {

        return (
            <ReactTags
            delimiters={[13, 9]}
                tags={this.props.tags}
                suggestions={this.props.suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleInputChange={this.handleInputChange} />
        )
    }
};

TagElem.propTypes = {
  tags: React.PropTypes.array,
  suggestions: React.PropTypes.array
}

module.exports = TagElem;

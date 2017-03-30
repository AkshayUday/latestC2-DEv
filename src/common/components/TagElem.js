/**
 * Copyright (c) Pearson, Inc.
 * All rights reserved.
 *
 * It is a TagElem component.
 * This component operates as a "Controller-View".
 *
 * @module QuestionMetadata
 * @file TagElem - It is a TagElem component.
 * @author 547305
 *
 */
import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import styles from './styles/PL_TagElem.css';
/**
 * @augments React.Component
*/
class TagElem extends React.Component{
/**
 *  @param {object} props - The propery object.
 *  @param  {function}  props.handleDelete - This function is used to handle delete operation for tags.
 *  @param  {function}  props.handleAddition - This function is used to handle Add operation for tags.
*/
    constructor(props) {
        super(props);
/**
 * The displayName TagElem.
 * @type {string}
 */     
        this.state = {
                tags : this.props.tags
            }
        this.displayName = 'TagElem';
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

/**
 * This function is used to handle delete operation for tags.
 * @param {number} i- Index
*/
    handleDelete(i) {
        let tags = this.props.tags;
        let deleteData = tags[i];
        tags.splice(i, 1);
        if(this.props.handleDelete){
            this.props.handleDelete(deleteData);
        }
        this.setState({tags:tags});
        this.props.update(tags);
    }
/**
 * This function is used to handle Add operation for tags.
 * @param {object} tag-Whatever entered by the user
*/
   handleAddition(tag) { 
        let tags = this.props.tags;
        tags.push({
            id: tags.length + 1,
            name: tag.name
        });

        this.setState({tags:tags});
        this.props.update(tags);
    }
/**
 * Renders the component.
 * When called, it should examine this.props and this.state and return a single child element.
 * @returns {string}
 * HTML markup for the component
*/
    render() { 
        let tagStyles = {
            root: styles.ReactTags,
            selected: styles.ReactTags__selected,
            tag: styles.reactTags__tag,
            tagInput: styles.ReactTags__tagInput,
            suggestions: styles.ReactTags__suggestions,
            suggestionActive: styles.isActive,
            suggestionDisabled: styles.isDisabled
        }
        return (
            <ReactTags
                tags={this.props.tags}
                suggestions={this.props.suggestions}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleInputChange={this.handleInputChange} allowNew
                placeholder = "Add a tag and press enter"
                classNames={tagStyles}/>
        )
    }
};
TagElem.propTypes= {
        tags:React.PropTypes.array,
        suggestions:React.PropTypes.array,
        handleDelete:React.PropTypes.func,
        update:React.PropTypes.func
    }
TagElem.defaultProps ={
        tags:[],
        suggestions:[]
    }
module.exports = TagElem;

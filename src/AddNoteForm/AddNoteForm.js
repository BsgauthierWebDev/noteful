import React, {Component} from 'react';
import NotefulError from '../NotefulError';
import ValidationError from '../ValidationError';
import ApiContext from '../ApiContext';
import config from '../config';
import './AddNoteForm.css';
import FolderOptions from '../FolderOptions';
import moment from 'moment';

class AddNoteForm extends Component {
    static contextType = ApiContext;
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: " ",
                touched: false
            },
            modified: " ",
            content: {
                value: " ",
                touched: false
            },
            folderId: {
                value: " ",
                touched: false
            }
        };
    }

    updateName(name, modified) {
        this.setState({name: {value: name, touched: true}});
        this.updateModified(modified);
    }

    updateModified(modified) {
        this.setState({modified: modified});
    }

    updateContent(content, modified) {
        this.setState({content: {value: content, touched: true}});
        this.updateModified(modified);
    }

    updateFolderId = (folderId) => {
        this.setState({folderId: {value: folderId, touched: true}});
    }

    handleSubmit(event) {
        event.preventDefault();
        const note = {
            name: this.state.name.value,
            modified: this.state.modified,
            content: this.state.content.value,
            folderId: this.state.folderId.value
        }
            this.context.addNote(note)
            this.props.history.push('/')
    }

    timeStamp() {
        moment().toDate()
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        }
        else if (name.length < 3) {
            return 'Name must be at least three characters'
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return 'Content is required for note creation'
        }
    }

    validateFolderId() {
        const folderOption = this.state.folderId.value;
        if (folderOption === null) {
            return 'Picking a folder is required'
        }
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const folderIdError = this.validateFolderId();
        const modified = moment().toDate();

        return (
            <>
            <form className = 'addNoteForm' onSubmit = {e => this.handleSubmit(e)}>
                <NotefulError>
                <h2>Add a new note</h2>
                <div className = 'addNoteForm__input'>* fields are required</div>
                <label htmlFor = 'nameInput'>Name: </label>
                <input 
                    type = 'text' 
                    className = 'addNoteForm__name'
                    name = 'name' 
                    id = 'name'
                    onChange = {e => this.updateName(e.target.value, modified)} />
                    {this.state.name.touched && (
                        <ValidationError message = {nameError} />
                    )}
                <label htmlFor = 'contentInput'>Content: </label>
                <input 
                    type = 'text' 
                    className = 'addNoteForm__content'
                    name = 'content' 
                    id = 'noteContent'
                    onChange = {e => this.updateContent(e.target.value, modified)} />
                    {this.state.name.touched && (
                        <ValidationError message = {contentError}/>
                    )}
                <label htmlFor = 'folderInput'>Choose a Folder: </label>
                <FolderOptions
                    updateFolderId = {this.updateFolderId}/>
                    {this.state.folderId.touched && (
                        <ValidationError folderIdError = {folderIdError}/>
                    )}
                <button type = 'submit' className = 'addNoteForm__button'>
                    Save
                </button>
                </NotefulError>
            </form>
            </>
        )
    }
}

export default AddNoteForm;
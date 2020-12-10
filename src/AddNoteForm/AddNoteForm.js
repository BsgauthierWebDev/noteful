import React, {Component} from 'react';
import './AddNoteForm.css';

class AddNoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: " ",
                touched: false
            },
            content: {
                value: " ",
                touched: false
            },
            folder: {
                value: " ",
                touched: false
            }
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        const {name} = this.state;
        const {content} = this.state;
        const {folder} = this.state;

        console.log('Name: ', name.value);
        console.log('Content: ', content.value);
        console.log('Folder: ', folder.value);
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    };

    render() {
        return (
            <form className = 'addNoteForm' onSubmit = {e => this.handleSubmit(e)}>
                <h2>Add a new note</h2>
                <div className = 'addNoteForm__input'>
                    <label htmlFor = 'name'>Name: </label>
                    <input type = 'text' className = 'addNoteForm__name'
                    name = 'name' id = 'name' />
                </div>
                <div className = 'addNoteForm__input'>
                    <label htmlFor = 'name'>Content: </label>
                    <input type = 'text' className = 'content'
                    name = 'name' id = 'name' />
                </div>
                <div className = 'addNoteForm__input'>
                    <label htmlFor = 'name'>Folder: </label>
                    <input type = 'text' className = 'folder'
                    name = 'name' id = 'name' />
                </div>
                <div className = 'addNoteForm__buttons'>
                    <button type = 'button' className = 'addNoteForm__button'onClick = {this.handleClickCancel}>
                        Cancel
                    </button>
                    <button type = 'submit' className = 'addNoteForm__button'>
                        Save
                    </button>
                </div>
            </form>
        )
    }
}

export default AddNoteForm;
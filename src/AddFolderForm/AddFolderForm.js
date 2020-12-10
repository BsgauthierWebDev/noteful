import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import './AddFolderForm.css';
import ApiContext from '../ApiContext';

function AddFolderForm() {
    const {addFolder = () => {}} = useContext(ApiContext)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        const {name} = this.state;
        console.log('Name: ', name.value);
        addFolder(e.target.folder.value)
    }

    return (
        <>
        <form className = 'addFolderForm' onSubmit = {e => this.handleSubmit(e)}>
            <h2>Add a new folder</h2>
            <div className = 'addFolderForm__input'>
                <label htmlFor = 'name'>Name: </label>
                <input 
                    type = 'text' 
                    className = 'addFolderForm__name'
                    name = 'name' 
                    id = 'name'
                    placeholder = 'folder name'
                    required />
            </div>
            <div className = 'addFolderForm__buttons'>
                <button type = 'submit' className = 'addFolderForm__button'>
                    Save
                </button>
            </div>
        </form>
            <div className = 'addFolderForm__cancel'>
                <button type = 'button' className = 'addFolderForm__button'onClick = {() => history.goBack()}>
                    Cancel
                </button>
            </div>
        </>
    )
}

export default AddFolderForm;
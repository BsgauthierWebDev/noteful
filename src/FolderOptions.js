import React from 'react';
import ApiContext from './ApiContext';
import './FolderOptions.css';

class FolderOptions extends React.Component {
    static contextType = ApiContext;

    render() {
        const {folders = []} = this.context;
        return (
            <select
                className = 'folderDropdown'
                onChange = {e => this.props.updateFolderId(e.target.value)}
                required>
                    <option value = "" >Select a Folder</option>
                    {folders.map(folder =>
                        <option
                            key = {folder.id}
                            value = {folder.id}
                            className = 'folderOption'>
                                {folder.name}
                        </option>
                        )}
                </select>
        )
    }
}

export default FolderOptions;
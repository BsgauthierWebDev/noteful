import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/api/notes`),
            fetch(`${config.API_ENDPOINT}/api/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
        console.log(this.state.notes)
    };

    addFolder = folderName => {
		fetch(`${config.API_ENDPOINT}/api/folders`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: folderName })
		})
			.then(res => res.json())
			.then(resJSON => {
                console.log(resJSON)
                const newFolders = [...this.state.folders, resJSON]
                console.log(newFolders)
                this.setState({ folders: newFolders })
                console.log(this.state)

				this.props.history.push('/')
			})
			.catch(err => {
				console.log(err)
			})
    }
    
    addNote = noteData => {
        fetch(`${config.API_ENDPOINT}/api/notes`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        })
            .then(res => res.json())
            .then(resJSON => {
                console.log(resJSON)
                const newNotes = [...this.state.notes, resJSON]
                console.log(newNotes)
                this.setState({notes: newNotes})
                console.log(this.state)

                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/api/folders/:id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/api/notes/:noteId" component={NotePageNav} />
                <Route path="/api/add-folder" component={AddFolder} />
                <Route path="/api/add-note" component={AddNote} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/api/folders/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/api/notes/:noteId" component={NotePageMain} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.addFolder,
            addNote: this.addNote
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

App.defaultProps = {
    folders: [],
    content: "",
    name: "",
    error: null
  }
  
App.propTypes = {
folders: PropTypes.array,
name: PropTypes.string.isRequired,
id: PropTypes.string,
content: PropTypes.string.isRequired,
modified: PropTypes.string
}

export default App;
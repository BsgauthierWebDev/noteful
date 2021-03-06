import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import PropTypes from 'prop-types'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = notes.find( note => note.id == noteId)
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
          history={this.props.history}

        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

NotePageMain.defaultProps = {
  folders: [],
  content: "",
  name: "",
  error: null
}

NotePageMain.propTypes = {
  folders: PropTypes.array,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  content: PropTypes.string.isRequired,
  modified: PropTypes.string
}
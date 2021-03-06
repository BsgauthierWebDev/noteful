import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types';

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
    history: {
      push: () => {}
    },
  }
  static contextType = ApiContext;

  handleClickDelete = (e) => {
    e.preventDefault()
    const noteId = this.props.id
    console.log(noteId)

    fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(() => {
        console.log('Deleting the note')
        this.props.history.push('/')
        this.context.deleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props
    if (!this.props.id) {
      return <Redirect to = '/' />
    }
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/api/notes/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(new Date(modified), 'MMM dd,yyyy')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

Note.defaultProps = {
  folders: [],
  content: "",
  name: "",
  error: null
}

Note.propTypes = {
  folders: PropTypes.array,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  content: PropTypes.string.isRequired,
  modified: PropTypes.string
}
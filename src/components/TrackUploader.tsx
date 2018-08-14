import * as React from 'react';
import trackRepository from '../repositories/trackRepository';
import fileMetadataService from '../services/fileMetadata';

function TrackUploaderForm(props) {
  const { onFileChange, onFieldChange, formValue, onSubmit } = props;
  return (
    <div className="section">
      <form className="container" onSubmit={onSubmit}>
        <div className="field">
          <label className="control" htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            className="input"
            value={formValue.title}
            onChange={onFieldChange('title')}
          />
        </div>
        <div className="field">
          <label className="control" htmlFor="title">Artist: </label>
          <input
            type="text"
            name="artist"
            id="artist"
            className="input"
            value={formValue.artish}
            onChange={onFieldChange('artist')}
          />
        </div>
        <div className="field">
          <label className="control" htmlFor="title">Album: </label>
          <input
            type="text"
            name="album"
            id="album"
            className="input"
            value={formValue.album}
            onChange={onFieldChange('album')}
          />
        </div>
        <div className="field">
          <div className="file has-name">
            <label className="file-label">
              <input className="file-input" type="file" name="track" onChange={onFileChange} />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Choose a file…
                </span>
              </span>
              {
                formValue.file &&
                <span className="file-name">
                  {formValue.file.name}
                </span>
              }
            </label>
          </div>
        </div>
        <div className="has-text-centered">
          <button className="button is-primary">Upload</button>
        </div>
      </form>
    </div>
  )
}

class TrackUploader extends React.Component {
  state = {
    title: '',
    artist: '',
    album: '',
    file: null
  }

  onFieldChange = type => ({ target }) => {
    this.setState({
      [type]: target.value
    })
  }

  onFileChange = ({ target }) => {
    this.setState({ file: target.files[0] });
  }

  onSubmit = async e => {
    e.preventDefault();
    const { file, ...trackMetadata } = this.state;
    const { duration } = await fileMetadataService.byAudio(file);

    const trackInfo = {
      ...trackMetadata,
      duration,
      file
    }

    trackRepository.addTrack(trackInfo);
  }

  render() {
    return <TrackUploaderForm
      onFileChange={this.onFileChange}
      formValue={this.state}
      onFieldChange={this.onFieldChange}
      onSubmit={this.onSubmit}
    />
  }
}

export default TrackUploader;
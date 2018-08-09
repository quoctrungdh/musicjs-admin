import * as React from 'react';
import trackRepository from '../repositories/trackRepository';

function TrackUploaderForm(props) {
  const { onFileChange, onFieldChange, formValue, onSubmit } = props;
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formValue.title}
          onChange={onFieldChange('title')}
        />
      </div>
      <input type="file" name="track" onChange={onFileChange} />
      <div>
        <button>Upload</button>
      </div>
    </form>
  )
}

class TrackUploader extends React.Component {
  state = {
    title: '',
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

  onSubmit = e => {
    e.preventDefault();
    const { title, file } = this.state;
    const trackInfo = {
      title,
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
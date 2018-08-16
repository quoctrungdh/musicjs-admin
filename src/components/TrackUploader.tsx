import * as React from 'react';
import trackRepository from '../repositories/trackRepository';
import fileMetadataService from '../services/fileMetadata';

import Button from '../components/base/Button';

function Label({ text }) {
  return (
    <label className="block text-grey-darker font-bold md:text-right mb-1 md:mb-0 pr-4">{text}</label>
  )
}

function Input(props) {
  const { type, id, value, onChange } = props;

  return (
    <input
      type={type}
      id={id}
      className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
      value={value}
      onChange={onChange}
    />
  )
}

function TrackUploaderForm(props) {
  const { onFileChange, onFieldChange, formValue, onSubmit } = props;
  return (
    <form className="w-full" onSubmit={onSubmit}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <Label text="Title: " />
        </div>
        <div className="md:w-3/4">
          <Input
            type="text"
            id="title"
            value={formValue.title}
            onChange={onFieldChange('title')}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <Label text="Artist: " />
        </div>
        <div className="md:w-3/4">
          <Input
            type="text"
            id="artist"
            value={formValue.artish}
            onChange={onFieldChange('artist')}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/4">
          <Label text="Album: " />
        </div>
        <div className="md:w-3/4">
          <Input
            type="text"
            id="album"
            value={formValue.album}
            onChange={onFieldChange('album')}
          />
        </div>
      </div>
      <div className="text-center mb-4">
        <div className="inline-block relative overflow-hidden">
          <button className="bg-transparent hover:bg-purple text-purple-dark font-semibold hover:text-white py-2 px-4 border border-purple hover:border-transparent rounded">
            Select file
          </button>
          <input className="cursor-pointer absolute block opacity-0 pin-r pin-t pin-l pin-b" type="file"  onChange={onFileChange} name="track" />
          {
            formValue.file &&
            <p className="file-name">
              {formValue.file.name}
            </p>
          }
        </div>
      </div>
      <div className="text-center">
        <Button>
          <svg className="fill-current mr-2" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
          </svg>
            Upload
        </Button>
      </div>
    </form>
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
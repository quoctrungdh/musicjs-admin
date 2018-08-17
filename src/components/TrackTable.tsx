import * as React from 'react';

import trackRepository from '../repositories/trackRepository';
import Button from '../components/base/Button';
import { ModalConsumer } from '../components/Modal';
import TrackUploader from '../components/TrackUploader';


function AddTrackBtn() {
  return (
    <ModalConsumer>
      {({ showModal }) => (
        <Button onClick={() => showModal(TrackUploader)}>
          Add
        </Button>
      )}
    </ModalConsumer>
  )
}

export default class TrackTable extends React.Component {
  private unsub: Function;

  state = {
    tracks: []
  }

  componentDidMount() {
    this.unsub = trackRepository.subscribe(this.handleListChange)
  }

  handleListChange = (tracks) => {
    this.setState({
      tracks
    })
  }

  render() {
    const { tracks } = this.state;
    return (
      <div>
        <div className="border-t border-b border-grey-light overflow-hidden relative">
          <table className="w-full text-left table-collapse">
            <thead>
              <tr>
                <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Track</th>
                <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Artist</th>
                <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Album</th>
                <th className="text-sm font-semibold text-grey-darker p-2 bg-grey-lightest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                tracks.map(track => (
                  <tr>
                    <td className="p-2 border-t border-grey-light font-mono text-xs text-purple-dark whitespace-no-wrap">{track.title}</td>
                    <td className="p-2 border-t border-grey-light font-mono text-xs text-purple-dark whitespace-no-wrap">{track.artist}</td>
                    <td className="p-2 border-t border-grey-light font-mono text-xs text-purple-dark whitespace-no-wrap">{track.album}</td>
                    <td className="p-2 border-t border-grey-light font-mono text-xs text-purple-dark whitespace-no-wrap">
                      <span>Edit</span>
                      <span>Delete</span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <AddTrackBtn />
        </div>
      </div>
    )
  }
}
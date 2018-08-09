import DatabaseService from '../services/database';
import uploaderService from '../services/uploader';

interface ITrackRepository {
  getTracks(): void;
  addTrack(trackInfo: {}): Promise<{}>;
  getTrack(): void;
  editTrack(): void;
  removeTrack(): void;
  subscribe(fn: Function): Function;
}

class TrackRepository implements ITrackRepository {
  private _db;
  private _uploader;

  constructor(db, uploader) {
    this._db = db;
    this._uploader = uploader;
  }

  public subscribe(cb: Function) {
    return this._db.subscribe(cb);
  }

  public getTracks() {
    return this._db.getAll();
  }

  public async addTrack(trackInfo): Promise<{}> {
    try {
      const { title, file } = trackInfo;

      const downloadUrl = await this._uploader.upload(file);
      const uploadedTrackInfo = { title, downloadUrl };

      return this._db.add(uploadedTrackInfo);
    } catch (error) {
      throw error;
    }
  }

  public getTrack() {

  }

  public editTrack() {

  }

  public removeTrack() {

  }
}

export default new TrackRepository(
  new DatabaseService('tracks'),
  uploaderService
);

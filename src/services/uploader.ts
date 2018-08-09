import { storage } from '../utils/firebase';

export interface IUploader {
  upload({}): void;
  delete(): void;
}

class FirebaseStorage implements IUploader {
  private _storageRef;

  constructor(storageRef) {
    this._storageRef = storageRef;
  }

  public upload(file) {
    return new Promise((resolve, reject) => {
      const uploadTask  = this._storageRef.child(`tracks/${file.name}`).put(file);

      uploadTask.on('state_changed', (snapshot) => {
        // observe progress, pause, resume
        const { bytesTransferred, totalBytes } = snapshot;
        const percentage = Math.round(bytesTransferred / totalBytes * 100);
        console.log('Uploading...', `(${percentage}%)`)
      }, (error) => {
        // handle errors
        reject(error)
      }, () => {
        // handle success
        uploadTask.snapshot.ref.getDownloadURL()
          .then((downloadUrl) => {
            console.log('Uploaded!', downloadUrl)
            resolve(downloadUrl)
          })
      })
    })
  }

  public delete() {

  }
}

export default new FirebaseStorage(storage.ref())
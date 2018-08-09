import { firestore } from '../utils/firebase';

export interface IDatabase {
  getAll(): void;
  get(): void;
  add({}): void;
  edit(): void;
  delete(): void;
  subscribe(Function): void;
}

class FirebaseFirestore implements IDatabase {
  private db;

  constructor(collection) {
    this.db = firestore.collection(collection)
  }

  public subscribe(cb) {
    return this.db.onSnapshot(querySnapshot => {
      const res = querySnapshot.docs.map(i => i.data())
      cb(res)
    })
  }

  public getAll() {
    return this.db.get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(i => i.data())
      })
  }

  public get() {

  }

  public add(trackInfo) {
    return this.db.add(trackInfo);
  }

  public edit() {

  }

  public delete() {

  }
}

export default FirebaseFirestore;

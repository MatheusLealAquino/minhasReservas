const Datastore = require('nedb');

const db = new Datastore({ filename: './reservations.db', autoload: true });

async function createReservation(reservation) {
  return new Promise((resolve, reject) => db.insert(reservation, (err, newDoc) => {
    if (err) reject(err);
    resolve(newDoc);
  }));
}

async function getReservations() {
  return new Promise((resolve, reject) => db.find({}, (err, newDoc) => {
    if (err) reject(err);
    resolve(newDoc);
  }));
}

export default {
  createReservation,
  getReservations,
};

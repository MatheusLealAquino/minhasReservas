const Datastore = require('nedb');

const db = new Datastore({ filename: './reservations.db', autoload: true });

async function createReservation(reservation) {
  return new Promise((resolve, reject) => db.insert({
    ...reservation,
    createdAt: new Date(),
  }, (err, newDoc) => {
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

async function getReservation(_id) {
  return new Promise((resolve, reject) => db.find({ _id }, (err, newDoc) => {
    if (err) reject(err);
    resolve(newDoc);
  }));
}

async function updateReservation(_id, data) {
  return new Promise((resolve, reject) => db.update({ _id }, {
    $set: {
      ...data,
      updatedAt: new Date(),
    },
  }, (err, numReplaced) => {
    if (err) reject(err);
    resolve(numReplaced);
  }));
}

async function removeReservation(_id) {
  return new Promise((resolve, reject) => db.remove({ _id }, (err, numRemoved) => {
    if (err) reject(err);
    resolve(numRemoved);
  }));
}

export default {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  removeReservation,
};

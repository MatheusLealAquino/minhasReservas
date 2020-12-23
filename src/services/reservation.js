import reservationDao from '../daos/reservation';

async function getReservations() {
  return reservationDao.getReservations();
}

async function createReservation(reservation) {
  return reservationDao.createReservation(reservation);
}

export default {
  getReservations,
  createReservation,
};

import reservationService from '../../services/reservation';

export async function save(context, reservation) {
  return reservationService.createReservation(reservation);
}

export async function find(context, reservationId) {
  if (!reservationId) {
    return reservationService.getReservations();
  }
  return [];
}

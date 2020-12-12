<template>
  <q-page class="q-pa-md">
    <div class="container q-mb-md">
        <q-card class="my-card">
          <q-card-section v-if="showSkeleton">
            <q-skeleton type="text" />
            <q-skeleton type="text" />
          </q-card-section>
          <q-card-section v-else>
            <div class="text-body1 text-weight-bolder">
              Status {{ totalReservations > 1 ? 'das  reservas' : 'da reserva' }}:
            </div>
            <div class="text-h6">Total: R$ {{ total }}</div>
            <div class="text-subtitle1">Quantidade de reservas: {{ totalReservations }}</div>
          </q-card-section>
        </q-card>
    </div>

    <div class="row items-start q-gutter-md">
      <q-intersection
        v-for="(reservation, index) in reservations"
        :key="index"
        transition="scale"
      >
        <Reservation
          :showSkeleton="showSkeleton"
          :identification="reservation._id"
          :name="reservation.name"
          :image="reservation.image"
          :accumulated="reservation.accumulated"
          :goal="reservation.goal"
          :mothlyContribution="reservation.mothlyContribution"
          :account="reservation.account"
          :createdAt="reservation.createdAt"
        />
      </q-intersection>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        size="lg"
        color="green"
        icon="account_balance"
        :to="{ name: 'reservations-create' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import Reservation from '../components/reservations/Reservation';

export default {
  name: 'PageIndex',
  data: () => ({
    showSkeleton: true,
  }),
  components: {
    Reservation,
  },
  computed: {
    reservations() {
      return [
        {
          _id: '1',
          name: 'Aposentadoria',
          accumulated: 7000.00,
          goal: 1000000.00,
          mothlyContribution: 500,
          account: 'Nubank',
          createdAt: new Date('2020-12-07 22:00:00'),
          updatedAt: new Date('2020-12-07'),
          image: '../images/background/default.jpg',
        },
        {
          _id: '2',
          name: 'Carro',
          accumulated: 7000.00,
          goal: 20000.00,
          mothlyContribution: 300,
          account: 'Nubank',
          createdAt: new Date('2020-12-07 00:00:00'),
          updatedAt: new Date('2020-12-07'),
          image: '../images/background/default.jpg',
        },
      ];
    },
    totalReservations() {
      return this.reservations.length;
    },
    total() {
      return this.reservations.reduce((acc, value) => acc.accumulated + value.accumulated);
    },
  },
  mounted() {
    setTimeout(() => {
      this.showSkeleton = false;
    }, 1000);
  },
};
</script>

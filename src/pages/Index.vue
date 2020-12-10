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
              Status {{ reservations.length > 1 ? 'das  reservas' : 'da reserva' }}:
            </div>
            <div class="text-h6">Total: R$ {{ total }}</div>
            <div class="text-subtitle1">Quantidade de reservas: {{ reservations.length }}</div>
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
          :reservation="reservation"
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
          _id: 1,
          picture: '',
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
          _id: 2,
          picture: '',
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
    total() {
      return this.reservations.reduce((acc, value) => acc.accumulated + value.accumulated);
    },
  },
  mounted() {
    setTimeout(() => {
      this.showSkeleton = false;
    }, 1500);
  },
};
</script>

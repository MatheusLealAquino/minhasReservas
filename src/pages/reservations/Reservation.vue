<template>
  <q-page class="q-pa-md q-gutter-md">
    <q-skeleton v-if="showSkeleton" type="text" />
    <div v-else class="text-h5">{{ reservation.name }}</div>

    <Reservation
      :openPage="false"
      :showSkeleton="showSkeleton"
      :identification="reservation._id"
      :image="reservation.image"
      :accumulated="reservation.accumulated"
      :goal="reservation.goal"
      :mothlyContribution="reservation.mothlyContribution"
      :account="reservation.account"
      :createdAt="reservation.createdAt"
    />

    <Operations
      v-if="operations && operations.length > 0"
      :showSkeleton="showSkeleton"
      :operations="operations"
    />

    <div>
      <q-skeleton v-if="showSkeleton" type="QBtn" />
      <q-btn
        v-else
        label="Voltar"
        :to="{name: 'index'}"
        class="full-width"
        type="reset"
        color="black"
        outline
      />
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        size="lg"
        color="green"
        icon="monetization_on"
        :to="{ name: 'reservations-operation' }"
      />
    </q-page-sticky>

    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn
        round
        size="sm"
        color="grey-5"
        icon="settings"
        :to="{ name: 'reservations-configuration' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import reservationDao from '../../daos/reservation';
import Operations from '../../components/reservations/Operations.vue';
import Reservation from '../../components/reservations/Reservation';

export default {
  name: 'ReservationPage',
  data: () => ({
    showSkeleton: true,
  }),
  components: {
    Reservation,
    Operations,
  },
  computed: {
    operations() {
      return this.reservation
        && this.reservation.operations
        ? this.reservation.operations : [];
      // return [
      //   {
      //     type: 'sub',
      //     value: 200.00,
      //     date: new Date(),
      //   },
      //   {
      //     type: 'add',
      //     value: 500.00,
      //     date: new Date(),
      //   },
      // ];
    },
  },
  async mounted() {
    setTimeout(() => {
      this.showSkeleton = false;
    }, 600);

    [this.reservation] = await reservationDao.getReservation(this.$route.params.id);
  },
};
</script>

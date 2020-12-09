<template>
    <q-card class="my-card">
      <q-skeleton width="92vw" height="150px" v-if="showSkeleton" />
      <img v-else width="95vw" height="250px" :src="reservation.image">

      <q-card-section v-if="showSkeleton">
        <q-skeleton type="text" />
        <q-skeleton type="text" />
        <q-skeleton type="text" />
        <q-skeleton type="text" />
        <q-skeleton type="text" />
      </q-card-section>

      <q-card-section v-else>
        <div class="text-h6">{{ reservation.name }}</div>
        <div class="text-subtitle2">Acumulado: R$ {{ reservation.accumulated }}</div>
        <div>Meta: R$ {{ reservation.goal }}</div>
        <div>Aporte mensal: R$ {{ reservation.mothlyContribution }}</div>
        <div>Banco: {{ reservation.account }}</div>
      </q-card-section>
    </q-card>
</template>

<script>
export default {
  name: 'Reservation',
  props: {
    showSkeleton: {
      default: true,
    },
    reservation: {
      type: Object,
    },
  },
  data: () => ({
  }),
};
</script>

<template>
  <q-card class="my-card" @click="goToReservation">
    <q-skeleton width="92vw" height="150px" v-if="showSkeleton" />
    <img v-else width="95vw" height="250px" :src="image">

    <q-card-section v-if="showSkeleton">
      <q-skeleton type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
    </q-card-section>

    <q-card-section v-else>
      <div v-if="name" class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">Acumulado: R$ {{ accumulated }}</div>
      <div>Meta: R$ {{ goal }}</div>
      <div>Aporte mensal: R$ {{ mothlyContribution }}</div>
      <div>Banco: {{ account }}</div>
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
    identification: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    accumulated: {
      type: Number,
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    },
    mothlyContribution: {
      type: Number,
      required: true,
    },
    account: {
      type: String,
      required: true,
    },
    openPage: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
  }),
  methods: {
    goToReservation() {
      if (this.identification && this.openPage) {
        this.$router.push({ name: 'reservations-reservation', params: { id: this.identification } });
      }
    },
  },
};
</script>

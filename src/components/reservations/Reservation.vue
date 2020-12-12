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
      <q-skeleton type="text" />
    </q-card-section>

    <q-card-section v-else>
      <div v-if="name" class="text-h6">{{ name }}</div>
      <div v-if="accumulated" class="text-subtitle2">Acumulado: {{ moneyFilter(accumulated) }}</div>
      <div v-if="goal">Meta: {{ moneyFilter(goal) }}</div>
      <div v-if="mothlyContribution">Aporte mensal: {{ moneyFilter(mothlyContribution) }}</div>
      <div v-if="account">Banco: {{ account }}</div>
      <div v-if="createdAt" class="text-caption">Criação: {{ convertDate(createdAt) }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
import stringMixin from '../../mixins/string';
import dateMixin from '../../mixins/date';

export default {
  name: 'Reservation',
  mixins: [stringMixin, dateMixin],
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
    createdAt: {
      type: Date,
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

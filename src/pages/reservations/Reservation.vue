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
        icon="account_balance"
        :to="{ name: 'reservations-create' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
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
    reservation() {
      return {
        _id: '1',
        name: 'Aposentadoria',
        accumulated: 7000.00,
        goal: 1000000.00,
        mothlyContribution: 500,
        account: 'Nubank',
        createdAt: new Date('2020-12-07 22:00:00'),
        updatedAt: new Date('2020-12-07'),
        image: '../images/background/default.jpg',
      };
    },
    operations() {
      return [
        {
          type: 'sub',
          value: 200.00,
          date: new Date(),
        },
        {
          type: 'add',
          value: 500.00,
          date: new Date(),
        },
      ];
    },
  },
  mounted() {
    setTimeout(() => {
      this.showSkeleton = false;
    }, 1000);
  },
};
</script>

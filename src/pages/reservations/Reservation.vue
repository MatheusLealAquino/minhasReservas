<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="text-h5">{{ reservation.name }}</div>
    <Reservation
      :showSkeleton="showSkeleton"
      :openPage="false"
      :identification="reservation._id"
      :image="reservation.image"
      :accumulated="reservation.accumulated"
      :goal="reservation.goal"
      :mothlyContribution="reservation.mothlyContribution"
      :account="reservation.account"
    />

    <div>
      <div class="text-subtitle1">Operações: </div>
      <q-list bordered separator>
        <div v-if="!showSkeleton">
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label overline>Retirada</q-item-label>
              <q-item-label>R$ 80,00</q-item-label>
              <q-item-label caption>10 nov</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label overline>Deposito</q-item-label>
              <q-item-label>R$ 100,00</q-item-label>
              <q-item-label caption>10 nov</q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <div v-else>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-skeleton type="text" />
              <q-skeleton type="text" />
              <q-skeleton type="text" />
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div>

    <div>
      <q-btn
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
import Reservation from '../../components/reservations/Reservation';

export default {
  name: 'ReservationPage',
  data: () => ({
    showSkeleton: true,
  }),
  components: {
    Reservation,
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
  },
  mounted() {
    setTimeout(() => {
      this.showSkeleton = false;
    }, 1000);
  },
};
</script>

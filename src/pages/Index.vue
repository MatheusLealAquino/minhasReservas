<template>
  <q-page class="q-pa-md">
    <div class="row items-start q-gutter-md">
      <div class="col" v-for="reservation in reservations" :key="reservation.createdAt.getTime()">
        <q-card class="my-card">
          <img width="10%" height="10%" src="https://cdn.quasar.dev/img/mountains.jpg">

          <q-card-section>
            <div class="text-h6">{{ reservation.name }}</div>
            <div class="text-subtitle2">Acumulado: R$ {{ reservation.accumulated }}</div>
            <div>Meta: R$ {{ reservation.goal }}</div>
            <div>Contribuição mensal estimada: R$ {{ reservation.mothlyContribution }}</div>
            <div>Banco: {{ reservation.account }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data: () => ({
  }),
  computed: {
    reservations() {
      return [
        {
          picture: '',
          name: 'Aposentadoria',
          accumulated: '7000,00',
          goal: '1.000.000,00',
          mothlyContribution: '500',
          account: 'Nubank',
          createdAt: new Date('2020-12-07 22:00:00'),
          updatedAt: new Date('2020-12-07'),
        },
        {
          picture: '',
          name: 'Carro',
          accumulated: '7000,00',
          goal: '1.000.000,00',
          mothlyContribution: '300',
          account: 'Nubank',
          createdAt: new Date('2020-12-07 00:00:00'),
          updatedAt: new Date('2020-12-07'),
        },
      ];
    },
  },
};
</script>

<template>
  <q-page class="q-gutter-md">
    <q-tabs
      v-model="tab"
      dense
      align="justify"
      class="bg-light-green-8 text-white shadow-2 q-pt-md"
      :breakpoint="0"
    >
      <q-tab name="add" label="Depositar" icon="attach_money" />
      <q-tab name="sub" label="Retirar" icon="money_off" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="add">
        <div class="text-h6">Depositar</div>
        <q-form @submit="add" class="q-gutter-md">
          <q-input
            v-model.number="addValue"
            filled
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            hint="Digite o valor depositado"
          />

          <q-input filled v-model="addDate" mask="date" hint="Data da operação">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="addDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <div>
            <q-btn
              label="Salvar"
              class="full-width"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-tab-panel>

      <q-tab-panel name="sub">
        <div class="text-h6">Retirar</div>
        <q-form @submit="sub" class="q-gutter-md">
          <q-input
            v-model.number="subValue"
            filled
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            hint="Digite o valor retirado"
          />

          <q-input filled v-model="subDate" mask="date" hint="Data da operação">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="subDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <div>
            <q-btn
              label="Salvar"
              class="full-width"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-tab-panel>
    </q-tab-panels>

    <div class="q-pa-md">
      <q-skeleton v-if="showSkeleton" type="QBtn" />
      <q-btn
        label="Voltar"
        :to="{
          name: 'reservations-reservation',
          params: { id: this.reservation._id }
        }"
        class="full-width"
        type="reset"
        color="black"
        outline
      />
    </div>
  </q-page>
</template>

<script>
import reservationDao from '../../daos/reservation';
import stringMixin from '../../mixins/string';
import dateMixin from '../../mixins/date';

export default {
  name: 'OperationPage',
  mixins: [stringMixin, dateMixin],
  data: () => ({
    showSkeleton: false,
    tab: 'add',
    addValue: null,
    addDate: null,
    subValue: null,
    subDate: null,
    rules: [
      (val) => (val && val > 0) || 'Por favor, digite um valor positivo',
    ],
  }),
  methods: {
    async action(type, value, date) {
      try {
        let { accumulated } = this.reservation;
        const { operations } = this.reservation;
        const updateOperations = operations || [];

        accumulated = Number(accumulated);
        if (type === 'add') accumulated += Number(value);
        else accumulated -= Number(value);

        updateOperations.push({
          type,
          value: Number(value),
          date,
        });

        await reservationDao.updateReservation(this.reservation._id,
          {
            accumulated,
            operations: updateOperations,
          });

        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          actions: [{ icon: 'close', color: 'white' }],
          message: 'Operação realizada com sucesso!',
        });

        this.$router.push({ name: 'reservations-reservation', params: { id: this.reservation._id } });
      } catch (err) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          actions: [{ icon: 'close', color: 'white' }],
          message: 'Erro ao realizar esta operação, verifique as informações digitadas',
        });
      }
    },
    async add() {
      await this.action('add', this.addValue, this.addDate);
    },
    async sub() {
      if (this.subValue > this.reservation.accumulated) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          actions: [{ icon: 'close', color: 'white' }],
          message: `Valor a ser retirado é maior que o total da reserva de R$ ${this.moneyFilter(this.reservation.accumulated)}.`,
        });
      } else {
        await this.action('sub', this.subValue, this.subDate);
      }
    },
  },
  async mounted() {
    this.addDate = this.getNow();
    this.subDate = this.getNow();

    [this.reservation] = await reservationDao.getReservation(this.$route.params.id);
    if (!this.reservation) {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'Não foi possível encontrar a reserva',
      });
      this.$router.push({ name: 'index' });
    }

    this.addValue = this.moneyFilter(this.reservation.mothlyContribution);
  },
};
</script>

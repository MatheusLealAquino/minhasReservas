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
  methods: {
    add() {
    },
    sub() {
    },
  },
  created() {
    this.addDate = this.getNow();
    this.subDate = this.getNow();

    this.addValue = this.moneyFilter(this.reservation.mothlyContribution);
  },
};
</script>

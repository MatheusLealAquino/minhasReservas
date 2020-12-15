<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="text-h4">Criar reserva</div>
    <q-form @submit="onSubmit">
      <q-input
        filled
        v-model="name"
        label="Nome da reserva *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor, digite algo']"
      />

      <q-input
        filled
        v-model="goal"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        label="Sua meta (R$)*"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Por favor, digite sua meta',
          val => Number(val) > 0 || 'Por favor, digite uma meta maior que zero'
        ]"
      />

      <q-input
        filled
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        v-model="mothlyContribution"
        label="Aporte mensal (R$)*"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Por favor, digite um valor para seu aporte mensal',
          val => Number(val) > 0 || 'Por favor, digite um aporte mensal maior que zero'
        ]"
      />

      <q-select
        filled
        v-model="account"
        use-input
        stack-label
        input-debounce="0"
        label="Banco"
        :options="accountsOptions"
        @filter="filterFn"
        behavior="menu"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Por favor, selecione um banco',
        ]"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Sem resultados
            </q-item-section>
          </q-item>
        </template>
        <template v-slot:append>
          <q-icon
            v-if="account !== null"
            class="cursor-pointer"
            name="clear"
            @click.stop="account = null"
          />
        </template>
      </q-select>

      <div class="q-mb-sm">
        <div class="text-subtitle1 text-weight-light">Capa:</div>
        <q-carousel
          animated
          v-model="slide"
          swipeable
          arrows
          thumbnails
          infinite
          height="40vh"
        >
          <q-carousel-slide
            v-for="(image, index) in defaultImages"
            :key="index"
            :name="index"
            :img-src="image"
          />
        </q-carousel>
      </div>

      <div>
        <q-btn
          label="Salvar"
          class="full-width q-mb-lg"
          type="submit"
          color="primary"
        />

        <q-btn
          label="Voltar"
          :to="{name: 'index'}"
          class="full-width"
          type="reset"
          color="black"
          outline
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import defaultImages from '../../assets/defaultImages';
import accounts from '../../assets/accounts';

export default {
  name: 'CreateReservation',
  data: () => ({
    slide: 0,
    name: null,
    goal: null,
    mothlyContribution: null,
    account: null,
    accountsOptions: [],

    defaultImages: [],
    accounts: [],
  }),
  methods: {
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.accountsOptions = this.accounts;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.accountsOptions = this.accounts.filter((v) => v.toLowerCase().indexOf(needle) > -1);
      });
    },

    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first',
        });
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted',
        });
      }
    },

    onReset() {
      this.slide = 0;
      this.name = null;
      this.goal = null;
      this.mothlyContribution = null;
      this.account = null;
      this.accountsOptions = this.accounts;
    },
  },
  created() {
    this.defaultImages = defaultImages;
    this.accounts = accounts;
  },
};
</script>

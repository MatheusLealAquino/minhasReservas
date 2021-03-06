<template>
  <q-page class="q-pa-md q-gutter-md">
    <div class="text-h6">
      Configurações: <br> {{ reservation.name }}
    </div>

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
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        v-model="goal"
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
          v-model="slide"
          swipeable
          arrows
          thumbnails
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
          label="Atualizar"
          class="full-width q-mb-sm"
          type="submit"
          color="primary"
        />
        <q-btn
          label="Deletar"
          class="full-width q-mb-lg"
          @click="confirmDelete = true"
          color="red"
        />

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
    </q-form>

    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Deseja mesmo deletar? Esta ação é irreversível.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Deletar" color="red" @click="onDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import reservationDao from '../../daos/reservation';
import stringMixin from '../../mixins/string';
import defaultImages from '../../assets/defaultImages';
import accounts from '../../assets/accounts';

export default {
  name: 'Configuration',
  mixins: [stringMixin],
  data: () => ({
    reservation: {},
    slide: 0,
    name: null,
    goal: null,
    mothlyContribution: null,
    account: null,
    accountsOptions: [],
    confirmDelete: false,

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

    async onSubmit() {
      try {
        await reservationDao.updateReservation(this.reservation._id,
          {
            name: this.name,
            goal: Number(this.goal),
            mothlyContribution: Number(this.mothlyContribution),
            account: this.account,
            image: this.defaultImages[this.slide],
          });

        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          actions: [{ icon: 'close', color: 'white' }],
          message: 'Reserva atualizada com sucesso!',
        });
      } catch (err) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          actions: [{ icon: 'close', color: 'white' }],
          message: 'Erro ao atualizar reserva, verifique as informações digitadas',
        });
      }
    },

    async onDelete() {
      try {
        await reservationDao.removeReservation(this.reservation._id);

        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Reserva deletada com sucesso!',
        });

        this.$router.push({ name: 'index' });
      } catch (err) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          actions: [{ icon: 'close', color: 'white' }],
          message: 'Erro ao deletar reserva, tente novamente',
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
  async mounted() {
    this.defaultImages = defaultImages;
    this.accounts = accounts;

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

    this.name = this.reservation.name;
    this.goal = this.moneyFilter(this.reservation.goal);
    this.mothlyContribution = this.moneyFilter(this.reservation.mothlyContribution);
    this.account = this.reservation.account;
    this.slide = this.defaultImages.indexOf(this.reservation.image);
  },
};
</script>

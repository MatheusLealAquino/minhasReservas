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
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="sub">
        <div class="text-h6">Retirar</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
export default {
  name: 'OperationPage',
  data: () => ({
    tab: 'add',
  }),
  methods: {
    add() {
    },
    sub() {
    },
  },
};
</script>

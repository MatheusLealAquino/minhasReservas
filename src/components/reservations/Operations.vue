<template>
  <div>
    <q-skeleton v-if="showSkeleton" type="text" />
    <div v-else class="text-subtitle1">Operações: </div>

    <q-list bordered separator>
      <div v-if="!showSkeleton">
        <q-item clickable v-ripple v-for="(operation, index) in operations" :key="index">
          <q-item-section>
            <q-item-label overline>{{ getTypeOperation(operation.type) }}</q-item-label>
            <q-item-label>R$ {{ moneyFilter(operation.value) }}</q-item-label>
            <q-item-label caption>
              {{ convertDate(operation.date) }}
            </q-item-label>
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
</template>

<script>
import stringMixin from '../../mixins/string';
import dateMixin from '../../mixins/date';

export default {
  name: 'OperationsComponente',
  mixins: [stringMixin, dateMixin],
  props: {
    showSkeleton: {
      default: true,
    },
    operations: {
      type: Array,
    },
  },
  methods: {
    getTypeOperation(type) {
      return type === 'add' ? 'Depósito' : 'Retirada';
    },
  },
};
</script>

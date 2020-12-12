function moneyFilter(raw) {
  if (typeof raw !== 'number') return raw;
  return raw.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export default {
  methods: {
    moneyFilter,
  },
};

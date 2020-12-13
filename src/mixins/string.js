function moneyFilter(raw) {
  if (typeof raw !== 'number') return raw;
  return raw.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', useGrouping: false });
}

function maskedToNumber(raw) {
  return Number(raw);
}

export default {
  methods: {
    moneyFilter,
    maskedToNumber,
  },
};

function moneyFilter(raw) {
  if (typeof raw !== 'number') return raw;
  return (
    raw
      .toLocaleString('en-us', {
        style: 'currency',
        currency: 'BRL',
        useGrouping: false,
      })
  )
    .replace('R$', '')
    .trim();
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

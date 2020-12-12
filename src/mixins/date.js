import moment from 'moment-timezone';
import 'moment/locale/pt-br';

moment.locale('pt-BR');
moment.tz('America/Sao_Paulo');

function convertDate(raw) {
  return moment(raw).format('ll');
}

function getNow(raw) {
  return moment(raw).format('yyy/MM/DD');
}

export default {
  methods: {
    convertDate,
    getNow,
  },
};

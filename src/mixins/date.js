import moment from 'moment-timezone';
import 'moment/locale/pt-br';

moment.locale('pt-BR');
moment.tz('America/Sao_Paulo');

function convertDate(raw) {
  return moment(raw).format('ll');
}

export default {
  methods: {
    convertDate,
  },
};

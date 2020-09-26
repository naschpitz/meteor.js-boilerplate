import './accounts.js';

import moment from 'moment';
import 'moment/locale/de.js';
import 'moment/locale/es.js';
import 'moment/locale/fr.js';
import 'moment/locale/pt.js';

moment.locale(getLanguage());

attachTooltip = function() {
    $('[data-toggle="tooltip"]').tooltip();
};

detachTooltip = function() {
    $('[data-toggle="tooltip"]').tooltip('dispose');
};

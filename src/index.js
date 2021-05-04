import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IntlProvider } from 'react-intl';

import messages_en from "./translations/en-us.json";
import messages_pt from "./translations/pt-br.json";

const messages = {
    'en': messages_en,
    'pt': messages_pt,
};
const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
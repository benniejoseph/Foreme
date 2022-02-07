import '@lwc/synthetic-shadow'; 
import { createElement } from 'lwc';
import MyApp from 'my/app';
// import theme from './theme';
// import { setup } from 'twind/shim';

// setup({
//     theme: theme
// });

const app = createElement('my-app', { is: MyApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);


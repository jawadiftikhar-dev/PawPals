import './styles/main.css';
import { addRoute, startRouter } from './router.js';
import { homePage } from './pages/home.js';
import { servicesPage } from './pages/services.js';
import { appointmentPage } from './pages/appointment.js';
import { productsPage } from './pages/products.js';
import { notFoundPage } from './pages/notFound.js';

import { registerSW } from 'virtual:pwa-register';

registerSW({ immediate: true });

addRoute('/', homePage);
addRoute('/services', servicesPage);
addRoute('/appointment', appointmentPage);
addRoute('/products', productsPage);
addRoute('*', notFoundPage);

startRouter();
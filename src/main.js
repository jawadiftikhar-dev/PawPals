import './styles/main.css';
import { addRoute, startRouter } from './router.js';
import { homePage } from './pages/home.js';
import { servicesPage } from './pages/services.js';
import { appointmentPage } from './pages/appointment.js';
import { notFoundPage } from './pages/notFound.js';

addRoute('/', homePage);
addRoute('/services', servicesPage);
addRoute('/appointment', appointmentPage);
addRoute('*', notFoundPage);

startRouter();
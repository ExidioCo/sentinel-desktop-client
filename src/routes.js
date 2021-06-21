import Configuration from './pages/Configuration';
import CreateKey from './pages/CreateKey';
import Dashboard from './pages/Dashboard';
import KeyInfo from './pages/KeyInfo';
import Splash from './pages/Splash';

const routes = [{
    path: '/',
    component: Splash,
    exact: true,
}, {
    path: '/configuration',
    component: Configuration,
}, {
    path: '/keys',
    component: CreateKey,
    exact: true,
}, {
    path: '/keys/:name',
    component: KeyInfo,
}, {
    path: '/dashboard',
    component: Dashboard,
}];

export default routes;

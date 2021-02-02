import Authentication from './pages/Authentication';
import Configuration from './pages/Configuration';
import CreateKey from './pages/CreateKey';
import KeyInfo from './pages/KeyInfo';
import Splash from './pages/Splash';

export const unauthenticated = [{
    path: '/',
    component: Splash,
}, {
    path: '/authentication',
    component: Authentication,
}];

export const authenticated = [{
    path: '/configuration',
    component: Configuration,
}, {
    path: '/keys',
    component: CreateKey,
}, {
    path: '/keys/:name',
    component: KeyInfo,
}];

import Authentication from './pages/Authentication';
import Splash from './pages/Splash';

export const unauthenticated = [{
    path: '/',
    component: Splash,
}, {
    path: '/authentication',
    component: Authentication,
}];

export const authenticated = [];

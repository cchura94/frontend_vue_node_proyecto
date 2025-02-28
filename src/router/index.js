import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Inicio from "../views/web/Inicio.vue";
import Nosotros from "../views/web/Nosotros.vue";
import Login from "../views/auth/login/Login.vue";
import Registro from "../views/auth/registro/Registro.vue";
import Perfil from "../views/admin/perfil/Perfil.vue";
import User from "../views/admin/user/User.vue";


const routes = [
    { path: '', component: Inicio, name: 'Inicio' },
    { path: '/nosotros', component: Nosotros, name: 'Nosotros'},
    {
        path: '/auth/login',
        component: Login,
        name: 'Login',
        meta: {redirectIfAuth: true}
    },
    {
        path: '/auth/registro',
        component: Registro,
        
    },
    {
        path: '/admin/perfil',
        component: Perfil,
        meta: {requireAuth: true},
        name: 'Perfil'
    },
    {
        path: '/admin/usuario',
        component: User,
        meta: {requireAuth: true},
        name: 'Usuario'
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

// Guards
router.beforeEach((to, from, next) => {
    
    const token = localStorage.getItem("access_token") || null;

    if(to.meta.requireAuth){
        if(!token){
            return next({name: 'Login'});
        }
        return next();
    }
    if(to.meta.redirectIfAuth && token){
        return next({name: 'Usuario'})
    }
    return next();
});

export default router;
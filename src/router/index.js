import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Inicio from "../views/web/Inicio.vue";
import Nosotros from "../views/web/Nosotros.vue";
import Login from "../views/auth/login/Login.vue";
import Registro from "../views/auth/registro/Registro.vue";
import Perfil from "../views/admin/perfil/Perfil.vue";
import User from "../views/admin/user/User.vue";


const routes = [
    { path: '', component: Inicio },
    { path: '/nosotros', component: Nosotros },
    {
        path: '/auth/login',
        component: Login
    },
    {
        path: '/auth/registro',
        component: Registro
    },
    {
        path: '/admin/perfil',
        component: Perfil
    },
    {
        path: '/admin/usuario',
        component: User
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
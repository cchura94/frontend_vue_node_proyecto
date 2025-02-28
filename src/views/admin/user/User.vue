<template>
    <h1>Usuarios</h1>

    {{ usuario }}
    <form>
        <label for="n">Ingrese Nombre:</label>
        <input type="text" id="n" v-model="usuario.name">
        <br>
        <label for="e">Ingrese Correo:</label>
        <input type="email" id="e" v-model="usuario.email">
        <br>
        <label for="p">Ingrese Contraseña:</label>
        <input type="password" id="p" v-model="usuario.password">
        <br>
        <button type="button" @click="funRegistrarUsuario()">{{ usuario.id?'Modificar':'Registrar' }}</button>
    </form>

    <table border="1">
        <thead>
            <tr>
                <td>ID</td>
                <td>NOMBRE</td>
                <td>CORREO</td>
                <td>ACCION</td>
            </tr>
        </thead>
        <tbody>

            <tr v-for="user in usuarios" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                    <button @click="funEditar(user)">EDITAR</button>
                    <button @click="funEliminar(user)">ELIMINAR</button>
                </td>
            </tr>
            
        </tbody>
    </table>

    

</template>
<script setup>
import { ref, onMounted } from 'vue';
import userService from '../../../services/user.service';

const usuarios = ref([]);
const usuario = ref({});

onMounted(() => {
    getUsuarios()
});

async function getUsuarios(){
    try {
        const { data } = await userService.listar();
        usuarios.value = data;
    } catch (error) {
        
    }
}

async function funRegistrarUsuario(){
    try {
        if(usuario.value.id){
            // modificar

            const {data} = await userService.modificar(usuario.value.id, usuario.value);
            console.log(data);
            getUsuarios();
            usuario.value = {}

        }else{
            const {data} = await userService.guardar(usuario.value);
            console.log(data);
            getUsuarios();
            usuario.value = {}

        }
    } catch (error) {
        
    }
}

async function funEditar(user){
    usuario.value = user;
}

async function funEliminar(user){
    await userService.eliminar(user.id);
    getUsuarios();
}

</script>
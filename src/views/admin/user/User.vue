<template>
    <h1>Usuarios</h1>
    {{ usuarios }}

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
                    <button>EDITAR</button>
                    <button>ELIMINAR</button>
                </td>
            </tr>
            
        </tbody>
    </table>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import userService from '../../../services/user.service';

const usuarios = ref([]);

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

</script>
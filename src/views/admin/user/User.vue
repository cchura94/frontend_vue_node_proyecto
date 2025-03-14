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

    <br>

    



    <div class="card">
        <Button label="Nuevo Usuario" @click="visible = true" />
        <DataTable :value="usuarios" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="NOMBRE"></Column>
            <Column field="email" header="CORREO"></Column>
            <Column field="created_at" header="Creado en"></Column>
            <Column :exportable="false" style="min-width: 12rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil"  rounded class="mr-2" @click="funEditar(slotProps.data)" />
                    <Button icon="pi pi-trash" rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>

    </div>

    <Dialog v-model:visible="visible" modal header="Datos Usuario" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Actualice los datos.</span>
        <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Nombre</label>
            <InputText id="username" class="flex-auto" autocomplete="off" v-model="usuario.name" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Correo</label>
            <InputText id="email" class="flex-auto" autocomplete="off" v-model="usuario.email" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="pass" class="font-semibold w-24">Contraseña</label>
            <InputText type="password" id="pass" class="flex-auto" autocomplete="off" v-model="usuario.password"/>
        </div>
        
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Guardar Usuario" @click="funRegistrarUsuario()"></Button>
        </div>
    </Dialog>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import userService from '../../../services/user.service';

const usuarios = ref([]);
const usuario = ref({});
const visible = ref(false);

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

            visible.value = false

        }else{
            const {data} = await userService.guardar(usuario.value);
            console.log(data);
            getUsuarios();
            usuario.value = {}
            visible.value = false
        }
    } catch (error) {
        
    }
}

async function funEditar(user){
    usuario.value = user;
    visible.value = true;
}

async function funEliminar(user){
    await userService.eliminar(user.id);
    getUsuarios();
}

</script>
<template>
    <div class="card">
        <h1>Gestión Categorias</h1>

        <Button label="Nueva Categoria" @click="openDialogProducto" />

<Dialog v-model:visible="visibleCategoria" modal header="Gestión Categoria" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Actualizar la información.</span>
 
    <div class="flex items-center gap-4 mb-4">
        <label for="nom" class="font-semibold w-24">Nombre</label>
        <InputText id="nom" class="flex-auto" autocomplete="off" v-model="categoria.nombre" />
    </div>
    <span class="text-sm text-red-500 p-0 m-0" v-for="error in errors">
        <p class="p-0 m-p" v-if="error.path=='nombre'">{{ error.msg }}</p><hr>
    </span>
    <div class="flex items-center gap-4 mb-8">
        <label for="det" class="font-semibold w-24">Detalle</label>
        <InputText id="det" class="flex-auto" autocomplete="off" v-model="categoria.detalle" />
    </div>
    <span class="text-sm text-red-500 p-0 m-0" v-for="error in errors">
        <p class="p-0 m-p" v-if="error.path=='detalle'">{{ error.msg }}</p><hr>
    </span>
    <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="visibleCategoria = false"></Button>
        <Button type="button" label="Guardar" @click="guardarCategoria"></Button>
    </div>
</Dialog>


        <DataTable :value="categorias" tableStyle="min-width: 50rem">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="detalle" header="DETALLE"></Column>
            <Column header="Acciones"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import categoriaService from '../../../services/categoria.service';

const categorias = ref([]);
const visibleCategoria = ref(false);
const categoria = ref({});
const errors = ref({});

onMounted(() => {
    getCategorias()
})

async function getCategorias(){
    const {data} = await categoriaService.listar();

    categorias.value = data;
}

async function guardarCategoria(){
    try {
        const {data} = await categoriaService.guardar(categoria.value);
        visibleCategoria.value = false;
        getCategorias();
        
    } catch (error) {
        if(error.status === 400){
            errors.value = error.response?.data?.errors;
            console.log("ERRRROOOR: ", error);
        }
    }

}

async function openDialogProducto(){
    visibleCategoria.value = true;
    categoria.value={};
    errors.value={}
}

</script>
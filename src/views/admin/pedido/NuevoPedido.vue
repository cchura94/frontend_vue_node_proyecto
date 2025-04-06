<template>

    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">

        <div class="col-span-3 md:col-span-3 bg-white p-4 rounded-lg shadow-md">

            <DataTable
                ref="dt"
                :value="products"
                dataKey="id"
                :paginator="true"
                :rows="10"
                lazy
                :totalRecords="totalRecords"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[2, 5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} productos"
                @page="onPage($event)"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Gestión Products</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText placeholder="Buscar..." v-model="buscar" @keyup.enter="filtrarDatos()"/>
                        </IconField>
                    </div>
                </template>

                <Column field="id" header="ID" sortable style="min-width: 2rem"></Column>
                <Column field="nombre" header="NOMBRE" sortable style="min-width: 16rem"></Column>
                <Column header="Imagen">
                    <template #body="slotProps">
                        <img :src="`http://localhost:3000/${slotProps.data.imagen}`" :alt="slotProps.data.imagen" class="rounded" style="width: 64px" />
                    </template>
                </Column>
                <Column field="precio" header="PRECIO" sortable style="min-width: 3rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.precio) }}
                    </template>
                </Column>
                <Column field="Categorium.nombre" header="CATEGORIA" sortable style="min-width: 6rem"></Column>
               
                <Column field="estado" header="ESTADO" sortable style="min-width: 3rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.estado" v-if="slotProps.data.estado" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-image" rounded class="mr-2" @click="editImagenProduct(slotProps.data)" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>

        </div>

        <div class="col-span-2 bg-white p-4 rounded-lg shadow-md">
            <div class="mb-6">
                <h2 class="text-xl font-semibold mb-4">Carrito</h2>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span>Teclado Mecanico: </span>
                        <span>$500</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Teclado Mecanico: </span>
                        <span>$500</span>
                    </div>
                    <div class="flex justify-between font-semibold">
                        <span>Total </span>
                        <span>$25</span>
                    </div>
                </div>
            </div>

            <div class="mb-6 bg-gray-100 p-4 rounded-lg">
                <h2 class="text-xl font-semibold mb-4">Datos Cliente</h2>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span>NOMBRE: </span>
                        <span>Javier Prueba Sanchez</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Correo: </span>
                        <span>javier@mail.com</span>
                    </div>
                </div>

            </div>

            <button class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">Guardar Pedido</button>

        </div>

    </div>

</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue';

import productoService from '../../../services/producto.service';

import Swal from 'sweetalert2';

const products = ref([]);
const totalRecords = ref(0);
const lazyParams = ref({});
const buscar = ref("");
const producto = ref({})
const dialogImagen = ref(false)
const dt = ref(null);

const productDialog = ref(false)
const submitted = ref(false)
const categorias = ref([]);
onMounted(()=> {
    
    getProductos();
})

async function getProductos(){
    const {data} = await productoService.listar(lazyParams.value.page+1, lazyParams.value.rows, buscar.value);
    products.value = data.rows;
    totalRecords.value = data.count;
}
function formatCurrency(value) {
    if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
}
const onPage = async (event) => {
    console.log(event);
    lazyParams.value = event;
    getProductos()
}
</script>
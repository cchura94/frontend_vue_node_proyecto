<template>
    <div class="card">
        <Toolbar class="mb-6">
            <template #start>
                <Button label="Nuevo Producto" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
            </template>
            <template #end>
                <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
            </template>
        </Toolbar>

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

            <Dialog v-model:visible="dialogImagen" modal header="Actualizar Imagen" :style="{ width: '25rem' }">
                <span class="text-surface-500 dark:text-surface-400 block mb-8">Sube imagen menos de 5 megas.</span>
                <FileUpload customUpload @uploader="subirImagenProducto" :multiple="false" accept="image/*" :maxFileSize="1000000">
                <template #empty>
                        <span>Arrastrar y Soltar imagen para subir.</span>
                    </template>
                </FileUpload>
                <div class="flex justify-end gap-2">
                    <Button type="button" label="Cerrar" severity="secondary" @click="dialogImagen = false"></Button>
                </div>
            </Dialog>



            <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalle de Producto" :modal="true">
            <div class="flex flex-col gap-6">
                {{ producto }}
                <img v-if="producto.imagen" :src="`http://127.0.0.1:3000/${producto.imagen}`" :alt="producto.imagen" class="block m-auto pb-4" />
                <div>
                    <label for="name" class="block font-bold mb-3">Nombre</label>
                    <InputText id="name" v-model.trim="producto.nombre" required="true" autofocus :invalid="submitted && !producto.nombre" fluid />
                    <small v-if="submitted && !producto.nombre" class="text-red-500">El nombre es obligatorio.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Descripción</label>
                    <Textarea id="description" v-model="producto.descripcion" rows="3" cols="20" fluid />
                </div>

                <div>
                    <span class="block font-bold mb-4">Categoria</span>
                    <div class="grid grid-cols-12 gap-4">
                        <div class="flex items-center gap-2 col-span-6" v-for="cat in categorias">
                            <RadioButton :id="`category${cat.id}`" v-model="producto.categoriaId" name="categoriaId" :value="cat.id" />
                            <label :for="`category${cat.id}`">{{cat.nombre}}</label>
                        </div>                        
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Precio</label>
                        <InputNumber id="price" v-model="producto.precio" mode="currency" currency="USD" locale="en-US" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Cantidad</label>
                        <InputNumber id="quantity" v-model="producto.stock" integeronly fluid />
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Guardar" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>

            

    </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import productoService from '../../../services/producto.service';
import categoriaService from '../../../services/categoria.service'
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

onMounted(() => {
    lazyParams.value = {
        first: 0,
        rows: 10,
        page: 0
    }
    
    getProductos();

    getCategorias()
})

async function getProductos(){
    const {data} = await productoService.listar(lazyParams.value.page+1, lazyParams.value.rows, buscar.value);
    products.value = data.rows;
    totalRecords.value = data.count;
}

async function getCategorias(){
    const {data} = await categoriaService.listar();
    categorias.value = data;
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

const filtrarDatos = () => {
    getProductos();
}

const editImagenProduct = (data) => {
    producto.value = data;
    dialogImagen.value=true

}


const subirImagenProducto = async (event) => {
    console.log(event);
    let formData = new FormData();

    formData.append("imagen", event.files[0]);

    await productoService.subirImagen(producto.value.id, formData);
    getProductos();
    dialogImagen.value = false;

    Swal.fire({
        title: "Imagen Actualizada!",
        text: "Ok Para continuar!",
        icon: "success"
    });

}

const openNew = () => {

    productDialog.value = true;

}

const hideDialog = () => {
    productDialog.value = false;

}

const saveProduct = async () => {

    if(producto.value.id){
        // modificar
        try {
            
            const {data} = await productoService.modificar(producto.value.id, producto.value);

            productDialog.value = false;
            getProductos();
            Swal.fire({
                title: "Producto Actualizado!",
                text: "Ok Para continuar!",
                icon: "success"
            });
        } catch (error) {
            productDialog.value = false;
            Swal.fire({
                title: "Ocurrió un error al modificar el producto!",
                text: "Ok Para continuar!",
                icon: "error"
            });
        }

    }else{
        // guardar nuevo producto
        try {
            
            const {data} = await productoService.guardar(producto.value);

            productDialog.value = false;
            getProductos();
            Swal.fire({
                title: "Producto Registrado!",
                text: "Ok Para continuar!",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Ocurrió un error al registrar el producto!",
                text: "Ok Para continuar!",
                icon: "error"
            });
        }
    }

}

function editProduct(datos){
    producto.value = datos;
    productDialog.value = true;
}

function exportCSV() {
    dt.value.exportCSV();
}
</script>
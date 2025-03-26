<template>
    <h1>Mi Perfil</h1>
    <div class="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
    <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Perfil de Usuario</h1>

    <!-- Datos del perfil -->
    <div class="space-y-4">
      <div class="flex justify-between text-gray-700">
        <span class="font-medium">ID:</span>
        <span class="font-light">{{ perfil.id }}</span>
      </div>
      <div class="flex justify-between text-gray-700">
        <span class="font-medium">Email:</span>
        <span class="font-light">{{ perfil.email }}</span>
      </div>
      <div class="flex justify-between text-gray-700">
        <span class="font-medium">Fecha de creación ACCESO:</span>
        <span class="font-light">{{ formatDate(perfil.iat) }}</span>
      </div>
      <div class="flex justify-between text-gray-700">
        <span class="font-medium">Fecha de expiración:</span>
        <span class="font-light">{{ formatDate(perfil.exp) }}</span>
      </div>

      <button class="bg-blue-600 px-4 py-2 rounded text-md text-white hover:bg-blue-800" @click="funSalir()">Salir</button>
    </div>
  </div>
  
</template>

<script setup>
import { onMounted, ref } from 'vue';
import authService from '../../../services/auth.service';
import { useRouter } from 'vue-router';

const perfil = ref({});

const router = useRouter()

onMounted(() => {
    getPerfil()
})

const getPerfil = async ()=> {
    const {data} = await authService.perfil();

    perfil.value = data;
}

function formatDate(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000); // Convertir de segundos a milisegundos
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      return date.toLocaleString('es-ES', options); // Formato en español
    }

    function funSalir(){
        localStorage.removeItem("access_token");
        router.push({name: "Login"});
    }
</script>
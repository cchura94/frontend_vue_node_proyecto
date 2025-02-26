<template>
    <h1>INICIAR SESION</h1>
  {{ credenciales }}
  <br>
  <label for="c">Ingrese Correo</label>
  <input type="email" id="c" v-model="credenciales.email">
  <br>
  <label for="p">Ingrese Contraseña</label>
  <input type="password" id="p" v-model="credenciales.password">
  <br>
  <button type="button" @click="funIngresar()">Ingresar</button>
  <br>
  {{ datosss }}
  <hr>
</template>

<script setup>
import { ref } from 'vue';
import authService from './../../../services/auth.service';
import { useRouter } from 'vue-router';
const datosss = ref({})
const credenciales = ref({});

const router = useRouter()

async function funIngresar(){
  // alert("Ingresando...")
  try {
    const respuesta = await authService.login(credenciales.value);
    datosss.value = respuesta.data;

    localStorage.setItem("access_token", respuesta.data.access_token)
    
    router.push("/admin/perfil");
    
  } catch (error) {
    alert("Credenciales Incorrectas");
  }
}
</script>
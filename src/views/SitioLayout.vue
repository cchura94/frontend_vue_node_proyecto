<template>
  <link
    rel="stylesheet"
    href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
  />
  <!--Replace with your tailwind.css once created-->
  <link
    href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
    rel="stylesheet"
  />
  <!-- Define your gradient here - use online tools to find a gradient matching your branding-->

  <div
    class="leading-normal tracking-normal text-white gradient"
    style="font-family: 'Source Sans Pro', sans-serif"
  >
    <!--Nav-->
    <Menu></Menu>

    <RouterView />

    <!--Footer-->
    <Footer></Footer>
  </div>
</template>

<script setup>
import Menu from "./../components/sitio/Menu.vue";
import Footer from "./../components/sitio/Footer.vue";
</script>

<style>
.gradient {
  background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
}
</style>

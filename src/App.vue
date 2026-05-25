<template>
  <div id="app">
    <InvoiceApplicationForm />
  </div>
</template>

<script>
import InvoiceApplicationForm from './components/InvoiceApplicationForm.vue'

export default {
  name: 'App',
  components: {
    InvoiceApplicationForm
  }
}
</script>

<style>
#app {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  min-height: 100vh;
}
</style>

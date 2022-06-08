<template>
<div class="main">
  <Sidebar :web3=web3 :ethereum=ethereum />
  <div class="index">
    <h1>Defi Comparator</h1>
    <Comparator :web3=web3 />
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
const Web3 = require('web3');

declare global {
  interface Window {
    ethereum: any;
  }
}

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      ethereum: Object,
      web3: Object,
    }
  },
  beforeMount() {
    this.ethereum = window.ethereum;
    this.web3 = new Web3(this.ethereum);
  },
})
</script>

<style>
  .main {
    display: flex;
    justify-content: row;
    height: 90vh;
  }
  .index {
    padding: 1.5em;
  }
</style>
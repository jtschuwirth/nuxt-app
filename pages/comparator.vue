<template>
<div class="main">
  <Sidebar :web3=web3 :ethereum=ethereum />
  <div class="index">
    <h1>Defi Comparator</h1>
    <Comparator :web3=web3 />
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import Web3 from 'web3';

export default Vue.extend({
  name: 'ComparatorPage',
  data() {
    return {
      ethereum: null,
      web3: null,
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
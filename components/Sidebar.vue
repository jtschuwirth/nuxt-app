<template>
    <div class="sidebar">
        <p class="sidebar-title">
            Nuxt App
        </p>
        <div class="connected">
            <button class="metamask-btn" @click="connectMetamask()">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                alt="Metamask"
                class="metamask-image">
            Connect Metamask
            </button>
            <span>Connected as</span>
            <span>{{this.$store.state.account.slice(0,15)}}</span>
         </div>
    </div>
</template>

<script>
import { PropOptions } from 'vue'
export default {
    name: "Sidebar",
    props: [
     "web3",
     "ethereum"
    ],
    mounted() {
        this.isMetaMaskConnected().then((connected) => {
            if (connected) {
                // metamask is connected
                this.connectMetamask();
            } else {
                // metamask is not connected
                this.$store.commit('setAccount', "Not Connected")
            }
        });
    },
    methods: {
        async connectMetamask() {
            console.log("connecting to metamask")
            try {
                const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                this.$store.commit('setAccount', account)

            } catch (error) {
                console.error(error);

            }
        },
        async isMetaMaskConnected() {
            const accounts = await this.web3.eth.getAccounts()
            return accounts.length > 0;
        },
    }

}
</script>

<style>
    .sidebar {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        width: 200px;
        background-color: green;
        padding: 1.5em;
    }
    .sidebar-title {
        margin-bottom: 5em;
    }
    .connected {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .metamask-image {
        height: 15px;
        width: 15px;
    }
    .metamask-btn {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
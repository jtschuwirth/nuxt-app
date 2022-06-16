<template>
    <div class="sidebar">
        <div>
        <p class="sidebar-title">
            José Tomas Schuwirth
        </p>
        <div class="links">
            <NuxtLink to="/">Home page</NuxtLink>
            <NuxtLink to="/comparator">Defi Comparator</NuxtLink>
        </div>
        </div>
        <div class="connected">
            <span>Connected as</span>
            <span class="metamask-data">{{this.$store.state.account.slice(0,5)}}...{{this.$store.state.account.slice(-4)}}</span>
            <span>Chain Id</span>
            <span class="metamask-data">{{this.$store.state.chainId}}</span>
            <button class="metamask-btn" @click="connectMetamask()">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                alt="Metamask"
                class="metamask-image">
            Connect Metamask
            </button>
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
        this.ethereum.on('chainChanged', (_chainId) => window.location.reload());
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
                const chainId = await this.web3.eth.getChainId()
                const account = accounts[0];
                this.$store.commit('setAccount', account)
                this.$store.commit('setChainId', chainId)

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
        justify-content: space-between;
        min-height: 100%;
        width: 200px;
        background-color: lightgray;
        padding: 1em;
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
        gap: 0.5em;
    }
    .metamask-data {
        font-size: 22px;
        color: black;
    }
    .links {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    a { 
        text-decoration: none;
        color: black;
    }
</style>
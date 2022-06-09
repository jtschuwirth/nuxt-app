<template>
    <div >
        <span>Select Coins</span>
        <form @submit="get($event)" class="comparator-container">
        <div class="label">
        <label for="">SEll</label>
        <div>
        <input name="sellInput" type="number">
        <select name="sell" id="" @change="sellHandler($event)">
            <option value="" selected disabled>select</option>
            <option v-for="value, key in coins" :key="value.address" :value="[value.address,value.decimals]">{{key}}</option>
        </select>
        </div>
        </div>

        <div class="label">
        <label for="">BUY</label>
        <div>
        <select name="buy" id="" @change="buyHandler($event)">
            <option value="" selected disabled>select</option>
            <option v-for="value, key in coins" :key="value.address" :value="[value.address,value.decimals]">{{key}}</option>
        </select>
        </div>
        </div>
        <button type="submit">Search</button>
        </form>
    </div>
</template>

<script >

const RouterAddress = require("../static/dexes")["DFK-UniswapV2Router02"]
const RouterABI = require("../static/abi.json");

export default {
    name: "Comparator",
    props: ["web3"],
    data() {
        return {
            coins: Object,
            sell: Object,
            buy: Object
        }
    },
    beforeMount() {
        this.coins = require("../static/coins.json")
    },
    methods: {
        async get(event) {
            event.preventDefault();
            var BN = this.web3.utils.BN;
            let input = new BN(event.target.sellInput.value, 10).mul( new BN(10, 10).pow(new BN(this.sell.decimals, 10)) );
            const RouterContract = new this.web3.eth.Contract(RouterABI, RouterAddress);
            let result = await RouterContract.methods.getAmountsOut(input, [this.sell.address, this.buy.address]).call();
            console.log(result[1]/(10**this.buy.decimals))
        },
        sellHandler(evt) {
            let address = evt.target.value.split(",")[0]
            let decimals = evt.target.value.split(",")[1]
            this.sell = {address, decimals}
        },
        buyHandler(evt) {
            let address = evt.target.value.split(",")[0]
            let decimals = evt.target.value.split(",")[1]
            this.buy = {address, decimals}
        }
    }
}
</script>

<style>
    .comparator-container {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        border-radius: 10px;
        padding: 1em;
        gap: 1em;
    }

    .label {
        display: flex;
        flex-direction: column;
    }
</style>
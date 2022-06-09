<template>
    <div >
        <span>Select Coins</span>
        <form @submit="get($event)" class="comparator-container">
        <div class="label">
        <label for="">SEll</label>
        <div>
        <input name="sellInput" type="number">
        <select name="sell" id="">
            <option value="" selected disabled>select</option>
            <option value="one">one</option>
            <option v-for="value, key in coins" :key="value" :value="value">{{key}}</option>
        </select>
        </div>
        </div>

        <div class="label">
        <label for="">BUY</label>
        <div>
        <select name="buy" id="">
            <option value="" selected disabled>select</option>
            <option value="one">one</option>
            <option v-for="value, key in coins" :key="value" :value="value">{{key}}</option>
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
    props: {
        web3: Function,
    },
    data() {
        return {
            coins: Object
        }
    },
    beforeMount() {
        this.coins = require("../static/coins.json")
    },
    methods: {
        async get(event) {
            event.preventDefault();
            let input = event.target.sellInput.value;
            let sell = event.target.sell.value;
            let buy = event.target.buy.value
            const RouterContract = new this.web3.eth.Contract(RouterABI, RouterAddress);
            let result = await RouterContract.methods.getAmountsOut(input, [sell, buy]).call();
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
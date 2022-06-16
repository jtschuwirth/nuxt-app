<template>
    <div >
        <span>Select Coins</span>
        <form @submit="handleSearch($event)" class="comparator-container">
        <div class="label">
        <label for="">SEll</label>
        <div>
        <input name="sellInput" type="number">
        <select name="sell" id="">
            <option value="" selected disabled>select</option>
            <option v-for="value in tokens" :key="value" :value="value">{{value}}</option>
        </select>
        </div>
        </div>

        <div class="label-sell">
        <label for="">BUY</label>
        <select name="buy" id="">
            <option value="" selected disabled>select</option>
            <option v-for="value in tokens" :key="value" :value="value">{{value}}</option>
        </select>
        </div>
        <button type="submit">Search</button>
        </form>
        <span>Results:</span>
        <div class="results">
            <div v-for="result in results" :key="result.key">
                <div class="result">
                    <span>{{Object.keys(result)[0]}}</span>
                    <span>{{Object.values(result)[0]}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script >

export default {
    name: "Comparator",
    data() {
        return {
            tokens: [],
            results: []
        }
    },
    beforeMount() {
        this.fetchTokens()
    },
    methods: {
        async handleSearch(event) {
            event.preventDefault();
            this.fetchInputSwaps(event.target.sell.value, event.target.sellInput.value, event.target.buy.value)
        },
        async fetchTokens() {
            const tokens = ( await this.$axios.$get('/tokens') ).tokens
            this.tokens = tokens
        },
        async fetchInputSwaps(inputToken, inputAmount, outputToken) {
            const config = {params: {inputToken, inputAmount, outputToken}}
            const inputSwaps = ( await this.$axios.$get('/swap/input', config)).results
            this.results = inputSwaps
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
        margin: 0.5em 0em;
    }

    .label {
        display: flex;
        flex-direction: column;
    }

    .label-sell {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .results {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .result {
        display: flex;
        flex-direction: column;
    }
</style>
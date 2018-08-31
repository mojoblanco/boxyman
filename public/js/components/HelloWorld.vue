<template>
    <div class="cruel">
        Hello
        <span>{{ who }}</span>
    </div>
</template>

<script>
module.exports = { // This is important, I got errors when using `export default`
    data () {
        return {
            who: "World!"
        }
    },
    mounted () {
    }
}
</script>

<style scoped>
.cruel {
    color: green;
}
</style>
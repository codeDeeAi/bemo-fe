<template>
    <div class="loader__main">
        <p class="loader">Loading ...</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>
<style lang="scss" scoped>
.loader__main{
    width: 100%;
    height: 100vh;
    z-index: 999;
    display: flex;
    justify-items: center;

    .loader{
        margin: auto;
        font-weight: bold;
        font-size: 16px;
    }
}
</style>
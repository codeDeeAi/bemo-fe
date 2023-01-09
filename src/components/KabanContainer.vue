<template>
    <div class="kaban__main__container">
        <KabanColumn v-for="(column, index) in store.getKabanData" :key="index" :columnData="column" :columnIndex="index" />
    </div>
</template>
<script>
import KabanColumn from './KabanColumn.vue';
import { useMainStore } from '@/stores/index'
export default {
    name: 'KabanContainer',
    props: {
    },
    components: {
        KabanColumn
    },
    data() {
        return {
            store: useMainStore(),
        }
    },

}
</script>
<style  lang="scss" scoped>
/* Fira Sans */
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");

.kaban__main__container {
    width: 100% !important;
    display: -webkit-box !important;
    height: 95vh !important;
    display: flex;
    justify-items: start;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 15px;
    position: fixed;
    z-index: -1;
}
</style>
<template>
  <main>
    <FullPageLoader v-if="store.getIsLoading" />
    <div v-show="!store.getIsLoading">
      <Navbar />
      <KabanContainer />
    </div>
  </main>
</template>
<script>
import Navbar from './components/Navbar.vue';
import KabanContainer from './components/KabanContainer.vue';
import FullPageLoader from './components/FullPageLoader.vue';
import { useMainStore } from '@/stores/index'
export default {
  components: {
    Navbar,
    KabanContainer,
    FullPageLoader,
  },
  data() {
    return {
      store: useMainStore(),
    }
  },
  watch:{
    'store.kabanData':{
      deep:true,
      handler(){
        this.store.updateCardPositions();
      }
    }
  },
  
  created() {
    this.store.csrf();
    this.store.fetchColumns();
  },
  methods: {
  },

}
</script>

<style scoped>

</style>

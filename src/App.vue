<template>
  <div id="app">
    <div class="list">
      <div class="toolbar">
        <button @click="newNote">새 노트</button>
      </div>
      <list v-for="note in notes" :key="note" :note="note"></list>
    </div>
    <div class="content">
      <note />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import list from './components/list'
import note from './components/note'

export default {
  name: 'app',
  computed: mapGetters(['notes']),
  components: {
    list: list,
    note: note
  },
  created() {
    this.$store.dispatch("setNotesReference")
  },
  methods: {
    newNote() {
      this.$store.commit("newNote")
    }, 
  },
}
</script>

<style lang="scss" scoped>
  #app {
    height: 100%;

    > div {
      box-sizing: border-box;
      height: 100%;
      padding: 10px;

      &.list {
        float: left;
        overflow: auto;
        width: 300px;
        border-right: 1px solid #e3e3e3;
      }
    
      &.content {
        padding-left: 310px;
        overflow-wrap: break-word;
      }
    }    
  }
</style>

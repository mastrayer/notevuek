<template>
  <div id="app">
    <div class="list">
      <div class="toolbar">
        <button @click="newNote">새 노트</button>
      </div>
      <list v-for="note in notes" :key="note" :note="note" :class="{active: (currentNote['.key'] == note['.key'])}"></list>
    </div>
    <div class="content">
      <note />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import list from './components/list'
import note from './components/note'

export default {
  name: 'app',
  computed: {
    ...mapGetters(['notes']),
    ...mapState(['currentNote'])
  },
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

        .toolbar {
          text-align: right;
          margin-bottom: 30px;
          
          button {
            border: 0;
            background: #dddddd;
            padding: 6px 10px;
            border-radius: 5px;
          }
        }
       
        .active {
          box-sizing:border-box;
          border: 2px solid #0c0c0c; 
        }
      }
    
      &.content {
        padding-left: 310px;
        overflow-wrap: break-word;
      }
    }    
  }
</style>

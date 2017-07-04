<template>
  <div class="container">
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
    ...mapGetters(['notes']), /* vuex를 생성할 때 정의한 getter를 컴포넌트에서 좀 더 간편하게 참조할 수 있도록 해주는 헬퍼 함수를 호출합니다 */
    ...mapState(['currentNote']), /* vuex를 생성할 때 정의한 state를 컴포넌트에서 좀 더 간편하게 참조할 수 있도록 해주는 헬퍼 함수를 호출합니다 */
  },
  components: {
    list: list,
    note: note
  },
  created() {
    this.$store.dispatch("setNotesReference") /* firebase database의 notes를 참조하도록 설정합니다 */
    
    /* currentNote의 값 변경을 감지하여 uri를 변경합니다 */
    this.$store.watch((state) => state.currentNote, function(newVal, oldVal) { 
      this.$router.push({params: {key: newVal['.key']}})
    }.bind(this))
  },
  methods: {
    /* 새 노트를 만들기 위해 store의 updateNote mutation을 호출합니다 */
    newNote() {
      this.$store.commit("updateNote", {})
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
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
            background: #dddddd;
            padding: 6px 10px;
            border:0;
            border-radius: 5px;
          }
        }
       
      }
    
      &.content {
        padding-left: 310px;
        overflow-wrap: break-word;
      }
    }    
  }
</style>

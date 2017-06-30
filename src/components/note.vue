<template>
  <div class="note">
    <div class="toolbar">
      <button @click="saveNote">저장하기</button>
      <button @click="removeNote" v-if="key">삭제하기</button>
    </div>

    <input class="title" type="text" v-model="title" placeholder="제목을 입력하세요">
    <div class="body" v-html="currentNote.body" ref="body" contentEditable></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default { 
  name: 'note',
  computed: mapState(['currentNote']),
  data() {
    return {
      key: '',
      title: '',
      body: '',
      updated_at: ''
    }
  },
  methods: {
    saveNote() {
      let updatedNote = {
        '.key': this.currentNote['.key'],
        title: this.title,
        body: this.$refs.body.innerHTML,
        updated_at: (+new Date())
      }

      // TODO: mutation 호출해서 state 업데이트 해준 뒤 action으로 데이터 커밋할지, 
      // 아니면 액션(commitCurrentNote)에 payload로 데이터 넘겨서 한번만에 저장할지 고민

      this.$store.commit("updateNote", updatedNote)
      this.$store.dispatch("commitCurrentNote")
    },
    removeNote() {
      this.$store.dispatch("removeCurrentNote")
    }
  },
  watch: {
    // 노트의 제목과 내용을 편집할 때, store의 currentNote에 바인딩시키는 것이 아닌, 컴포넌트 데이터에 바인딩 시켰다가 저장하거나 다른 노트 볼 때 store 갱신
    currentNote() {
      ({'.key': this.key, title: this.title, body: this.body, updated_at: this.updated_at} = this.currentNote)
    }
  }
}
</script>

<style lang="scss" scoped>
.note {
  display: flex;
  flex-flow: column;
  height: 100%;

  .toolbar {
    margin-bottom: 38px;

    button {
      border: 0;
      background: #dddddd;
      padding: 6px 10px;
      border-radius: 5px;
    }
  }

  .title {
    width: 100%;
    box-sizing: border-box;
    border: 0;
    border-bottom: 1px solid #e3e3e3;
    font-size: 30px;
    outline: 0;
    padding: 15px;
    margin-bottom: 10px;
  }

  .body {
    outline: 0;
    padding: 15px;
    height: 100%;
    overflow: auto;
  }
}
</style>

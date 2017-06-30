<template>
  <div @click="selectNote(note['.key'])">
    <p class="title">{{ note.title }}</p>
    <p class="update">{{ new Date(note.updated_at) }}</p>
    <p class="body">{{ note.body }}</p>
  </div>
</template>

<script>
export default { 
  name: 'list',
  props: ['note'],
  methods: {
    selectNote(key) {
      this.$store.commit("selectNote", key)
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  padding: 10px;
  transition: background 0.2s ease-in;
  
  &.active {
    background: #e3ffea;
  } 
  
  &:nth-child(n+3) { 
    border-top: 1px solid #e3e3e3;
  }

  > .title {
    color: #737373;
    font-size:16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 4px;
  }
  > .update {
    color: #a3a3a3;
    font-size: 12px;
    font-weight: 200;
    margin-bottom: 8px;
  }
  > .body {
    color: #939393;
    font-size: 13px;
    font-weight: 300;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>

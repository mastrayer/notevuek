import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'

Vue.use(Vuex)

/* 저장소의 상태를 정의합니다 */
const state = {
  notes: [],
  currentNote: {},
}

/* 저장소 상태에 대한 변이를 정의합니다 */
const mutations = {
  /* 기본적인 firebase mutation들을 포함합니다 */
  ...firebaseMutations,

  /* 저장된 노트 리스트에서 노트를 선택합니다 */
  selectNote(state, payload) {
    state.currentNote = state.notes.find(
      note => (note['.key'] == payload)
    ) || {};
  },

  /* 노트의 내용을 업데이트합니다 */
  updateNote(state, payload) {
    state.currentNote = payload
  },
}

/* 저장소의 액션을 정의합니다 */
const actions = {
  /* firebase database의 notes를 참조하도록 세팅합니다 */
  setNotesReference: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('notes', firebase.notesRef)
  }),

  /* 선택된 노트의 변경사항을 firebase database에 커밋합니다 */
  commitCurrentNote: firebaseAction((context) => {
    var current = Object.assign({}, context.state.currentNote)
    var key = current['.key']

    delete current['.key']

    if(!key) {
      let res = firebase.notesRef.push(current)
      
      context.state.currentNote['.key'] = res.getKey()
    } else 
      firebase.notesRef.child(key).set(current)
  }),

  /* 선택된 노트를 삭제합니다 */
  removeCurrentNote: firebaseAction((context) => {
    var key = context.state.currentNote['.key']
    firebase.notesRef.child(key).remove()

    /* 노트를 삭제하고 저장된 다른 임의의 노트로 이동합니다 */
    context.state.currentNote = context.state.notes[0] || {}
  }),
}

/* 상태들이 참조될 때 호출될 getter 함수들을 정의합니다 */
const getters = {
  /* note들을 vue에서 참조할 때, updated_at을 기준으로 역순 정렬합니다 */
  notes: state => {
    return state.notes.sort((a, b) => b.updated_at - a.updated_at)
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

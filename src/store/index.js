import Vue from 'vue'
import Vuex from 'vuex'
import firebase from './firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'

Vue.use(Vuex)

const state = {
  notes: [],
  currentNote: {},
}

const mutations = {
  ...firebaseMutations,

  selectNote(state, payload) {
    state.currentNote = state.notes.find(
      note => (note['.key'] == payload)
    );
  },
  updateNote(state, payload) {
    state.currentNote = payload
  },
  newNote(state) {
    state.currentNote = {}
  }
}

const actions = {
  setNotesReference: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('notes', firebase.notesRef)
  }),
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
  removeCurrentNote: firebaseAction((context) => {
    var key = context.state.currentNote['.key']
    firebase.notesRef.child(key).remove()

    // 노트 삭제하고 쓰여진 노트로 이동
    context.state.currentNote = context.state.notes[0] || {}
  }),
}

const getters = {
  notes: state => {
/*
TODO: 기본적으로 firebase에서 order를 지원하는데, order한다고 해서 기존 데이터 셋이 정렬되는게 아니라,
아래 예제와 같이 forEach 돌릴 때 order한 순서대로 iteration되어서 기존 데이터를 덮어씌울 방법을 모르겠다.
그래서 그냥 직접 정렬함

    var notes = [];

    firebase.notesRef
      .orderByChild("updated_at")
      .once("value", function(snap) {
        debugger
        snap.forEach(function(s) {
          notes.push(s.val())
          console.log(s.val())
        })

        notes = notes.reverse()
      })
*/
    return state.notes.sort((a, b) => b.updated_at - a.updated_at)
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

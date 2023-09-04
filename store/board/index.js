export const state = () => ({
  item: {
    boardForm: {
      bid: '',
      btitle: '',
      bcontent: '',
      files: []
    },
  },
  list: [],
})

export const getters = {
  getList: (state) => state.list,
  getItem: (state) => state.item,
  getItemBoardForm: (state) => state.item.boardForm,
}

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setItem(state, { field, subField, item }) {
    subField ? (state.item[field][subField] = item) : (state.item[field] = item)
  },
}

export const actions = {
  write({ getters, commit }) {
    const boardForm = getters.getItem.boardForm
    const formData = new FormData()
    formData.append('mId', sessionStorage.getItem('mId'))
    formData.append('bTitle', boardForm.btitle)
    formData.append('bContent', boardForm.bcontent)
    boardForm.files.forEach((file) => formData.append('files', file))
    this.$axios
      .post('/api/board/write', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        alert('글작성 성공')
        commit('setItem', {
          field: 'boardForm',
          subField: 'btitle',
          item: '',
        })
        commit('setItem', {
          field: 'boardForm',
          subField: 'bcontent',
          item: '',
        })
        commit('setItem', {
          field: 'boardForm',
          subField: 'files',
          item: [],
        })
        this.$router.push('/board/list')
      })
      .catch((e) => {
        alert('글작성 실패')
      })
  },
  async setList({ commit }) {
    await this.$axios
      .get('/api/board/list')
      .then((res) => {
        commit('setList', res.data)
      })
      .catch((e) => {
        alert('게시물 없음')
      })
  },
  async setItem({ commit }, bId) {
    await this.$axios
      .get(`/api/board/detail/${bId}`)
      .then((res) => {
        commit('setItem', {
          field: 'boardForm',
          item: res.data,
        })
      })
      .catch((e) => {})
  },
  delete({commit}, bId) {
    this.$axios.delete(`/api/board/delete/${bId}`)
      .then((res) => {
        alert('삭제성공')
        this.$router.push('/board/list')
      })
      .catch((e) => {
        alert('삭제실패')
      })
  },
  update({ getters, commit }) {
    const boardForm = getters.getItem.boardForm
    const formData = new FormData()
    formData.append('bId', boardForm.bid)
    alert(boardForm.bid)
    formData.append('mId', sessionStorage.getItem('mId'))
    formData.append('bTitle', boardForm.btitle)
    formData.append('bContent', boardForm.bcontent)
    boardForm.files.forEach((file) => formData.append('files', file))
    this.$axios
      .put('/api/board/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        alert('글작성 성공')
        commit('setItem', {
          field: 'boardForm',
          subField: 'btitle',
          item: '',
        })
        commit('setItem', {
          field: 'boardForm',
          subField: 'bcontent',
          item: '',
        })
        commit('setItem', {
          field: 'boardForm',
          subField: 'files',
          item: [],
        })
        this.$router.push(`/board/detail/${boardForm.bid}`)
      })
      .catch((e) => {
        alert('글작성 실패')
      })
  },
}

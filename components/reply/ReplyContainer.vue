<template>
  <div>
    <p class="mt-5">댓글 :</p>
    <ReplyInput v-if="isAuthentication" />
    <ReplyList />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ReplyInput from './ReplyInput.vue'
import ReplyList from './ReplyList.vue'

export default {
  name: 'ReplyContainer',
  components: { ReplyList, ReplyInput },
  computed: {
    ...mapGetters({
      isAuthentication: 'member/getIsAuthentication',
    }),
  },
}
</script>

<template>
  <div class="comment-list">
    <ul class="list-group">
      <ReplyListItem
        v-for="(item, idx) in paging.list"
        :key="idx"
        :item="item"
        :idx="idx"
      />
    </ul>
    <PageNav :paging="paging" page-type="reply" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ReplyListItem from './ReplyListItem.vue'
import PageNav from '@/components/common/PageNav.vue'

export default {
  name: 'ReplyList',
  components: { PageNav, ReplyListItem },
  computed: {
    ...mapGetters({
      paging: 'reply/getList',
    }),
  },
}
</script>

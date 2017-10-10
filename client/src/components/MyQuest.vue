<template lang="html">
  <div class="container">
    <h1>My Questions</h1>
    <ul class="list-group text-left">
      <li class="list-group-item" v-for="(thread, index) in allThreads" v-if="thread.author._id == me">
        <span class="badge">14</span>
        <router-link :to="'/home/read/' + thread.slug">
          {{ thread.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['allThreads'],
  data () {
    return {
      me: localStorage.getItem('id')
    }
  }
}
</script>

<style lang="css">
</style>

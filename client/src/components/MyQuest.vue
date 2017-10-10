<template lang="html">
  <div class="container">
    <h1>My Questions</h1>
    <ul class="list-group text-left">
      <li class="list-group-item" v-for="(thread, index) in allThreads" v-if="thread.author._id == me">
        <span class="badge" @click="remove(thread._id)">Delete</span>
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
  },
  methods: {
    remove (id) {
      if(this.$swal({
        title: 'Yakin mau dihapus?',
        text: "kamu akan kehilangan thread ini!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Hapus Aja!'
      })){
        this.$axios.delete(`threads/${id}`)
        .then(()=> {
          this.$swal(
            'Deleted!',
            'Your thread has been deleted.',
            'success'
          )
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>

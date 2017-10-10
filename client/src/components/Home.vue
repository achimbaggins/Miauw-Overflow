<template lang="html">
  <div class="container">
    <div class="row" style="margin-bottom:10px">
      <div class="alert alert-dismissible alert-success" v-if="pesan">
        <button type="button" class="close" data-dismiss="alert" @click="clearPesan">&times;</button>
        <strong>Well done!</strong> {{pesan}}.
      </div>
      <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        Post New Question
      </button>
      <div class="collapse" id="collapseExample">
        <div class=" col-md-6 col-md-offset-3">
          <div class="panel panel-primary text-left">
            <div class="panel-heading">
              <h3 class="panel-title">Post New Question</h3>
            </div>
            <div class="panel-body">
              <form @submit="postQuest(newQuest)">
                <label>Title</label><br>
                <input type="text" v-model="newQuest.title" class="form-control"><br>
                <label>Question Content</label><br>
                <textarea rows="3" cols="60" v-model="newQuest.konten" class="form-control"></textarea><br>
                <button type="submit" class="btn btn-primary">Send Question</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default text-left" v-for="(thread, index) in allThreads">
          <div class="panel-heading">
            <router-link :to="'/home/read/' + thread.slug">
              <h3 class="panel-title">{{ thread.title }}</h3>
            </router-link>
          </div>
          <div class="panel-body">
            {{ thread.konten }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['allThreads'],
  data () {
    return {
      newQuest: {
        title: '',
        konten: '',
        author: `${localStorage.getItem('id')}`
      },
      pesan: ''
    }
  },
  methods: {
    postQuest (newdata) {
      event.preventDefault()
      this.$axios.post(`/threads`, newdata)
      .then(({data}) => {
        this.$emit('tambahQuest', data)
        this.pesan = 'Pertanyaanmu berhasil dikirim!!!'
        this.newQuest.title = ''
        this.newQuest.konten = ''
      })
    },
    clearPesan () {
      this.pesan = ''
    }
  }
}
</script>

<style lang="css">
</style>

<template lang="html">
  <div class="container">
    <div class="col-md-12">
      <div class="jumbotron">
        <h1>{{detail.title}}</h1>
        <p>{{detail.konten}}</p>
        <div class="text-right">
          <button type="button" name="button"class="btn btn-primary" >
            <span class="glyphicon glyphicon-user"></span> by : {{detail.author.username.toUpperCase()}}
          </button>
          <button type="button" name="button"class="btn btn-warning" @click="kirimVote"><span class="glyphicon glyphicon-heart"></span> disukai {{vote}} Orang. 
          </button>

          <!-- <button type="button" class="btn btn-danger" name="button" v-if="idCreator == detail.author._id" @click="deleteThread(thread._id); clearMe()">
            <span class="glyphicon glyphicon-trash"></span>
          </button> -->
        </div>
      </div>

      <div class="alert alert-dismissible alert-success" v-if="pesan">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {{pesan}}.
      </div>
      <!-- KOMENTAR -->
      <div class="form-group">
        <div class="input-group">
          <span class="input-group-addon glyphicon glyphicon-gift"></span>
          <input type="text" class="form-control" v-model="komentar.konten">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" @click="kirimKomentar"><b>Kirim Komentar</b></button>
          </span>
        </div>
      </div>
      <!-- KOMENTAR -->

      <div v-if="answers.length > 0">
        <div class="panel panel-primary" v-for="answer in answers">
          <div class="panel-heading">
            <h3 class="panel-title text-left">Respon dari : {{username || answer.author.username}}</h3>
          </div>
          <div class="panel-body text-left">
            {{answer.konten}}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['slug'],
  data (){
    return {
      detail: '',
      answers: '',
      komentar: {
        author: `${localStorage.getItem('id')}`,
        konten: ''
      },
      pesan: '',
      username: `${localStorage.getItem('username')}`,
      dataVote: {
        authorId: `${localStorage.getItem('id')}`,
        threadId: ``
      },
      voteMsg: '',
      vote: 0
    }
  },
  methods: {
    threadDetail(slug){
      console.log('ini slug', slug);
      this.$axios.get('threads/' + slug)
      .then(({data}) => {
        this.detail = data[0]
        this.answers = data[1]
        this.vote = data[2].length
        this.dataVote.threadId = data[0]._id
      })
      .catch(err => {
        console.log('erornya', err);
      })
    },
    kirimKomentar(){
      this.$axios.post(`threads/${this.slug}`, this.komentar)
      .then(({data}) => {
        // this.pesan = 'Komentar kamu sudah diposting!!!'
        this.answers.unshift(data)
        this.komentar.konten = ''
        this.$swal(
          'Berhasil Post Komentar!',
          'Komentar kamu sudah diposting!!!',
          'success'
        )
      })
    },
    kirimVote () {
      this.$axios.post(`threads/${this.slug}/vote`, this.dataVote)
      .then(({data}) => {
        console.log('datavote', data);
        if(`${data}` === 'voteAdded') {
          this.vote += 1
          this.$swal(
            'Berhasil Vote!',
            'Makasih ya udah vote!!! :D',
            'success'
          )
        } else {
          this.vote -= 1
          this.$swal(
            'Berhasil Unvote!',
            'Kok unvote sih??? Klik vote lagi dong?! :D',
            'error'
          )
        }
      })
    }
  },
  created () {
    this.threadDetail(this.slug)
  },
  watch: {
    slug () {
      this.threadDetail(this.slug)
    }
  }
}
</script>

<style lang="css">
</style>

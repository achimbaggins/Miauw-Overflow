<template>
  <div id="app">
    <header>
      <span> Forum Pecinta Miauw</span>
      <div class="text-right" style="margin-top:-27px" v-if="cekLogin">
        Selamat Datang <strong>{{ name }}</strong> ! -
        <router-link :to="{ name: 'Home', params: {} }">
          <button type="button" class="btn btn-primary">Home</button>
        </router-link>
        <router-link :to="{ name: 'My Quest', params: {} }">
          <button type="button" class="btn btn-success">Your Questions List</button>
        </router-link>
        <button type="button" class="btn btn-warning" @click="doLogout">Logout</button>
      </div>
    </header>
    <main>
      <router-view @setStatus="statusLogin" :allThreads="allThreads" @tambahQuest="tambahQuestion"></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      cekLogin: localStorage.getItem('token'),
      name: localStorage.getItem('username'),
      allThreads: []
    }
  },
  methods: {
    doLogout () {
      localStorage.clear()
      this.cekLogin = ''
      this.name = ''
      this.$router.push('/')
    },
    statusLogin () {
      this.cekLogin = localStorage.getItem('token')
      this.name = localStorage.getItem('username')
    },
    cekStatusLogin () {
      if(localStorage.getItem('token')){
        this.$router.push('/home')
      }
    },
    getAllThreads () {
      this.$axios.get('/threads')
      .then(({data}) => {
        this.allThreads = data
      })
    },
    tambahQuestion (data) {
      this.allThreads.unshift(data)
    }
  },
  created () {
    this.cekStatusLogin()
    this.getAllThreads()
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/File">File</router-link>
    </div>
    <router-view id="router-view"/>
  </div>
</template>
<style lang="stylus">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

ul, li {
  list-style: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  overflow-y: auto;
}

#nav {
  min-height: 100%;
  width: 150px;
  float: left;
  padding: 30px;
  background: #f0f0f0;

  a {
    font-weight: bold;
    color: #2c3e50;
    display: block;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#router-view {
  width: auto;
  min-height: 100%;
  margin-left: 150px;
  padding-left: 20px;
}
</style>

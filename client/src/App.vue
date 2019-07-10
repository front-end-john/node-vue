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
$header-height = 100;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-size: 14px;
}

ul, li {
  list-style: none;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: ' ';
  clear: both;
  height: 0;
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
  position: fixed;
  top: 0;
  bottom: 0;
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
  height: 100%;
  margin-left: 150px;
  padding: 20px;
  position: relative;

  & > .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    height: $header-height px;
    padding: 20px;
    background: #fff;
  }

  & > .content {
    padding-top: $header-height px;
    height: 100%;
    overflow: hidden;

    & > .main {
    }
  }
}
</style>

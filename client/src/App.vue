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

a {
  text-decoration: none;
  display: block;
}

button, input, select {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

input, select {
  width: 150px;

  &:focus {
    border: 1px solid #409EFF;
  }
}

button {
  cursor: pointer;

  &:hover {
    color: #409eff;
    background: #ecf5ff;
  }
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
  padding-top: 40px;
  min-height: 100%;
  width: 150px;
  position: fixed;
  top: 0;
  bottom: 0;
  background: #f0f0f0;

  a {
    font-weight: bold;
    color: #2c3e50;
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding-left: 30px;

    &.router-link-exact-active {
      color: #42b983;
      background: #f7f7f7;
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

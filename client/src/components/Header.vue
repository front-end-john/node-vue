<template>
  <div class="header">
    <h1>{{title}}</h1>
    <slot/>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
	name: 'Header',
	props: ['title']
}
</script>

<style lang="stylus" scoped>
.header {
  & > .btn-back {
    margin-left: 30px;
    margin-top: 20px;
    cursor: pointer;
    border: none;
    outline: 0;
    background: rgb(255, 85, 98);
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
  }
}
</style>

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
</style>

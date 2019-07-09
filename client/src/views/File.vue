<template>
	<div class="file">
		<h1>{{currentUrl}}</h1>
		<div class="list-wrapper">
			<ul>
				<li v-for="(item, index) in fileList" :key="index">{{item}}</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
export default {
	name: 'File',
	data() {
		return {
			fileUrl: '/git/',
			currentUrl: '',
			fileList: []
		}
	},
	created() {
		this.currentUrl = this.fileUrl
		this.getFile()
	},
	methods: {
		async getFile() {
			// 这里用try catch包裹，请求失败的时候就执行catch里的
			try {
				// 定义参数对象
				const params = {
					fileUrl: this.fileUrl
				}
				const { result } = await this.$api.fileSystem.getFile(params)
				this.fileList = result
			} catch (e) {
				console.log('catch -> e:', e)
			}
		}
	}
}
</script>
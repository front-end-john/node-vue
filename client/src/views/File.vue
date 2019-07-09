<template>
	<div class="file">
		<h1>/{{currentPath}}</h1>
		<button class="btn-back" v-if="backPath" @click="handleBack">返回上一级</button>
		<div class="list-wrapper">
			<ul>
				<li v-for="(item, index) in fileList" :key="index">
					<div class="item" @click="handleClick(item)">
						<svg class="icon" aria-hidden="true">
							<use :xlink:href="`#icon-${item.fileType}`"></use>
						</svg>
						<p>{{item.name}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
export default {
	name: 'File',
	data() {
		return {
			dir: 'home',
			backPath: '',
			currentPath: '',
			fileList: []
		}
	},
	created() {
		this.currentPath = this.dir
		this.getFile(this.dir)
	},
	methods: {
		async getFile(dir) {
			// 这里用try catch包裹，请求失败的时候就执行catch里的
			try {
				const { result } = await this.$api.fileSystem.getFile({dir})
				this.fileList = result
			} catch (e) {
				console.log('catch -> e:', e)
			}
		},
		handleBack() {
			this.getFile(this.backPath)
			this.currentPath = this.backPath
			const arr = this.backPath.split('/')
			arr.pop() // 删除数组最后一个元素
			this.backPath = arr.length ? arr.join('/') : ''
		},
		handleClick({fileType, name}) {
			switch(fileType) {
				case 'folder':
					this.backPath = this.currentPath
					this.currentPath = `${this.currentPath}/${name}`
					this.getFile(this.currentPath)
					break
				default:
					alert(`是否打开该${fileType}文件？`)
					break	
			}
		}
	}
}
</script>
<style lang="stylus" scoped>
.file {
	padding: 20px 0;
	box-sizing: border-box;
	& > h1{
		padding-left: 30px;
	}
	& > .btn-back {
		margin-left: 30px;
		margin-top: 20px;
		cursor: pointer;
		border: none;
		outline: 0;
		background: rgb(255, 85, 98);
		color: #fff;
		padding: 10px 20px
		border-radius: 4px
	}
	& > .list-wrapper {
		padding-top: 30px;
		& > ul {
			& > li {
				text-align: center;
				width: 25%;
				height: 200px;
				float: left;
				& > .item{
					width 200px
					height 200px
					cursor: pointer;
					& > .icon {
						width: 100px;
						height: 100px;
						margin-bottom: 40px
						&:hover{
							transition: 0.25s;
							transform: scale(1.5)
						}
					}
				}
			}
		}
	}
}
</style>
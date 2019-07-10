<template>
	<div class="view file">
		<Header :title="`/${currentPath}`">
			<button class="btn-back" v-if="backPath" @click="handleBack">返回上一级</button>
		</Header>
		<div class="content" v-scroll="scrollFn" ref="content">
			<div
				v-show="isShow"
				class="main"
				ref="main"
				:style="{ transform: `translateY(-${moveY}%)`, transition: `${moveTime}s` }"
			>
				<ul class="clearfix">
					<li v-for="(item, index) in fileList" :key="index">
						<div class="item" @click="handleClick(item)">
							<svg class="icon" aria-hidden="true">
								<use v-bind:xlink:href="`#icon-${item.fileType}`"></use>
							</svg>
							<p>{{item.name}}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import Header from '@/components/Header.vue'
export default {
	name: 'File',
	data() {
		return {
			dir: 'home',
			backPath: '',
			currentPath: '',
			fileList: [],
			moveY: 0,
			moveTime: 0,
			isShow: false
		}
	},
	created() {
		this.currentPath = this.dir
		this.getFile(this.dir)
	},
	methods: {
		scrollFn(direction) {
			console.log('direction：', direction)
			this.moveTime = 0.5
			if (direction === 'down') {
				const contentH = this.$refs.content.offsetHeight
				const mainH = this.$refs.main.offsetHeight
				if (contentH < mainH && this.moveY < 60) {
					this.moveY += 10
				}
			} else {
				if (this.moveY > 0) {
					this.moveY -= 10
				}
			}
		},
		async getFile(dir) {
			// 这里用try catch包裹，请求失败的时候就执行catch里的
			try {
				const { result } = await this.$api.fileSystem.getFile({ dir })
				this.fileList = result
				this.isShow = true
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
			this.moveY = 0
			this.moveTime = 0
			this.isShow = false
		},
		handleClick({ fileType, name }) {
			switch (fileType) {
				case 'folder':
					this.backPath = this.currentPath
					this.currentPath = `${this.currentPath}/${name}`
					this.getFile(this.currentPath)
					break
				default:
					// alert(`是否打开该${fileType}文件？`)
					console.log(`file:///D:/${this.currentPath}/${name}`)
					window.open(`file:///D:/${this.currentPath}/${name}`)
					break
			}
		}
	},
	components: {
		Header
	}
}
</script>
<style lang="stylus" scoped>
.file {
	.main {
		padding-top: 30px;

		& > ul {
			& > li {
				text-align: center;
				width: 25%;
				height: 200px;
				float: left;

				& > .item {
					width: 200px;
					height: 200px;
					cursor: pointer;

					& > .icon {
						width: 100px;
						height: 100px;
						margin-bottom: 40px;

						&:hover {
							transition: 0.25s;
							transform: scale(1.5);
						}
					}
				}
			}
		}
	}
}
</style>
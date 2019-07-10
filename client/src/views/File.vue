<template>
	<div class="view file">
		<Header :title="'文件系统'">
			<div class="form">
				{{currentDrive}}:/
				<input
					type="text"
					v-model="currentPath"
					:placeholder="`请输入${currentDrive}盘文件夹路径`"
					@keyup.enter="submit"
				>
				<button @click="submit">提交</button>
				<button class="btn-back" v-if="backPath" @click="handleBack">返回上一级</button>
			</div>
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
			currentDrive: 'D',
			backPath: '',
			currentPath: '',
			fileList: [],
			moveY: 0,
			moveTime: 0,
			isShow: false
		}
	},
	methods: {
		submit() {
			this.getFile(this.currentPath)
		},
		scrollFn(direction) {
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
			if (!dir) {
				alert(`请输入${this.currentDrive}盘文件夹路径`)
				return
			}
			// 这里用try catch包裹，请求失败的时候就执行catch里的
			try {
				const { result } = await this.$api.fileSystem.getFile({
					drive: this.currentDrive,
					dir
				})
				this.fileList = result
				this.isShow = true
			} catch (e) {
				console.log('catch -> e:', e)
			}
		},
		hide() {
			this.moveY = 0
			this.moveTime = 0
			this.isShow = false
		},
		handleBack() {
			this.getFile(this.backPath)
			this.currentPath = this.backPath
			const arr = this.backPath.split('/')
			arr.pop() // 删除数组最后一个元素
			this.backPath = arr.length ? arr.join('/') : ''
			this.hide()
		},
		handleClick({ fileType, name }) {
			switch (fileType) {
				case 'folder':
					this.hide()
					this.backPath = this.currentPath
					this.currentPath = `${this.currentPath}/${name}`
					this.getFile(this.currentPath)
					break
				default:
					alert(`是否打开该${fileType}文件？`)
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
	.form {
		margin-top: 20px;

		& > input {
			margin: 0 5px;
		}

		& > .btn-back {
			margin-left: 5px;
			background: rgb(255, 85, 98);
			color: #fff;
		}
	}

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
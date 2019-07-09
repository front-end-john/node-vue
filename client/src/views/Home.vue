<template>
	<div class="home">
		<Header>
			<p>我来自Home组件</p>
		</Header>
		<div class="query">
			<input @keyup.enter="queryUser" v-model="keyword" type="text" placeholder="请输入用户名">
			<button @click="queryUser">查询</button>
		</div>
		<div class="register">
			<h1>新增/修改用戶</h1>
			<div class="form">
				<div>
					<input ref="name" type="text" @keyup.enter="addUser" placeholder="請輸入姓名" v-model="user.name">
				</div>
				<div class="password">
					<input
						ref="password"
						type="password"
						@keyup.enter="addUser"
						placeholder="請輸入密碼"
						v-model="user.password"
					>
				</div>
				<div class="sex">
					<select v-model="user.sex">
						<option v-for="item in gender" :key="item.key" :value="item.key">{{item.value}}</option>
					</select>
				</div>
				<button @click="submit">提交</button>
			</div>
		</div>
		<div class="table">
			<ul class="head">
				<li>ID</li>
				<li>用户名</li>
				<li>性别</li>
				<li>密码</li>
				<li>註冊時間</li>
			</ul>
			<ul class="list" v-if="users.length">
				<li v-for="item in users" :key="item.id">
					<div>{{item._id}}</div>
					<div>{{item.name}}</div>
					<div>{{item.sex | GENDER_TYPE}}</div>
					<div>{{item.password}}</div>
					<div>{{item.createTime}}</div>
					<button @click="deleteUser(item._id)">删除</button>
					<button @click="updateUser(item)">修改</button>
				</li>
			</ul>
			<p v-else>查询记录為空</p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
// @ is an alias to /src
import Header from '@/components/Header.vue'
const GENDER = [
	{
		key: 0,
		value: '男'
	},
	{
		key: 1,
		value: '女'
	}
]
const SEX_ARR = GENDER.map((item) => item.value)
export default {
	name: 'Home',
	data() {
		return {
			gender: GENDER,
			users: [],
			user: {
				name: '',
				password: '',
				sex: 0
			},
			keyword: ''
		}
	},
	created() {
		this.getUserByAll()
	},
	methods: {
		async getUserByAll() {
			// 这里用try catch包裹，请求失败的时候就执行catch里的
			try {
				// 定义参数对象
				let params = {}
				let data = await this.$api.user.queryByAll(params)
				console.log('get data:', data.result)
				if (data.code === 200) {
					this.users = data.result
				}
			} catch (e) {
				console.log('catch -> e:', e)
			}
		},
		queryUser() {
			console.log('查询用户：', this.keyword)
			this.$api.user.queryUser({ keyword: this.keyword }).then((res) => {
				console.log('查询res：', res)
				this.users = res.result
				// Object.assign(this.users, res.result)
			})
		},
		submit() {
			// const {name, password} = this.user
			if (!this.user.name) {
				alert('請輸入用戶名')
				this.$refs.name.focus()
				return
			}
			if (!this.user.password) {
				alert('請輸入密碼')
				this.$refs.password.focus()
				return
			}
			try {
				console.log('this.user._id:', this.user._id)
				if (!this.user._id) {
					this.$api.user.addUser(this.user).then((res) => {
						console.log('添加res：', res)
						this.getUserByAll()
					})
				} else {
					console.log('----------------update-----------')
					this.$api.user.updateUser(this.user).then((res) => {
						console.log('更新res：', res)
						this.getUserByAll()
					})
				}
			} catch (e) {
				console.log('catch -> e:', e)
			}
		},
		deleteUser(_id) {
			console.log('delete _id:', _id)
			try {
				// let data = await this.$api.user.addUser(this.user)
				// console.log('addUser data:', data)
				this.$api.user.deleteUser({ _id }).then((res) => {
					console.log('删除res：', res)
					this.getUserByAll()
				})
			} catch (e) {
				console.log('catch -> e:', e)
			}
		},
		updateUser(item) {
			console.log('update item:', item)
			Object.assign(this.user, item)
		}
	},
	filters: {
		GENDER_TYPE(key) {
			return SEX_ARR[key]
		}
	},
	components: {
		Header
	}
}
</script>
<style lang="stylus">
.home {
	.table {
		width: 1000px;

		& > .head {
			background: #f0f0f0;
			display: flex;

			& > li {
				font-weight: bold;
				padding: 10px;
				flex: 1;
			}
		}

		& > .list {
			& > li {
				font-size: 14px;
				border: 1px solid #dcdcdc;
				margin-top: 10px;
				display: flex;

				& > div {
					padding: 6px;
					flex: 1;
					text-align: left;
				}

				& > button {
					margin-left: 6px;
				}
			}
		}
	}

	.register {
		padding: 20px 20px 20px 0;

		& > .form {
			& > .password, & > .sex {
				margin: 10px 0;
			}
		}
	}
}
</style>

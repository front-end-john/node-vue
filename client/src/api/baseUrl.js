let baseUrl = '/api' // 本地代理

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://localhost:3000' // 本地环境url
    break
  case 'dev':
    baseUrl = 'http://localhost:3000' // 测试环境url
    break
  case 'pre':
    baseUrl = '' // 预上线环境url
    break
  case 'production':
    baseUrl = '' // 生产环境url
    break
}

export default baseUrl

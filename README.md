# SE6317

## Backend 启动测试

### 配置
```
mv .env.example .env
```

配置自己的MongoDB数据库和和JWT密钥

安装依赖(请先安装node.js ):
```
npm install
```

本地测试
```
node index.js
```

## 后端接口

|方法 | 接口 | 功能描述 | 权限 |
| -- |---| ---| --- | 
|POST| /api/login/ | 登陆获取token | 无
|POST| /api/signup/ | 注册 | 无|
|POST| /api/updatepasswd|更改密码 | user| 
|GET| /api/blogs/ | 获取博客列表| 无|
|GET| /api/blogs/:blogid| 获取单个博客| 无|
|DELETE | /api/blogs/:blogid|删除博客|user|
|GET| /api/:userid/ | 获取用户信息| user|
|GET| /api/:userid/blogs| 获取用户博客列表| user|
|POST| /api/addblog/| 添加博客| user |
|POST| /api/blogs/:blogid/comments/| 为博客添加评论| user | 
|DELETE| /api/blogs/:blogid/comments/|删除评论| user |

# 南邮ICPC校队代码打印平台 网页端

服务端见此仓库：

## 开始使用

克隆并安装依赖：

```bash
git clone https://github.com/xjzsq/NJUPT-ICPC-Printer-Front-End.git
cd NJUPT-ICPC-Printer-Front-End
yarn
yarn add @ant-design/icons
```

然后使用 `yarn start `即可运行在 `http://localhost:3000` 端口。

使用 `yarn build` 即可打包（并没有用过）。

## 应用场景

由于只有内网打印需求，所以直接用[小皮面板](https://www.xp.cn/)启了一个 `nginx`，做如下配置：（小皮面板里面还不能直接点出来 `nginx` 配置，需要去他的安装目录的 `\Extensions\Nginx1.15.11\conf\vhosts\` 修改对应的配置，此处修改的是默认 `0localhost_80.conf` 的配置，按道理来讲只对 `localhost` 起作用，不知道为啥直接内网访问 `ip` 地址也可以，管他呢，那我就不用再根据 `ip` 地址配了.jpg ）

```nginx
server {
    listen        80; 
    server_name  localhost; 
    
    location /api/ { 
        rewrite  ^/api/(.*)$ /$1 break; 
		proxy_pass http://127.0.0.1:6088/; 
    } 
    location / { 
        proxy_pass http://127.0.0.1:3000/; 
		proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

然后使用 `yarn start` 启动前端，`py 1.py` 启动后端，把内网地址挂到比赛页面就可以了~

### Todo

基本上不可能做的：

- [x] 基本功能
- [ ] 记住队伍名字，下次自动填写
- [ ] 修复输入框不能输入 `tab` 等按键


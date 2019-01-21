From node:carbon

# 工作的文件夹
WORKDIR /

# 使用通配符复制 package.json 与 package-lock.json
COPY package*.json ./


# 使用通配符确保 package.json 与 package-lock.json 复制到需要的地方。（npm 版本 5 以上） COPY package*.json ./
# 全局安装 nodemon 以实现热更新
RUN npm install -g nodemon

# 安装 app 依赖
RUN npm install
# 如果你需要构建生产环境下的代码，请使用：
# RUN npm install --only=production

# 如需对 react/vue/angular 打包，生成静态文件，使用：
# RUN npm run build

# 打包 app 源码
COPY src /app

EXPOSE 3003
CMD [ "nodemon", " ./bin/www" ]
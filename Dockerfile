# 使用 Node.js 來建構 Vite 專案
FROM node:latest

WORKDIR /kingxia/website

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝專案依賴
RUN npm install

# 複製專案所有檔案
COPY . /kingxia/website

EXPOSE 8080
# 執行 Vite 開發模式
CMD ["npm", "run", "build"]

VOLUME /kingxia/website/dist
# 🚀 部署指南

## 部署到 Cloudflare Pages

### 第一步：准备代码
1. ✅ API密钥已从代码中移除
2. ✅ 创建了 `.gitignore` 文件
3. ✅ 添加了 `_headers` 和 `_redirects` 配置

### 第二步：上传到 GitHub
```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: 南京红姐AI聊天网站"

# 添加远程仓库（替换为你的GitHub仓库地址）
git remote add origin https://github.com/你的用户名/南京红姐.git

# 推送到GitHub
git push -u origin main
```

### 第三步：在Cloudflare Pages中配置

1. **创建项目**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 进入 Pages 页面
   - 点击 "创建项目"
   - 选择 "连接到Git"
   - 选择你的GitHub仓库

2. **设置构建配置**
   - 构建命令：留空（静态网站无需构建）
   - 构建输出目录：`/`（根目录）
   - 根目录：`/`

3. **⚠️ 重要：设置环境变量**
   - 在项目设置中找到 "环境变量"
   - 添加变量：
     - 变量名：`AI_API_KEY`
     - 值：你的SiliconFlow API密钥
     - 环境：选择 "生产" 和 "预览"

4. **部署**
   - 点击 "保存并部署"
   - 等待部署完成

### 第四步：配置自定义域名（可选）
1. 在Cloudflare Pages项目中点击 "自定义域"
2. 添加你的域名
3. 按照说明配置DNS记录

## 🔒 安全须知

### API密钥安全
- ✅ **永远不要**在前端代码中硬编码API密钥
- ✅ 使用Cloudflare Pages的环境变量功能
- ✅ 如果需要本地开发，使用 `.env` 文件（已添加到 `.gitignore`）

### 备用方案
如果API密钥未配置或API调用失败，网站会自动启用降级模式：
- 使用预设的简单回复
- 基于关键词的基础对话
- 保持用户体验的连续性

## 🧪 测试部署

### 本地测试
1. 创建 `.env` 文件（基于 `.env.example`）
2. 填入你的API密钥
3. 使用静态服务器运行：
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   ```

### 线上测试
1. 访问你的Cloudflare Pages域名
2. 测试首页功能
3. 测试聊天功能
4. 检查AI回复是否正常

## 🔧 故障排除

### API不工作
1. 检查Cloudflare Pages环境变量是否正确设置
2. 检查API密钥是否有效
3. 查看浏览器控制台的错误信息
4. 使用 `/test` 页面测试API连接

### 静态资源问题
1. 检查文件路径是否正确
2. 确认 `_headers` 文件配置正确
3. 清除浏览器缓存

### 路由问题
1. 检查 `_redirects` 文件配置
2. 确认Cloudflare Pages的路由规则

## 📞 联系支持
如有问题，请检查：
1. Cloudflare Pages文档
2. SiliconFlow API文档
3. 项目GitHub Issues 
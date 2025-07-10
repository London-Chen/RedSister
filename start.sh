#!/bin/bash

# 南京红姐网站本地开发启动脚本

echo "🚀 启动南京红姐网站本地开发服务器..."

# 检查是否存在.env文件
if [ ! -f ".env" ]; then
    echo "⚠️  警告：未找到.env文件"
    echo "   如需使用AI功能，请："
    echo "   1. 复制 .env.example 为 .env"
    echo "   2. 在 .env 中设置你的 AI_API_KEY"
    echo ""
fi

# 尝试使用不同的服务器
if command -v python3 &> /dev/null; then
    echo "使用Python服务器..."
    echo "🌐 访问地址: http://localhost:8000"
    echo "🏠 首页: http://localhost:8000/index.html"
    echo "💬 聊天页: http://localhost:8000/chat.html"
    echo "🧪 测试页: http://localhost:8000/test-ai.html"
    echo ""
    echo "按 Ctrl+C 停止服务器"
    python3 -m http.server 8000
elif command -v node &> /dev/null; then
    echo "使用Node.js服务器..."
    echo "🌐 访问地址: http://localhost:8000"
    npx serve . -p 8000
else
    echo "❌ 错误：需要安装 Python3 或 Node.js"
    echo "   请安装其中一个后重试"
    exit 1
fi 
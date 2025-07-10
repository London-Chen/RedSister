#!/bin/bash

echo "🚀 开始构建南京红姐项目..."

# 检查是否存在API密钥环境变量
if [ -z "$AI_API_KEY" ]; then
    echo "⚠️ 警告: 未设置AI_API_KEY环境变量"
    echo "💡 AI功能将使用降级模式"
else
    echo "✅ 检测到API密钥环境变量"
    # 替换配置文件中的模板变量
    sed -i "s/{{AI_API_KEY}}/$AI_API_KEY/g" js/config.js
    echo "✅ API密钥已注入到配置文件"
fi

echo "🎉 构建完成！" 
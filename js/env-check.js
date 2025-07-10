// 环境变量检查和调试脚本

// 在页面加载时检查环境变量
(function() {
    console.log('🔍 环境变量检查开始...');
    
    // 检查所有可能的环境变量
    const possibleKeys = [
        'AI_API_KEY',
        'API_KEY', 
        'OPENAI_API_KEY',
        'SILICONFLOW_API_KEY'
    ];
    
    let foundKey = null;
    
    possibleKeys.forEach(key => {
        if (typeof window[key] !== 'undefined') {
            console.log(`✅ 找到环境变量: ${key}`);
            foundKey = key;
            // 将找到的API密钥设置为标准变量名
            window.AI_API_KEY = window[key];
        } else {
            console.log(`❌ 未找到环境变量: ${key}`);
        }
    });
    
    // 尝试从Cloudflare Pages的运行时环境获取
    if (!foundKey && typeof process !== 'undefined' && process.env) {
        possibleKeys.forEach(key => {
            if (process.env[key]) {
                console.log(`✅ 从process.env找到: ${key}`);
                window.AI_API_KEY = process.env[key];
                foundKey = key;
            }
        });
    }
    
    // 最后检查
    if (window.AI_API_KEY) {
        console.log('🎉 API密钥已成功设置');
        // 不要在控制台显示完整密钥，只显示前几位
        const keyPreview = window.AI_API_KEY.substring(0, 8) + '...';
        console.log(`🔑 密钥预览: ${keyPreview}`);
    } else {
        console.warn('⚠️ 未找到API密钥，将使用降级模式');
        
        // 提供设置密钥的方法
        window.setAPIKey = function(key) {
            if (key && typeof key === 'string') {
                localStorage.setItem('hongJie_apiKey', key);
                window.AI_API_KEY = key;
                console.log('✅ API密钥已设置到localStorage');
                return true;
            } else {
                console.error('❌ 请提供有效的API密钥');
                return false;
            }
        };
        
        console.log('💡 临时解决方案：在控制台执行 setAPIKey("你的密钥") 来设置API密钥');
    }
})(); 
// 主要JavaScript功能文件

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('南京红姐网站已加载');
    
    // 初始化所有功能
    initializeNavigation();
    initializeFAQ();
    initializeScrollEffects();
    initializeButtons();
});

// 导航功能初始化
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // 滚动时导航栏透明度变化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(26, 28, 46, 0.95)';
        } else {
            navbar.style.backgroundColor = 'var(--primary-bg)';
        }
    });
}

// FAQ交互功能
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // 初始状态：隐藏答案
        answer.style.display = 'none';
        question.style.cursor = 'pointer';
        
        // 添加点击事件
        question.addEventListener('click', function() {
            const isVisible = answer.style.display === 'block';
            
            // 关闭所有其他FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.faq-question').classList.remove('active');
                }
            });
            
            // 切换当前FAQ
            if (isVisible) {
                answer.style.display = 'none';
                question.classList.remove('active');
            } else {
                answer.style.display = 'block';
                question.classList.add('active');
                
                // 平滑滚动到该项目
                item.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        });
        
        // 添加激活状态样式
        question.addEventListener('mouseenter', function() {
            if (!question.classList.contains('active')) {
                question.style.color = 'var(--accent-primary)';
            }
        });
        
        question.addEventListener('mouseleave', function() {
            if (!question.classList.contains('active')) {
                question.style.color = 'var(--text-primary)';
            }
        });
    });
}

// 滚动效果初始化
function initializeScrollEffects() {
    // 创建Intersection Observer用于滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.feature-card, .faq-item, .about-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 按钮功能初始化
function initializeButtons() {
    // 获取所有开始聊天按钮
    const chatButtons = document.querySelectorAll('.btn-primary, .start-chat-btn');
    
    chatButtons.forEach(button => {
        button.addEventListener('click', startChat);
    });
    
    // 了解更多按钮
    const learnMoreBtn = document.querySelector('.btn-secondary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.features-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}

// 开始聊天功能
function startChat() {
    // 检查是否存在聊天页面
    if (document.querySelector('#chat-container')) {
        // 如果在同一页面，显示聊天容器
        showChatInterface();
    } else {
        // 跳转到聊天页面
        window.location.href = 'chat.html';
    }
}

// 显示聊天界面（如果在同一页面）
function showChatInterface() {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
        chatContainer.style.display = 'flex';
        chatContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// 平滑滚动到页面顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 工具函数：防抖
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    // 按Escape键关闭所有FAQ
    if (e.key === 'Escape') {
        const faqAnswers = document.querySelectorAll('.faq-answer');
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqAnswers.forEach(answer => {
            answer.style.display = 'none';
        });
        
        faqQuestions.forEach(question => {
            question.classList.remove('active');
        });
    }
    
    // 按Enter键开始聊天（当焦点在CTA按钮上时）
    if (e.key === 'Enter' && e.target.classList.contains('btn-primary')) {
        startChat();
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 页面性能监控
window.addEventListener('load', function() {
    // 页面加载完成后记录性能
    setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('页面加载时间:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }, 100);
});

// 导出函数供其他脚本使用
window.SiteUtils = {
    startChat,
    scrollToTop,
    throttle,
    debounce
}; 
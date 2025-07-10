// 聊天功能JavaScript文件

// 聊天状态管理
let chatState = {
    messages: [],
    isTyping: false,
    messageIdCounter: 0,
    aiEnabled: true // 标识是否启用AI功能
};

// 页面加载完成后初始化聊天功能
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
});

// 初始化聊天功能
function initializeChat() {
    console.log('聊天功能已初始化');
    
    setupInputHandlers();
    setupKeyboardShortcuts();
    loadWelcomeMessage();
    updateAIStatus();
    
    // 聚焦到输入框
    document.getElementById('messageInput').focus();
}

// 更新AI状态显示
function updateAIStatus() {
    const statusElement = document.getElementById('aiStatus');
    if (statusElement) {
        if (window.AIChat && chatState.aiEnabled) {
            statusElement.textContent = '🤖 AI已就绪';
            statusElement.style.color = 'var(--accent-primary)';
        } else {
            statusElement.textContent = '⚠️ AI离线';
            statusElement.style.color = '#f59e0b';
        }
    }
}

// 设置输入处理器
function setupInputHandlers() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const charCount = document.getElementById('charCount');
    
    // 监听输入变化
    messageInput.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        
        // 自动调整高度
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        
        // 更新发送按钮状态
        updateSendButtonState();
    });
    
    // 监听键盘事件
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 发送按钮点击事件
    sendButton.addEventListener('click', sendMessage);
}

// 设置键盘快捷键
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter 发送消息
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            sendMessage();
        }
        
        // Escape 键清空输入框
        if (e.key === 'Escape') {
            document.getElementById('messageInput').value = '';
            updateSendButtonState();
        }
    });
}

// 加载欢迎消息
function loadWelcomeMessage() {
    // 欢迎消息已经在HTML中预设了
    const messagesContainer = document.getElementById('messagesContainer');
    scrollToBottom();
}

// 发送消息
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (!messageText || chatState.isTyping) {
        return;
    }
    
    // 添加用户消息
    addMessage(messageText, 'user');
    
    // 清空输入框
    messageInput.value = '';
    messageInput.style.height = 'auto';
    updateSendButtonState();
    
    // 显示红姐正在输入
    showTypingIndicator();
    
    try {
        // 使用AI生成回复
        if (chatState.aiEnabled && window.AIChat) {
            const response = await window.AIChat.generateResponse(messageText);
            hideTypingIndicator();
            addMessage(response, 'ai');
        } else {
            // 备用的简单回复
            setTimeout(() => {
                const fallbackResponse = "我现在有点忙，稍后再聊好吗～ 💋";
                hideTypingIndicator();
                addMessage(fallbackResponse, 'ai');
            }, 1000);
        }
    } catch (error) {
        console.error('发送消息失败:', error);
        hideTypingIndicator();
        addMessage("呵呵，我刚刚走神了...你刚才说什么？", 'ai');
    }
}

// 快速发送预设消息
function sendQuickMessage(message) {
    document.getElementById('messageInput').value = message;
    sendMessage();
}

// 添加消息到聊天窗口
function addMessage(text, type) {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageGroup = document.createElement('div');
    messageGroup.className = 'message-group';
    
    const message = document.createElement('div');
    message.className = `message ${type}-message`;
    
    const messageId = ++chatState.messageIdCounter;
    const timestamp = new Date().toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'});
    
    if (type === 'user') {
        message.innerHTML = `
            <div class="message-avatar">你</div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>${escapeHtml(text)}</p>
                </div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;
    } else {
        message.innerHTML = `
            <div class="message-avatar">
                <img src="红姐头像.png" alt="红姐" />
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>${text}</p>
                </div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;
    }
    
    messageGroup.appendChild(message);
    messagesContainer.appendChild(messageGroup);
    
    // 添加消息到状态
    chatState.messages.push({
        id: messageId,
        text: text,
        type: type,
        timestamp: new Date()
    });
    
    // 滚动到底部
    scrollToBottom();
    
    // 添加动画效果
    message.style.opacity = '0';
    message.style.transform = 'translateY(20px)';
    requestAnimationFrame(() => {
        message.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
    });
}



// 显示正在输入指示器
function showTypingIndicator() {
    chatState.isTyping = true;
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.classList.add('show');
    updateSendButtonState();
}

// 隐藏正在输入指示器
function hideTypingIndicator() {
    chatState.isTyping = false;
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.classList.remove('show');
    updateSendButtonState();
}

// 更新发送按钮状态
function updateSendButtonState() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const hasText = messageInput.value.trim().length > 0;
    
    sendButton.disabled = !hasText || chatState.isTyping;
    
    if (sendButton.disabled) {
        sendButton.style.opacity = '0.5';
    } else {
        sendButton.style.opacity = '1';
    }
}

// 滚动到底部
function scrollToBottom() {
    const messagesContainer = document.getElementById('messagesContainer');
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
}

// 清除对话
function clearConversation() {
    if (confirm('确定要清除所有对话记录吗？')) {
        const messagesContainer = document.getElementById('messagesContainer');
        messagesContainer.innerHTML = '';
        chatState.messages = [];
        
        // 清除AI对话历史
        if (window.AIChat) {
            window.AIChat.clearConversation();
        }
        
        loadWelcomeMessage();
    }
}

// 返回首页
function goHome() {
    if (confirm('确定要返回首页吗？当前对话将会丢失。')) {
        window.location.href = 'index.html';
    }
}

// 切换信息弹窗
function toggleInfo() {
    const infoModal = document.getElementById('infoModal');
    infoModal.classList.toggle('show');
}

// 点击弹窗外部关闭
document.addEventListener('click', function(e) {
    const infoModal = document.getElementById('infoModal');
    if (e.target === infoModal) {
        infoModal.classList.remove('show');
    }
});

// HTML转义函数，防止XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 格式化时间
function formatTime(date) {
    return date.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 保存聊天记录到本地存储（可选功能）
function saveChatHistory() {
    try {
        localStorage.setItem('hongJieChatHistory', JSON.stringify(chatState.messages));
    } catch (e) {
        console.warn('无法保存聊天记录:', e);
    }
}

// 加载聊天记录从本地存储（可选功能）
function loadChatHistory() {
    try {
        const history = localStorage.getItem('hongJieChatHistory');
        if (history) {
            chatState.messages = JSON.parse(history);
            // 可以选择是否重新显示历史消息
        }
    } catch (e) {
        console.warn('无法加载聊天记录:', e);
    }
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('聊天页面错误:', e.error);
    hideTypingIndicator();
});

// 导出函数供全局使用
window.ChatUtils = {
    sendMessage,
    sendQuickMessage,
    clearConversation,
    goHome,
    toggleInfo,
    saveChatHistory,
    loadChatHistory
};

console.log('聊天脚本已加载'); 
/* CUSTOM sb-chinese-labels.js — SillyBunny 新 UI 硬编码英文汉化补丁
   原理：SillyBunny 顶层导航/面板标题/按钮/弹窗/下拉选项等未接入官方
   i18n(tr/translate)，导致中文环境下仍显示英文。本脚本加载官方语言包，
   把英文文本节点替换为官方翻译；官方包缺失的 UI 词由内置 EXTRA 表兜底。
   不改官方源码，翻译与官方 zh-cn 包保持一致。 */
(function () {
    'use strict';

    var LANG = (localStorage.getItem('language') || navigator.language || 'en').toLowerCase();
    var candidates = [LANG];
    var base = LANG.split('-')[0];
    if (base && base !== LANG) candidates.push(base);
    candidates.push('en');

    var map = null;
    var mapLower = null;

    // 扩展翻译：官方语言包缺失但界面可见的 UI 词（按钮/弹窗/下拉选项，
    // 译法与官方 zh-cn 包保持一致；专有名词如 API/模型/预设/主题名不在此列）
    var EXTRA = {
        // 角色/首页
        'Roleplay': '角色扮演',
        'Information': '信息',
        'Definitions': '定义',
        'Greetings': '开场白',
        'Metadata': '元数据',
        'No character selected': '未选择角色',
        'Browse Characters': '浏览角色',
        'Browse': '浏览',
        'No entry selected': '未选择条目',
        'Tools': '工具',
        'Scenario Notes': '情景笔记',
        'Date added': '添加日期',
        'Quick Create': '快速创建',
        'Character Lore': '角色书',
        'Rename Group': '重命名群组',
        'Regenerate Thumbnail': '重新生成缩略图',
        'Link to Persona Lorebook': '关联到人物书',
        'Link to Chat Lorebook': '关联到聊天书',
        'No locks': '无锁定',
        'Import a character card': '导入角色卡',
        'Import from file': '从文件导入',
        'Import from URL': '从链接导入',
        'Preview final prompt for this chat': '预览本聊天最终提示词',
        'No Scenario Notes active for this chat.': '此聊天没有情景笔记。',
        'Select an entry to edit its keywords and content': '选择条目以编辑关键词与内容',
        'ST Default': 'ST 默认',
        'No chat selected': '未选择聊天',
        'Add New Greeting': '添加新开场白',
        'Speak Now': '立即朗读',
        // 世界书过滤器
        'Active': '活跃',
        'Constant': '永久',
        'Vectorized': '向量化',
        // 采样/预设
        'Save Profile': '保存配置',
        'Clear Profile': '清除配置',
        'Extra High': '额外高',
        'Reload': '重新加载',
        'Save server config': '保存服务端配置',
        'No matching models': '没有匹配的模型',
        'Save config': '保存配置',
        'Current profile': '当前配置',
        'No preset switch': '不切换预设',
        'Quick Setup': '快速设置',
        'Logs': '日志',
        'Reload file': '重新加载文件',
        'Refresh Now': '立即刷新',
        'Pause Live': '暂停实时',
        'Debug Logging: Disabled': '调试日志：已禁用',
        // 聊天/消息
        'Custom Instruction': '自定义指令',
        'Attachment on reply': '回复时附加',
        'New assistant message': '新建助手消息',
        'Hidden reply': '隐藏回复',
        'Latest user message': '最近用户消息',
        'Latest chat message': '最近聊天消息',
        'Memory Sharding': '记忆分片',
        'Open World Info': '打开世界书',
        'After Scenario': '情景之后',
        'Before User Message': '用户消息之前',
        'At Depth': '指定深度',
        'Replace tag and attach to tagged message': '替换标签并附加到带标签的消息',
        'Separate generated-image message': '单独生成图像消息',
        'Inline data URL': '内嵌数据链接',
        // 智能体/模板
        'Open Templates': '打开模板',
        'New Agent': '新智能体',
        'Templates': '模板',
        'Fix Trackers': '修复追踪器',
        'Cancel Agent': '取消智能体',
        'Quick Access': '快速访问',
        'Tracker': '追踪器',
        'Randomizer': '随机化',
        'Use selected connection profile': '使用所选连接配置',
        'Use Default Connection Profile': '使用默认连接配置',
        'Reset Bundled Agents to Defaults': '将内置智能体重置为默认',
        "Don't change": '不改变',
        'Pre-generation': '生成前',
        'Post-generation': '生成后',
        'Pre': '前置',
        'Post': '后置',
        'Both': '两者',
        'Rewrite': '重写',
        'Append': '追加',
        'In-Chat Agent': '聊天内智能体',
        'Companion': '同伴',
        'Companions': '同伴',
        'On Companions': '针对同伴',
        'To Companion': '转为同伴',
        'Blank': '空白',
        'Chain of Thought': '思维链',
        'Neutral - Chat': '中立 - 聊天',
        'Roleplay - Detailed': '角色扮演 - 详细',
        'Roleplay - Immersive': '角色扮演 - 沉浸',
        'Roleplay - Simple': '角色扮演 - 简单',
        'Writer - Creative': '作家 - 创意',
        'Writer - Realistic': '作家 - 写实',
        'Assistant - Expert': '助手 - 专家',
        'Assistant - Simple': '助手 - 简单',
        'Agents On': '智能体开启',
        'Think XML': '思考 XML',
        // 外观/主题/界面
        'Appearance': '外观',
        'Save Current': '保存当前',
        'Reset panels': '重置面板',
        'Reset to defaults': '重置为默认',
        'Reset to default': '重置为默认',
        'Reset to Default': '重置为默认',
        'Reset override': '重置覆盖',
        'Clear all cache': '清除全部缓存',
        'Clear cache only': '仅清除缓存',
        'Save thumbnails': '保存缩略图',
        'Use desktop recommended': '使用桌面推荐',
        'Use mobile recommended': '使用移动端推荐',
        'Check for updates': '检查更新',
        'Restart server': '重启服务端',
        'English': '英语',
        'Free': '免费',
        'Pro': '专业版',
        'Key': '密钥',
        // 文件/文件夹/管理
        'Import Folder': '导入文件夹',
        'Sync Extensions': '同步扩展',
        'Import Backup ZIP': '导入备份 ZIP',
        'New Folder': '新建文件夹',
        'Add to Folder': '添加到文件夹',
        'Remove from Folder': '从文件夹移除',
        'Save as Entry': '另存为条目',
        'Manage': '管理',
        'Manage Filters': '管理过滤器',
        'Temporary': '临时',
        'Locked to chat': '锁定到聊天',
        'Clear': '清除',
        'Clear All': '全部清除',
        'Clear Log': '清除日志',
        'Refresh Log': '刷新日志',
        'Refresh List': '刷新列表',
        'Preview': '预览',
        'Clean': '清理',
        'Insert Tags default': '插入标签默认值',
        'Insert Natural default': '插入自然默认值',
        'Insert default': '插入默认值',
        'Save for character': '为角色保存',
        // 图片生成
        'Generate missing sprites': '生成缺失的立绘',
        'Upload character sheet': '上传角色立绘',
        'Stop generation': '停止生成',
        'Remove all sprites': '移除全部立绘',
        'Vivid': '生动',
        'Natural': '自然',
        'Transparent': '透明',
        'Opaque': '不透明',
        'Balanced': '平衡',
        'Just Resize': '仅调整大小',
        'Apply Chat Image Defaults': '应用聊天图片默认值',
        'Chat Completions': '聊天补全',
        'Images Generations': '图像生成',
        'Extended': '扩展',
        'OpenAI Strict': 'OpenAI 严格',
        'Force On': '强制开启',
        'Force Off': '强制关闭',
        'Public URLs Only': '仅公共链接',
        'Inline Or URL': '内嵌或链接',
        'Bearer token': 'Bearer 令牌',
        'Custom header': '自定义请求头',
        'Query parameter': '查询参数',
        'Basic auth': '基础认证',
        'OpenAI-compatible images': 'OpenAI 兼容图像',
        'Simple JSON REST': '简易 JSON REST',
        'Async job API': '异步任务 API',
        'Multipart upload': '分块上传',
        'Immediate response': '立即响应',
        'Multipart form': '多部分表单',
        'Separate images': '分隔图片',
        'Use URL': '使用链接',
        'Prompt Priority': '提示词优先',
        'ControlNet Priority': 'ControlNet 优先',
        'Same as first pass': '与第一遍相同',
        'Reference Preservation': '参考保留',
        'Anatomy Repair': '解剖修复',
        'Custom Director': '自定义导演',
        'Auto detect': '自动检测',
        'Automatic': '自动',
        'Add image files': '添加图像文件',
        'Plain Description': '纯文本描述',
        'Save Recipe': '保存配方',
        // 摘要/诊断
        'Full Content': '完整内容',
        'Use main model': '使用主模型',
        'Choose a starting point...': '选择起点…',
        'Choose a prompt...': '选择提示词…',
        'Stage 1: Candidate Selector': '阶段 1：候选选择器',
        'Stage 2: Relevance Filter': '阶段 2：相关性过滤器',
        'Save Prompt': '保存提示词',
        'Create Summary': '创建摘要',
        'Save Summary': '保存摘要',
        'Summarized': '摘要',
        'Detailed': '详细',
        'Run Diagnostics': '运行诊断',
        'Copy Diagnostics': '复制诊断',
        'Label current': '标注当前',
        'Label dated': '标注日期',
        'days': '天',
        'weeks': '周',
        'months': '月',
        // 情感
        'admiration': '钦佩',
        'amusement': '愉悦',
        'anger': '愤怒',
        'annoyance': '恼怒',
        'approval': '认可',
        'caring': '关怀',
        'confusion': '困惑',
        'curiosity': '好奇',
        'desire': '渴望',
        'disappointment': '失望',
        'disapproval': '不赞同',
        'disgust': '厌恶',
        'embarrassment': '尴尬',
        'excitement': '兴奋',
        'fear': '恐惧',
        'gratitude': '感激',
        'grief': '悲伤',
        'joy': '快乐',
        'love': '喜爱',
        'nervousness': '紧张',
        'optimism': '乐观',
        'pride': '自豪',
        'realization': '领悟',
        'relief': '宽慰',
        'remorse': '懊悔',
        'sadness': '悲伤',
        'surprise': '惊讶',
    };

    function loadMap() {
        var i = 0;
        (function tryNext() {
            if (i >= candidates.length) return;
            var lang = candidates[i++];
            fetch('locales/' + lang + '.json', { cache: 'no-store' })
                .then(function (r) {
                    if (!r.ok) throw new Error('not found');
                    return r.json();
                })
                .then(function (data) {
                    // EXTRA 优先：官方包中部分 key 值为原文(如 "Chat Completions": "Chat Completions")，
                    // 需用 EXTRA 强制覆盖；官方已有真实翻译的 key 也以 EXTRA 为准(译法一致)
                    map = Object.assign({}, data, EXTRA);
                    mapLower = {};
                    for (var k in map) mapLower[k.toLowerCase()] = map[k];
                    scanAll();
                    hookLanguageSwitch();
                })
                .catch(tryNext);
        })();
    }

    // 语言切换下拉联动：切换后重新加载语言包并重扫
    function hookLanguageSwitch() {
        var sel = document.getElementById('ui_language_select');
        if (!sel || sel.dataset.sbZh) return;
        sel.dataset.sbZh = '1';
        sel.addEventListener('change', function () {
            setTimeout(function () {
                LANG = (sel.value || 'en').toLowerCase();
                candidates = [LANG];
                var b = LANG.split('-')[0];
                if (b && b !== LANG) candidates.push(b);
                map = null;
                mapLower = null;
                loadMap();
            }, 600);
        });
    }

    var IGNORE_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'TITLE', 'CODE', 'PRE']);

    function scan(root) {
        if (!map) return 0;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function (n) {
                var p = n.parentNode;
                if (!p || IGNORE_TAGS.has(p.tagName)) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            },
        });
        var n, replaced = 0;
        while ((n = walker.nextNode())) {
            var t = n.textContent.trim();
            if (!t || t.length > 80) continue;            // 长段落为新增说明，语言包无对应 key
            if (!/^[A-Za-z]/.test(t)) continue;           // 已翻译/非英文
            var val = map[t] || (mapLower && mapLower[t.toLowerCase()]);
            if (val && val !== t) {
                n.textContent = n.textContent.replace(t, val);
                replaced++;
            }
        }
        return replaced;
    }

    function scanAll() {
        document.querySelectorAll(
            '[data-sb-topbar-page], #sb-left-shell-toggle, #sb-right-shell-toggle, ' +
            '#sb-home-toggle, #sb-character-toggle, [data-sb-character-tab], ' +
            '.sb-shell-kicker, .sb-shell-title, #sb-mobile-nav, #sb-universal-search'
        ).forEach(scan);
        scan(document.body);
        localizePlaceholders();
    }

    function localizePlaceholders() {
        if (!map) return;
        document.querySelectorAll('[placeholder]').forEach(function (inp) {
            var ph = inp.getAttribute('placeholder');
            if (ph && map[ph] && map[ph] !== ph) inp.setAttribute('placeholder', map[ph]);
        });
    }

    var timer = null;
    function schedule() {
        if (timer) return;
        timer = setTimeout(function () { timer = null; scanAll(); }, 400);
    }

    function boot() {
        if (!LANG.startsWith('zh')) return; // 非中文环境无需补丁
        scanAll();
        new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
        setInterval(scanAll, 3000); // 兜底：官方动态重建标签
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
    loadMap();
})();

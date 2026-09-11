/**
 * In-Chat Agents 简体中文本地化适配层。
 *
 * 背景：本扩展的界面文案全部以英文字面量硬编码在 settings.html / editor.html 与各 JS 中，
 * 没有使用 SillyTavern 的 data-i18n / t()` 机制，因此公共语言包（public/locales/zh-cn.json）无法覆盖它。
 *
 * 做法：用一个不侵入业务逻辑的适配层完成汉化——
 *   1. TEXT 为「英文原文 → 中文译文」词典，按精确匹配替换文本节点与 title / placeholder / aria-label 属性；
 *   2. RULES 处理带变量的动态文案（如 "1 regex"、"Order 100"）；
 *   3. 仅在界面语言为中文时生效，其余语言原样保留英文；
 *   4. 想还原英文，删除本文件并移除 index.js 中的 installZhCnLocalization 调用即可。
 */

const TEXT = {
    // ========== settings.html：设置面板 ==========
    'Bundled trackers live in Templates': '内置追踪器位于「模板」中',
    'to browse and install the full built-in tracker library. They do not all appear in your list automatically.':
        '可浏览并安装完整的内置追踪器库，它们不会自动全部出现在你的列表中。',
    'Open Templates': '打开模板库',
    'Agents On': '智能体开启',
    'Enable or disable all In-Chat Agents without changing individual agent toggles':
        '一键启用/停用全部对话内智能体，不改变各智能体自身的开关',
    'Create a new agent from scratch': '从零创建一个新智能体',
    'New Agent': '新智能体',
    'Add pre-made agents from the template library': '从模板库添加预制智能体',
    'Templates': '模板',
    'Update every agent whose bundled template has a newer version': '更新所有内置模板有新版本的智能体',
    'Update All': '全部更新',
    'Re-run enabled tracker agents on the last assistant reply': '对最后一条 AI 回复重跑已启用的追踪器',
    'Fix Trackers': '修复追踪器',
    'Open the Companions dashboard: manage, run, and convert companion agents':
        '打开同伴面板：管理、运行与转换同伴智能体',
    'Companions': '同伴',
    'Convert every inline tracker agent to companion execution (auto loop, tracker panel)':
        '把所有内联追踪器转为同伴执行（自动循环 + 追踪面板）',
    'Trackers → Companions': '追踪器 → 同伴',
    'Stop the active agent generation': '停止当前智能体生成',
    'Cancel Agent': '取消生成',
    'Select multiple agents for bulk actions': '多选智能体以进行批量操作',
    'Select': '选择',
    'Import agent(s) from a JSON file': '从 JSON 文件导入智能体',
    'Export all agents to a file': '导出全部智能体到文件',
    'Select all agents': '全选所有智能体',
    'Select All': '全选',
    'Enable selected agents': '启用所选智能体',
    'Enable': '启用',
    'Enable selected post-generation agents on Companion Agent outputs': '让所选生成后智能体也作用于同伴输出',
    'On Companions': '作用于同伴',
    'Disable selected agents': '停用所选智能体',
    'Disable': '停用',
    'Set injection role to System for all selected agents': '将所选智能体的注入角色设为「系统」',
    'System': '系统',
    'Set injection role to User for all selected agents': '将所选智能体的注入角色设为「用户」',
    'User': '用户',
    'Convert selected agents to companion execution (side note cards under replies)':
        '将所选智能体转为同伴执行（作为回复下方的便签卡片）',
    'Bulk-edit properties for selected agents': '批量编辑所选智能体的属性',
    'Edit': '编辑',
    'Delete selected agents': '删除所选智能体',
    'Delete': '删除',
    'Cancel selection': '取消选择',
    'Cancel': '取消',
    'Agent list tabs': '智能体列表标签页',
    'All': '全部',
    'Quick Access': '快速访问',
    'Pre': '前置',
    'Post': '后置',
    'Search agents...': '搜索智能体...',
    'Tracker': '追踪器',
    'Randomizer': '随机化',
    'Content': '内容',
    'Companion': '同伴',
    'Custom': '自定义',
    'Agent Tokens': '智能体 Token',
    'Pin the agents you use most often for one-tap enable and disable.':
        '把你最常用的智能体固定在这里，一键启用或停用。',
    'No pinned agents yet. Use the star button on an agent card or in the editor to keep it here.':
        '还没有固定的智能体。在智能体卡片或编辑器里点击星标即可固定到这里。',
    'Quick Toggles': '快速开关',
    'Default Connection Profile': '默认连接配置',
    'Which connection profile to use when an agent does not have its own editor profile override. Leave this on the selected Connection Manager profile to follow the active profile.':
        '智能体没有自己的编辑器配置覆盖时使用的连接配置。保持「跟随所选连接配置」即跟随当前激活的配置。',
    'Use selected connection profile': '跟随所选连接配置',
    'Companion Connection Profile': '同伴连接配置',
    'Which connection profile Companion agents (trackers, notes) use when they do not have their own editor profile override. Leave empty to share the default above.':
        '同伴智能体（追踪器、便签）在没有自身编辑器配置覆盖时使用的连接配置。留空则共用上面的默认配置。',
    'Use Default Connection Profile': '使用默认连接配置',
    'Point this at a cheap, fast model — companions run on every reply.':
        '建议指向便宜快速的模型 —— 同伴会随每次回复运行。',
    'Append Agents Execution': '追加型智能体执行方式',
    'Run append-mode agents in parallel (faster, may hit rate limits) or sequentially (slower, avoids rate limits).':
        '追加型智能体并行执行（更快，可能触发速率限制）或顺序执行（更慢，可避免速率限制）。',
    'Parallel (faster)': '并行（更快）',
    'Sequential (rate-limit friendly)': '顺序（更省速率限制）',
    'Sequential runs append-mode agents one after another in Order ascending.':
        '顺序模式按「顺序」值升序逐个运行追加型智能体。',
    'Order is shown on each agent card.': '顺序值显示在每个智能体卡片上。',
    'Companion Execution': '同伴执行方式',
    'Run companion agents in parallel (faster) or sequentially (rate-limit friendly), independent of the append agents setting.':
        '同伴智能体并行（更快）或顺序（更省速率限制）执行，独立于追加型智能体的设置。',
    'Run companion agents at the same time as post-generation passes instead of after them. Faster, but companions see the reply before post passes edit it.':
        '让同伴与生成后处理同时运行，而不是在其之后。更快，但同伴看到的是被后处理修改前的回复。',
    'Run Companions Alongside Post-Gen Passes': '同伴与生成后处理同时运行',
    'Helper Prefill Messages': '助手预填消息',
    'Use [system], [user], or [assistant] blocks. Text before any header is treated as [assistant].':
        '使用 [system]、[user]、[assistant] 块。任何标头之前的文本按 [assistant] 处理。',
    'Separate Agents Between Individual and Group Chats': '单聊与群聊分别保存启用的智能体',
    'Keep enabled In-Chat Agents separate between Individual chats and Group chats.':
        '让单聊和群聊中启用的对话内智能体互不影响。',
    'Allow prompt pass toast notifications': '允许提示词处理弹出通知',
    'Master switch for prompt pass toasts. Per-agent notification checkboxes still decide which agents can show them.':
        '提示词处理通知的总开关。具体哪些智能体能弹出仍由各自的勾选项决定。',
    'View main LLM output before pre-generation intercept': '生成前拦截前先查看主模型输出',
    'Enable Pathfinder submodule': '启用 Pathfinder 子模块',
    'Enable or disable the built-in Pathfinder submodule without disabling shared In-Chat Agents.':
        '单独启用/停用内置 Pathfinder 子模块，不影响共用的对话内智能体。',
    'Reset all bundled agents to their original template settings (custom agents are not affected)':
        '将所有内置智能体恢复为原始模板设置（不影响自定义智能体）',
    'Reset Bundled Agents to Defaults': '恢复内置智能体默认值',
    'Bulk Edit Selected Agents': '批量编辑所选智能体',
    'Choose which properties to change. Set a value to apply it; leave a field at its default to skip it.':
        '选择要修改的属性。填入值即应用；保持默认则跳过该项。',
    'Injection Role': '注入角色',
    "Don't change": '不修改',
    'Phase': '阶段',
    'Both': '两者',
    'Prompt Pass Mode': '提示词处理模式',
    'Rewrite': '改写',
    'Append': '追加',
    'Prompt Pass Enabled': '启用提示词处理',
    'Utility Post-Process Enabled': '启用工具型后处理',
    'Scan World Info': '扫描世界信息',
    'Enabled': '启用',
    'Disabled': '停用',
    'Apply': '应用',

    // ========== editor.html：智能体编辑器 ==========
    'Name': '名称',
    'Agent name': '智能体名称',
    'Category': '分类',
    'Pre-generation': '生成前',
    'Post-generation': '生成后',
    'Execution': '执行方式',
    'Inline: inject, intercept, regex, or rewrite the reply': '内联：注入、拦截、正则或改写回复',
    'Companion: run separately and save a note card': '同伴：独立运行并保存一张便签卡片',
    'Companion execution never edits the assistant message. Tracker agents can use companion execution when you want their output as a side note instead of inline text.':
        '同伴执行永远不会修改 AI 回复。想让追踪器的输出作为便签而不是内联文本时，可切换为同伴执行。',
    'Description': '描述',
    'Short description': '简短描述',
    'Pin to Quick Toggles': '固定到快速开关',
    'Prompt': '提示词',
    'Preview the prompt after macro substitution': '预览宏替换后的提示词',
    'Preview': '预览',
    'Refine with AI': '用 AI 润色',
    'Refine': '润色',
    'Toggle fullscreen editor': '切换全屏编辑器',
    'Connection Profile': '连接配置',
    '(overrides the extension default connection profile for this agent\'s AI refinement, pre-generation intercepts, and prompt-based post-generation rewrites)':
        '（覆盖扩展默认连接配置，作用于该智能体的 AI 润色、生成前拦截以及基于提示词的生成后改写）',
    'Use extension default': '使用扩展默认配置',
    'Model Override': '模型覆盖',
    '(optional model name to use instead of the profile\'s default model, e.g., "claude-sonnet-4-6" or "gpt-4")':
        '（可选。用指定模型替代配置里的默认模型，例如 "claude-sonnet-4-6" 或 "gpt-4"）',
    'Leave empty to use profile default': '留空则使用配置默认模型',
    'Write your agent prompt here. Supports macros: {{char}}, {{user}}, {{random::a::b::c}}, etc.':
        '在此编写智能体提示词。支持宏：{{char}}、{{user}}、{{random::a::b::c}} 等。',
    'Companion Settings': '同伴设置',
    'Create a companion prompt with AI': '用 AI 生成同伴提示词',
    'AI Maker': 'AI 生成',
    'Preview feedback notes injected into the next generation': '预览将注入下一轮生成的反馈便签',
    'Preview Feedback': '预览反馈',
    'Companions run after the main reply and render below it. Use Hidden when the note should only feed future prompts through feedback.':
        '同伴在主回复之后运行并渲染在回复下方。若便签只需通过反馈喂给后续提示词，请选择「隐藏反馈便签」。',
    'Chatroom Style': '聊天室风格',
    'Mixed': '混合',
    'In-world': '世界内',
    'Discord / Twitch': 'Discord / Twitch',
    'Twitter / X': 'Twitter / X',
    'Reddit': 'Reddit',
    'AO3 / Wattpad': 'AO3 / Wattpad',
    'Newsroom': '新闻编辑室',
    'Thread-board / 4chan': '串板 / 4chan',
    'Infomercial': '电视购物',
    'Injected into Chatroom runs, so the output can stay compact and render through bundled regex.':
        '会注入到「聊天室」的运行中，使输出保持紧凑并通过内置正则渲染。',
    'Active Custom Style': '启用的自定义风格',
    'Add styles below': '在下方添加风格',
    'Custom Style Library': '自定义风格库',
    'Add one reusable style per line as Name: instructions, then pick which one this Chatroom uses.':
        '每行一个可复用风格，格式为「名称：说明」，再选择本聊天室使用哪一个。',
    'Extra Character Reactors': '额外角色反应者',
    'Select character cards outside the current chat or group. Chatroom can use them as in-world commenters, not as active scene participants.':
        '选择当前聊天或群组之外的角色卡，聊天室会把它们当作世界内的评论者，而非在场参与者。',
    'Director Voice': '导演旁白音色',
    'Active Narration Voice': '当前旁白音色',
    'Conspiratorial Absurdity': '阴谋荒诞',
    'Bureaucratic Irony': '官僚反讽',
    'Cosmic Playbook': '宇宙剧本',
    'Beige Undercurrents': '平淡暗流',
    'Gossipy Voyeurism': '八卦窥私',
    'Cruel Realism': '残酷写实',
    'Solemn Witness': '肃穆见证',
    'Grand Satirical Stage': '宏大讽刺舞台',
    'Randomised': '随机',
    'Choose one of the preset Narration Voices or use your active preset variable.':
        '选择一个预设旁白音色，或使用你当前预设变量。',
    'Active Custom Voice': '启用的自定义音色',
    'Add voices below': '在下方添加音色',
    'Custom Voice Library': '自定义音色库',
    'Add one reusable voice per line as Name: instructions, then pick which one Director\'s Commentary uses.':
        '每行一个可复用音色，格式为「名称：说明」，再选择「导演评论」使用哪一个。',
    'Plot Objective': '剧情目标',
    'Example: steer the story toward the hidden tower without forcing the scene':
        '例如：把故事引向隐藏高塔，但不要强行推动场景',
    'Injected into Plot Compass runs and editable any time from this agent\'s settings.':
        '会注入到「剧情罗盘」的运行中，随时可在该智能体设置里修改。',
    'Order': '顺序',
    'Lower numbers run earlier when Append Agents Execution is set to Sequential.':
        '当「追加型智能体执行方式」为顺序时，数值越小越先运行。',
    'Trigger': '触发方式',
    'Auto after matching replies': '匹配到回复后自动运行',
    'Manual only': '仅手动',
    'Display': '显示方式',
    'Show note card': '显示便签卡片',
    'Tracker panel only': '仅追踪面板',
    'Hidden feedback note': '隐藏的反馈便签',
    'Format': '格式',
    'Markdown': 'Markdown',
    'Safe HTML': '安全 HTML',
    'Plain text': '纯文本',
    'Context Messages': '上下文消息数',
    'Min Context Tokens': '最小上下文 Token',
    'Only auto-run once the chat reaches roughly this many tokens. 0 runs always.':
        '仅当对话达到约这么多 Token 后才自动运行。填 0 表示始终运行。',
    'History Depth': '历史深度',
    'Max Tokens': '最大 Token',
    'Include character card': '包含角色卡',
    'Include persona': '包含人设',
    'Include World Info': '包含世界信息',
    'Include Author\'s Note': '包含作者注释',
    'Include System Prompt': '包含系统提示词',
    'Include prior notes': '包含历史便签',
    'Keep this agent in Chat History': '在聊天历史中保留该智能体',
    'Feed recent notes into future generations': '把最近的便签喂给后续生成',
    'Send the agent prompt exactly as written, without appending format instructions. Recommended for trackers that define their own output format.':
        '按原样发送智能体提示词，不追加格式说明。推荐用于自带输出格式的追踪器。',
    'Use agent prompt as-is (no added instructions)': '原样使用智能体提示词（不追加说明）',
    'Notes to keep': '保留的便签数',
    'Keeps this agent\'s most recent notes in the AI\'s context. Only notes that finished generating are counted.':
        '把该智能体最近的便签保留在 AI 上下文中。仅统计已完成生成的便签。',
    'Keep all notes instead': '改为保留全部便签',
    'Keep notes in context even when their message is hidden': '即使对应消息被隐藏也保留便签到上下文',
    'Feedback Depth': '反馈深度',
    'Feedback notes use the agent\'s Position, Depth, Role, and World Info scan fields from Pre-Generation Settings.':
        '反馈便签使用「生成前设置」中的位置、深度、角色与世界信息扫描字段。',
    'When selected companions use the same profile, model, and context settings, they share one model request.':
        '当所选同伴使用相同的配置、模型与上下文设置时，它们共用一次模型请求。',
    'Run selected companions in one request': '让所选同伴共用一次请求',
    'Off by default. Turn it on to fetch currently enabled side companions, then pick which ones can share this agent\'s request.':
        '默认关闭。开启后会读取当前启用的侧边同伴，再挑选哪些可以共用该智能体的请求。',
    'Batch With Enabled Companions': '与已启用同伴合并请求',
    'Only selected companions can batch together. Agents with different models, profiles, or context settings still run separately.':
        '只有被选中的同伴才能合并。模型、配置或上下文设置不同的智能体仍会分别运行。',
    'Send this companion\'s latest completed output to selected companions as extra prompt context before they generate.':
        '在所选同伴生成之前，把该同伴最近一次完成的输出作为额外提示词上下文发送给它们。',
    'Send context to the following Companion Agents before generation': '生成前把上下文发送给以下同伴智能体',
    'Companion Agents Receiving This Context': '接收该上下文的同伴智能体',
    'Selected companions receive this companion\'s latest available output in their prompt context before they generate.':
        '被选中的同伴会在生成前收到该同伴最近一次可用输出的提示词上下文。',
    'Re-run After These Companions Update': '当这些同伴更新后重新运行',
    'When selected companions are also running, wait for them to finish before this companion generates.':
        '当所选同伴也在运行时，等待它们完成后再运行该同伴。',
    'Delay until selected companions finish': '延迟到所选同伴完成',
    'This companion will automatically re-run when any selected companion produces new output.':
        '当任一被选中的同伴产出新内容时，该同伴会自动重新运行。',
    'Custom Tracker Builder': '自定义追踪器构建器',
    'Generate Kit': '生成工具包',
    'Paste a tracker example and optional rules/style notes. Fairy will generate the prompt, extract pattern, and beautification regex for you.':
        '粘贴一个追踪器示例以及可选的规则/样式说明，AI 会自动生成提示词、提取正则与美化正则。',
    'Tracker Format Example': '追踪器格式示例',
    'Rules / Behavior Notes': '规则 / 行为说明',
    '(optional)': '（可选）',
    'When it should appear, what should count as a change, any mandatory fields, etc.':
        '何时出现、什么算作变化、有哪些必填字段等。',
    'HTML / Style Notes': 'HTML / 样式说明',
    'Example: soft blue card, compact badge chips, show the note body in a bordered block':
        '例如：柔和的蓝色卡片、紧凑的徽章标签、便签正文放在带边框的区块里',
    'Pre-Generation Settings': '生成前设置',
    'Mode': '模式',
    'Inject prompt into context': '把提示词注入上下文',
    'Run agent to modify outgoing context': '运行智能体以改写将要发送的上下文',
    'Timing': '时机',
    'Post-main generation': '主模型生成后',
    'Apply Mode': '应用方式',
    'Replace context': '替换上下文',
    'Wrap / append': '包裹 / 追加',
    'Patch via tags': '按标签打补丁',
    'Insert Position': '插入位置',
    'After original context': '原上下文之后',
    'Before original context': '原上下文之前',
    'Wrap Prefix': '包裹前缀',
    'Text before the agent output': '智能体输出之前的文本',
    'Wrap Suffix': '包裹后缀',
    'Text after the agent output': '智能体输出之后的文本',
    'Patch Start Tag': '补丁起始标签',
    'Patch End Tag': '补丁结束标签',
    'Pre-generation timing runs before the main model receives the assembled context. Post-main timing runs after the main model finishes and before the response is shown or saved. Agents run by Order. Replace mode expects a full replacement context in pre-generation timing; for chat completion that must be a JSON array of chat messages. Wrap and patch add a new message on chat-completion APIs using the Role below.':
        '「生成前」时机在主模型收到组装好的上下文之前运行；「主模型生成后」在主模型完成、回复尚未显示或保存之前运行。智能体按「顺序」值依次运行。替换模式在生成前时机需要给出完整的替换上下文，对聊天补全接口而言必须是聊天消息的 JSON 数组。包裹与打补丁会在聊天补全接口上用下面的「角色」新增一条消息。',
    'Inject mode uses the existing extension prompt path. Position, Depth, Role, and World Info scanning control where the prompt is inserted.':
        '注入模式沿用扩展提示词通道，由位置、深度、角色与世界信息扫描决定提示词插入的位置。',
    'Position': '位置',
    'In Prompt': '提示词内',
    'In Chat': '聊天内',
    'Before Prompt': '提示词之前',
    'Depth': '深度',
    'Role': '角色',
    'Assistant': '助手',
    'Scan for World Info keywords': '扫描世界信息关键词',
    'Agent Regex': '智能体正则',
    'Load Bundled Regex': '载入内置正则',
    'Add Regex': '添加正则',
    'Attach ST-style regex scripts that run when this agent activates.':
        '挂载 ST 风格的正则脚本，在该智能体激活时运行。',
    'Post-Generation Actions': '生成后动作',
    'Use Agent Regex above for ST-style regex scripts. This section can run the agent prompt as a second-pass rewrite or append pass and still supports extract/append helpers.':
        'ST 风格的正则脚本请使用上方的「智能体正则」。本区可让智能体提示词作为第二轮改写或追加处理运行，并支持提取/追加等辅助动作。',
    'Use this agent prompt as a post-generation prompt pass': '把该智能体提示词用作生成后提示词处理',
    'Rewrite current message': '改写当前消息',
    'Append generated content': '追加生成内容',
    'Show toast notifications while this prompt pass runs': '该提示词处理运行时显示通知',
    'The prompt pass runs after the main reply using this agent\'s prompt and connection profile. In':
        '提示词处理在主回复之后运行，使用该智能体的提示词与连接配置。',
    'rewrite': '改写',
    'append': '追加',
    'mode it replaces the message. In': '模式会替换整条消息；在',
    'mode it only adds newly generated text after the original reply. Useful macros inside the prompt include':
        '模式只会在原回复之后追加新生成的文本。提示词中可用的宏包括',
    'Run this agent\'s post passes (prompt pass + Agent Regex) on generated impersonation text':
        '对生成的扮演文本运行该智能体的后处理（提示词处理 + 智能体正则）',
    'Run this agent\'s post passes (prompt pass + Agent Regex) on companion agent outputs':
        '对同伴智能体的输出运行该智能体的后处理（提示词处理 + 智能体正则）',
    'Companion targets': '同伴目标',
    '(none selected = all companions)': '（不选则作用于全部同伴）',
    'When a targeted companion finishes a note, this agent\'s post-generation prompt pass and Agent Regex scripts run on that note before it is stored, so the panel, message cards, feedback injection, and dependent companions all see the transformed version. Avoid targeting structured tracker companions with prose rewrites.':
        '当目标同伴完成一张便签时，该智能体的生成后提示词处理与正则脚本会在便签保存前运行，因此面板、消息卡片、反馈注入以及依赖它的同伴都会看到处理后的版本。请避免对结构化追踪器同伴使用散文改写。',
    'Enable utility post-processing': '启用工具型后处理',
    'Type': '类型',
    'Extract to Variable': '提取到变量',
    'Append Text': '追加文本',
    'Extract Pattern': '提取正则',
    'Regex to extract (e.g. \\[METER\\|[^\\]]+\\])': '用于提取的正则（例如 \\[METER\\|[^\\]]+\\]）',
    'Variable Name': '变量名',
    'Variable name for storage': '用于存储的变量名',
    'Text to append after response': '回复之后要追加的文本',
    'Conditions': '触发条件',
    'Probability (%)': '概率 (%)',
    'Trigger Keywords': '触发关键词',
    '(comma-separated, blank = always)': '（英文逗号分隔，留空 = 始终触发）',
    'Generation Types:': '生成类型：',
    'Normal': '标准',
    'Continue': '续写',
    'Impersonate': '扮演',
    'Quiet': '静默',
};

// ========== index.js：卡片、模板库、分组、批量操作、提示与确认 ==========
Object.assign(TEXT, {
    'A newer template is available.': '该模板有新版本可用。',
    'Add specificity': '增加细节',
    'Agent Groups': '智能体分组',
    'Agent card action legend': '智能体卡片操作图例',
    'AI returned an empty response.': 'AI 返回了空响应。',
    'Applied generated companion. Review and save when ready.': '已应用生成的同伴内容，确认无误后保存。',
    'Apply a whole set of agents at once. Agents you already have won\'t be duplicated.':
        '一次应用整套智能体，已有的智能体不会重复添加。',
    'Apply Group': '应用分组',
    'Apply this agent to a chosen target: the last reply, the composer text, or a companion note':
        '把该智能体应用到指定目标：最后一条回复、输入框文本或某张同伴便签',
    'Apply to Target': '应用到目标',
    'Bundled in-chat agent regex currently executes on output formatting. Other placements are preserved for compatibility.':
        '内置的对话内智能体正则在输出格式化阶段执行，其他位置仅为兼容性保留。',
    'Bundled tracker': '内置追踪器',
    'Bundled trackers and helpers live here. Click any card to install it into your agent list.':
        '内置追踪器与助手都在这里，点击任意卡片即可安装到你的智能体列表。',
    'Chat changes': '聊天变更',
    'Choose how to refine this prompt:': '选择润色该提示词的方式：',
    'Companion execution needs an agent prompt.': '同伴执行需要智能体提示词。',
    'Composer text box (current input)': '输入框文本（当前输入）',
    'Context diff': '上下文差异',
    'Convert to Companion': '转为同伴',
    'Convert to Companion (runs as a separate note card under replies, never edits the reply)':
        '转为同伴（作为回复下方的独立便签卡片运行，永不修改回复）',
    'Convert to Inline': '转为内联',
    'Convert to inline execution (runs inside the main generation again)':
        '转为内联执行（重新在主生成流程内运行）',
    'Could not enable Pathfinder.': '无法启用 Pathfinder。',
    'Could not load Pathfinder settings.': '无法载入 Pathfinder 设置。',
    'Could not load the agent editor. Please refresh the page and try again.':
        '无法载入智能体编辑器，请刷新页面后重试。',
    'Could not redo transform.': '无法重做改写。',
    'Could not undo transform.': '无法撤销改写。',
    'Create Custom Group': '创建自定义分组',
    'Custom instruction:': '自定义指令：',
    'Delete agent': '删除智能体',
    'Describe the side note this companion should produce. Existing name, description, and prompt text will be used as extra context.':
        '描述该同伴应产出的便签内容。已有的名称、描述与提示词会作为额外上下文使用。',
    'Describe what this companion should watch for.': '描述该同伴需要关注的内容。',
    'Drag to reorder (arrow keys nudge)': '拖动可重新排序（方向键微调）',
    'Duplicate agent not added.': '未添加重复的智能体。',
    'Edit agent': '编辑智能体',
    'Enter a prompt before previewing it.': '预览前请先填写提示词。',
    'Escaped macros': '转义后的宏',
    'Every bundled agent is already on its latest template.': '所有内置智能体都已是最新模板。',
    'Every tracker already runs as a companion.': '所有追踪器都已作为同伴运行。',
    'Example: Make the card denser, use warmer colors, and put note text first.':
        '例如：让卡片更紧凑、配色更暖，并把便签文本放在最前。',
    'Example: Watch for continuity issues, unresolved promises, location changes, and character state shifts.':
        '例如：关注连贯性问题、未兑现的铺垫、地点变化与角色状态变化。',
    'Export agent': '导出智能体',
    'Extra instructions for regeneration': '重新生成时的额外指令',
    'Fallback scaffold used.': '已使用备用骨架。',
    'Fix anti-slop': '去除 AI 味',
    'Generating companion...': '正在生成同伴...',
    'Generating tracker kit...': '正在生成追踪器工具包...',
    'Generation Intercepts': '生成拦截',
    'Group Name': '分组名称',
    'HTML Preview': 'HTML 预览',
    'Improve clarity': '提升清晰度',
    'Individual Templates': '单个模板',
    'Invalid message.': '无效的消息。',
    'Loaded bundled template regex.': '已载入内置模板正则。',
    'Make concise': '精简',
    'Move down': '下移',
    'Move up': '上移',
    'My Custom Group': '我的自定义分组',
    'No agent document history available.': '没有可用的智能体文档历史。',
    'No agents match the current filters.': '没有符合当前筛选条件的智能体。',
    'No agents needed updating.': '没有需要更新的智能体。',
    'No agents to group. Add some agents first.': '没有可分组的内容，请先添加智能体。',
    'No assistant reply selected to fix trackers on.': '未选中可用于修复追踪器的 AI 回复。',
    'No assistant reply yet to fix trackers on.': '还没有可用于修复追踪器的 AI 回复。',
    'No assistant reply yet to manually apply this agent to.': '还没有可供该智能体手动应用的 AI 回复。',
    'No bundled agents found to reset.': '未找到可重置的内置智能体。',
    'No effective change.': '没有实际变化。',
    'No enabled tracker or connected companion agents found.': '未找到已启用的追踪器或关联的同伴智能体。',
    'No generated regex matched the sample, so the raw tracker example is shown instead.':
        '生成的正则没有匹配到示例，改为显示原始追踪器示例。',
    'No message selected to run connected companions on.': '未选中可用于运行关联同伴的消息。',
    'No properties selected to change.': '未选择要修改的属性。',
    'No regex scripts generated.': '未生成正则脚本。',
    'No regex scripts yet. Add one or load bundled template regex.': '还没有正则脚本，可添加一条或载入内置模板正则。',
    'No selected agents could be converted to companions.': '所选智能体均无法转为同伴。',
    'No selected post-generation agents can run on companion outputs.': '所选生成后智能体都无法作用于同伴输出。',
    'No targets available: no assistant reply yet and the composer is empty.':
        '没有可用目标：还没有 AI 回复，输入框也为空。',
    'No templates available.': '没有可用模板。',
    'No templates match your filter.': '没有符合筛选条件的模板。',
    'Paste a tracker example with at least one opening tag like [TRACKER|Field].':
        '请粘贴至少包含一个起始标签（如 [TRACKER|Field]）的追踪器示例。',
    'Pathfinder agent is not available. Reload In-Chat Agents or restore the bundled Pathfinder template.':
        'Pathfinder 智能体不可用。请重新加载「对话内智能体」或恢复内置 Pathfinder 模板。',
    'Pathfinder is disabled in In-Chat Agents settings.': 'Pathfinder 已在「对话内智能体」设置中停用。',
    'Pathfinder settings are in the Extensions drawer.': 'Pathfinder 设置在扩展抽屉中。',
    'Pathfinder settings saved': 'Pathfinder 设置已保存',
    'Pathfinder submodule disabled.': 'Pathfinder 子模块已停用。',
    'Pathfinder submodule enabled.': 'Pathfinder 子模块已启用。',
    'Please enter a custom instruction.': '请输入自定义指令。',
    'Please enter a group name.': '请输入分组名称。',
    'Post-Generation Changes': '生成后变更',
    'Pre-generation intercept mode needs an agent prompt.': '生成前拦截模式需要智能体提示词。',
    'Preview Companion Feedback': '预览同伴反馈',
    'Preview companion feedback prompt': '预览同伴反馈提示词',
    'Preview of the helper prompt inserted before the next generation when feedback is enabled.':
        '启用反馈后，将在下一轮生成前插入的助手提示词预览。',
    'Preview this pre-generation prompt after macro substitution': '预览宏替换后的生成前提示词',
    'Prompt diff': '提示词差异',
    'Prompt only': '仅提示词',
    'Prompt-based post-generation passes need an agent prompt.': '基于提示词的生成后处理需要智能体提示词。',
    'Raw agent output': '智能体原始输出',
    'Raw macros': '原始宏',
    'Refinement failed:': '润色失败：',
    'Refining prompt...': '正在润色提示词...',
    'Regenerated tracker preview.': '已重新生成追踪器预览。',
    'Regenerating tracker kit...': '正在重新生成追踪器工具包...',
    'Regex Beautifiers': '正则美化器',
    'Regex script name': '正则脚本名称',
    'Regex scripts need a find pattern.': '正则脚本需要填写查找表达式。',
    'Remove from Quick Toggles': '从快速开关移除',
    'Rendered from the pasted tracker format example, using the generated regex beautifier.':
        '使用生成的正则美化器渲染了粘贴的追踪器格式示例。',
    'Reorder agent': '调整智能体顺序',
    'Replacement text': '替换文本',
    'Run on edit': '编辑时运行',
    'Save your current agents as a reusable group.': '把当前智能体保存为可复用分组。',
    'Search templates…': '搜索模板…',
    'Select agent': '选择智能体',
    'Select agents to include:': '选择要包含的智能体：',
    'Select at least one agent.': '请至少选择一个智能体。',
    'Select at least one target.': '请至少选择一个目标。',
    'Selected post-generation agents are already enabled on companion outputs.':
        '所选生成后智能体已对同伴输出启用。',
    'Substitute Find Regex': '查找正则替换',
    'Text removed from capture groups before substitution': '替换前从捕获组中移除的文本',
    'The builder produced a safe starter companion locally because the AI response was unavailable or invalid. You can still apply and tweak it.':
        '由于 AI 响应不可用或无效，构建器在本地生成了安全的起步同伴，你仍可应用并调整。',
    'The builder produced a safe starter kit locally because the AI response was unavailable or invalid. You can still apply and tweak it.':
        '由于 AI 响应不可用或无效，构建器在本地生成了安全的起步工具包，你仍可应用并调整。',
    'To Companion': '转为同伴',
    'To Inline': '转为内联',
    'Transform redone.': '已重做改写。',
    'Transform undone.': '已撤销改写。',
    'Trim Strings': '去除首尾空白',
    'Unable to build a reusable group from the selected agents.': '无法用所选智能体构建可复用分组。',
    'Use Regenerate to update the tracker kit and preview before applying it.':
        '应用前请先点「重新生成」更新追踪器工具包并预览。',
    'Variable:': '变量：',
    'What this group is for': '该分组的用途',
    'Write a prompt first before refining.': '请先填写提示词再做润色。',
    'Your custom refinement instruction...': '你的自定义润色指令...',
});

// ========== agent-store.js / agent-runner.js：分组名与运行提示 ==========
Object.assign(TEXT, {
    'Behaviour & Tone': '行为与语气',
    'Character State': '角色状态',
    'Player Choices': '玩家选择',
    'Player Progress': '玩家进度',
    'Point of View': '视角',
    'Prose Quality': '文笔质量',
    'World & Scene': '世界与场景',
    'Agent not found.': '未找到智能体。',
    'Companion agents attach notes to messages and cannot rewrite the composer text.':
        '同伴智能体以便签形式附加到消息，无法改写输入框文本。',
    'Companion agents cannot post-process other companion notes.': '同伴智能体不能对其它同伴的便签做后处理。',
    'Companion runtime is unavailable.': '同伴运行环境不可用。',
    'Composer text box not found.': '未找到输入框。',
    'Generating initial message': '正在生成开场消息',
    'In-Chat Agents are disabled.': '对话内智能体已被停用。',
    'No agent generation is currently running.': '当前没有正在运行的智能体生成。',
    'No changes made.': '未做任何更改。',
    'No enabled tracker agents found.': '未找到已启用的追踪器。',
    'Pathfinder is processing lore for this reply...': 'Pathfinder 正在为该回复处理世界书...',
    'Queued agent run.': '已排队运行智能体。',
    'Review the main output before it is shown in chat.': '在显示到聊天之前先查看主输出。',
    'Running agent in parallel.': '正在并行运行智能体。',
    'Skipped applying the agent because the composer text changed while it was running.':
        '运行期间输入框内容发生变化，已跳过应用该智能体。',
    'Skipped applying the impersonation post passes because the input changed while they were running.':
        '运行期间输入发生变化，已跳过应用扮演后处理。',
    'The composer text box is empty.': '输入框为空。',
});

// ========== companion/*：同伴面板、仪表盘、便签卡片 ==========
Object.assign(TEXT, {
    'Added to the message box.': '已添加到输入框。',
    'Agent settings': '智能体设置',
    'AI Maker': 'AI 生成',
    'Chat Only is not available.': '「仅聊天」不可用。',
    'Chat Only side chat': '「仅聊天」侧边对话',
    'Chatroom reply is not available.': '聊天室回复不可用。',
    'Close panel': '关闭面板',
    'Companion Agents': '同伴智能体',
    'Companion Panel': '同伴面板',
    'Companions run as separate auxiliary LLM calls and render as collapsible note cards under assistant replies — they never edit the reply itself.':
        '同伴作为独立的辅助 LLM 调用运行，并以可折叠便签卡片的形式渲染在 AI 回复下方 —— 它们永不修改回复本身。',
    'Companion is writing a note.': '同伴正在撰写便签。',
    'Companion note copied.': '同伴便签已复制。',
    'Companion notes': '同伴便签',
    'Companion run was cancelled.': '同伴运行已取消。',
    'Companions cannot run on this message.': '同伴无法在该消息上运行。',
    'Convert an existing agent': '转换已有智能体',
    'Convert back to inline execution': '转换回内联执行',
    'Convert to Companion (runs as a side note card, never edits the reply)':
        '转为同伴（作为侧边便签卡片运行，永不修改回复）',
    'Convert to inline': '转为内联',
    'Copy companion note': '复制同伴便签',
    'Could not find the message box.': '未找到输入框。',
    'Create a new companion from scratch': '从零创建新同伴',
    'Current companion agent note': '当前同伴智能体便签',
    'Delete companion note': '删除同伴便签',
    'Edit companion': '编辑同伴',
    'Edit companion note': '编辑同伴便签',
    'Edit history entry': '编辑历史条目',
    'Edit only this saved card. Regenerate to ask the model again.': '只编辑这张已保存的卡片；若要重新询问模型请点「重新生成」。',
    'Edit state text': '编辑状态文本',
    'Edit this state\'s text': '编辑该状态的文本',
    'Edit this state\'s text by hand (e.g. type your Plot Compass objective)':
        '手动编辑该状态的文本（例如填写「剧情罗盘」的目标）',
    'Estimated input tokens': '预估输入 Token',
    'Estimated output tokens': '预估输出 Token',
    'Every eligible agent already runs as a companion.': '所有符合条件的智能体都已作为同伴运行。',
    'Everything above this shard is already hidden from prompts.': '该记忆碎片之上的内容已不再进入提示词。',
    'Exclude every message above this shard from prompts — the shard carries the history from here on':
        '把该记忆碎片之上的所有消息从提示词中排除 —— 此后历史由该碎片承载',
    'Fix state': '修复状态',
    'Fix: re-run with strict output enforcement (use when the model wrote roleplay instead)':
        '修复：以严格输出约束重跑（当模型写成角色扮演时使用）',
    'Hide story above this shard': '隐藏该碎片之上的故事',
    'In-Chat Agents are globally disabled. Companions will not run until they are re-enabled.':
        '对话内智能体已被全局停用，重新启用前同伴不会运行。',
    'Invalid companion note.': '无效的同伴便签。',
    'New Companion': '新同伴',
    'No assistant reply yet to chat beside.': '还没有可以侧聊的 AI 回复。',
    'No assistant reply yet to plan from.': '还没有可用于规划的 AI 回复。',
    'No assistant reply yet to respond to.': '还没有可回复的 AI 回复。',
    'No companion agents ran for this message.': '该消息没有运行任何同伴智能体。',
    'No companion agents ran for this reply.': '该回复没有运行任何同伴智能体。',
    'No companion agents yet. Create one above, install one from Templates, or convert an existing agent below.':
        '还没有同伴智能体。可在上方新建、从「模板」安装，或在下方转换已有智能体。',
    'No companion notes in this chat yet. Notes appear under assistant replies once a companion runs.':
        '该聊天还没有同伴便签。同伴运行后，便签会出现在 AI 回复下方。',
    'No companion selected.': '未选择同伴。',
    'No enabled companion agents are ready to run.': '没有已就绪的启用的同伴智能体。',
    'No finished companion note to apply this agent to.': '没有已完成的同伴便签可供该智能体应用。',
    'No message yet to run companions on.': '还没有可运行同伴的消息。',
    'No message yet to run this companion on.': '还没有可运行该同伴的消息。',
    'No note returned.': '未返回便签内容。',
    'No stored state to edit.': '没有可编辑的已存状态。',
    'Open the Companion Agents dashboard': '打开同伴智能体面板',
    'Open the companion panel': '打开同伴面板',
    'Open the slide-out companion panel with the latest state': '打开侧滑同伴面板，查看最新状态',
    'Open this companion\'s agent settings': '打开该同伴的智能体设置',
    'Plot Compass is not available.': '「剧情罗盘」不可用。',
    'Private side chat': '私密侧聊',
    'Put this choice in the message box': '把该选项放进输入框',
    'Recent notes': '最近的便签',
    'Regenerate all companions': '重新生成全部同伴',
    'Regenerate companion note': '重新生成同伴便签',
    'Regenerate every companion on the last reply': '对最后一条回复重新生成全部同伴',
    'Regenerate state': '重新生成状态',
    'Regenerate this state': '重新生成该状态',
    'Reorder companion': '调整同伴顺序',
    'Respond to the chatroom': '回复聊天室',
    'Respond to the chatroom...': '回复聊天室...',
    'Run All on Last Message': '对最后一条消息运行全部',
    'Run companion': '运行同伴',
    'Run every enabled companion on the last message': '对最后一条消息运行所有已启用的同伴',
    'Run this companion on the last assistant reply': '对最后一条 AI 回复运行该同伴',
    'Run this companion on the latest assistant reply': '对最新的 AI 回复运行该同伴',
    'Save objective and rerun Plot Compass': '保存目标并重新运行「剧情罗盘」',
    'Save Plot Objective': '保存剧情目标',
    'Scroll to source message': '滚动到来源消息',
    'Scroll to the source message': '滚动到来源消息',
    'Scroll to this message': '滚动到该消息',
    'Send aside': '发送侧聊',
    'Send reply': '发送回复',
    'Send this aside to Chat Only': '把该侧聊发送给「仅聊天」',
    'Send your reply to the chatroom': '把你的回复发送到聊天室',
    'That agent no longer exists.': '该智能体已不存在。',
    'That message is above the rendered window. Scroll up in the chat to load it.':
        '该消息在已渲染范围之上，请在聊天中向上滚动以加载。',
    'The agent editor is not available.': '智能体编辑器不可用。',
    'The messages associated with this note are hidden from chat history, but this note remains as context seen by the LLM.':
        '与该便签关联的消息已从聊天历史中隐藏，但该便签仍会作为 LLM 可见的上下文保留。',
    'This agent cannot be applied to that companion note.': '该智能体无法应用到那张同伴便签。',
    'Type a reply first.': '请先输入回复。',
    'Type an aside first.': '请先输入侧聊内容。',
    'Type an aside...': '输入侧聊内容...',
    'Updating…': '正在更新…',
    'Viewer reply': '观众回复',
    'Where should the story go?': '故事该往哪走？',
});

// ========== pathfinder/*：Pathfinder 子模块 ==========
Object.assign(TEXT, {
    'AI predicts what\'s relevant': 'AI 预测相关内容',
    'Allow summary memory tool': '允许摘要记忆工具',
    'Auto-track summary interval': '自动追踪摘要间隔',
    'Automatically predicts and injects relevant lore before each message (works with any API)':
        '在每条消息前自动预测并注入相关设定（兼容任意 API）',
    'Automatically use attached character/chat lorebooks': '自动使用角色/聊天关联的世界书',
    'Both modes enabled — this uses more tokens but gives the AI both automatic context and active lorebook control.':
        '两种模式均已启用 —— 更耗 Token，但 AI 既获得自动上下文，也能主动控制世界书。',
    'Choose a prompt...': '选择提示词...',
    'Choose How Pathfinder Works': '选择 Pathfinder 的工作方式',
    'Choose which lorebooks Pathfinder can access. These must be lorebooks attached to your current character or chat.':
        '选择 Pathfinder 可访问的世界书，必须是已关联到当前角色或聊天的世界书。',
    'Clear Log': '清空日志',
    'Click "Run Diagnostics" to check your Pathfinder configuration.': '点「运行诊断」检查 Pathfinder 配置。',
    'Connection Profile for Pipeline': '流水线使用的连接配置',
    'Copy Diagnostics': '复制诊断信息',
    'Counts sent/received messages toward automatic summary prompts.':
        '统计已发送/接收的消息数，用于触发自动摘要提示。',
    'Create Summary': '创建摘要',
    'Edit Pipeline Prompts': '编辑流水线提示词',
    'Enable Pathfinder for this chat': '为该聊天启用 Pathfinder',
    'Enabled Tools': '已启用的工具',
    'Entry Content Mode': '条目内容模式',
    'Forces the AI to use at least one Pathfinder tool each turn': '强制 AI 每轮至少使用一个 Pathfinder 工具',
    'Full Content': '完整内容',
    'Fully customizable prompts': '完全可自定义的提示词',
    'Hide Pathfinder explanation': '隐藏 Pathfinder 说明',
    'Instructions for the AI...': '给 AI 的指令...',
    'Keeps keyword/constant lore active naturally, then removes those entries from Pathfinder\'s injected context.':
        '让关键词/常驻设定自然生效，并从 Pathfinder 注入的上下文中移除这些条目。',
    'Latest memory summary': '最新记忆摘要',
    'Lets Pathfinder write scene/event summaries into enabled lorebooks with the Summarize tool.':
        '允许 Pathfinder 用「摘要」工具把场景/事件摘要写入已启用的世界书。',
    'Loading tool toggles...': '正在载入工具开关...',
    'Log detail': '日志详细度',
    'Lorebook Permissions': '世界书权限',
    'Lorebook list refreshed': '世界书列表已刷新',
    'Max Candidates': '最大候选数',
    'Maximum tokens Pathfinder can receive from this pipeline stage.':
        '该流水线阶段可传给 Pathfinder 的最大 Token 数。',
    'Memory Summaries': '记忆摘要',
    'Messages before Pathfinder should consider writing a memory summary.':
        '经过多少条消息后，Pathfinder 应考虑写入记忆摘要。',
    'No Pathfinder retrieval activity recorded yet.': '尚未记录到 Pathfinder 检索活动。',
    'No Pathfinder summary has been created yet.': '尚未创建 Pathfinder 摘要。',
    'No lorebooks found. Attach a lorebook to your character first.': '未找到世界书，请先为角色关联一个世界书。',
    'No lorebooks found. Create a lorebook in World Info first.': '未找到世界书，请先在世界信息中创建一个。',
    'No summary': '无摘要',
    'Pathfinder diagnostics copied.': 'Pathfinder 诊断信息已复制。',
    'Pathfinder gives the AI': 'Pathfinder 让 AI 拥有',
    'Pathfinder is not configured': 'Pathfinder 尚未配置',
    'Pipeline Mode:': '流水线模式：',
    'Pipeline Prompts': '流水线提示词',
    'Pipeline Settings': '流水线设置',
    'Pipeline Type': '流水线类型',
    'Predictive Pipeline': '预测式流水线',
    'Prevents a previous chat\'s lorebook from staying selected when the new chat has no attached lorebook.':
        '当新聊天没有关联世界书时，避免沿用上一个聊天的选择。',
    'Private AI notebook': '私有 AI 笔记本',
    'Recent scene summary': '最近场景摘要',
    'Refresh List': '刷新列表',
    'Refresh Log': '刷新日志',
    'Remember new information': '记住新信息',
    'Require tool use on every response': '每轮回复都要求使用工具',
    'Reset selections to the current chat/character lorebooks on chat change':
        '切换聊天时把选择重置为当前聊天/角色的世界书',
    'Reset to Default': '恢复默认',
    'Reset to default': '恢复默认',
    'Retrieval Log': '检索日志',
    'Retrieval Timeout': '检索超时',
    'Run Diagnostics': '运行诊断',
    'Save Prompt': '保存提示词',
    'Save Summary': '保存摘要',
    'Save Summary updates the tracked memory summary. Save as Entry creates a separate lorebook entry with a title derived from the summary text.':
        '「保存摘要」更新被追踪的记忆摘要；「保存为条目」以摘要文本生成标题并创建一条独立的世界书条目。',
    'Save as Entry': '保存为条目',
    'Saving settings will not change this switch. Turn it off only when you want Pathfinder inactive.':
        '保存设置不会改变该开关。只有想让 Pathfinder 停用时才关掉它。',
    'Search & navigate waypoints': '搜索与导航路标',
    'Seconds before Pathfinder shows a slow-retrieval warning. Generation still waits unless cancelled.':
        '多少秒后提示 Pathfinder 检索缓慢。除非取消，生成仍会继续等待。',
    'Select Prompt to Edit': '选择要编辑的提示词',
    'Select Lorebooks': '选择世界书',
    'Select a lorebook above, or attach one to the current character/chat with auto-select enabled.':
        '在上方选择一个世界书，或启用自动选择并关联到当前角色/聊天。',
    'Select at least one lorebook below to get started': '请在下方至少选择一个世界书以开始',
    'Shows what Pathfinder actually selected or injected, including selected lore entries, stage results, and the prompt payload Pathfinder added before generation.':
        '显示 Pathfinder 实际选中或注入的内容，包括选中的设定条目、各阶段结果以及生成前追加的提示词负载。',
    'Single-Pass (Faster) - Select only, no filtering': '单阶段（更快）— 仅选择，不做过滤',
    'Single-Pass Selection': '单阶段选择',
    'Skip entries already activated by World Info': '跳过已被世界信息激活的条目',
    'Stage 1: Candidate Selector': '阶段 1：候选选择器',
    'Stage 2: Relevance Filter': '阶段 2：相关性过滤',
    'Summary Interval': '摘要间隔',
    'System Prompt': '系统提示词',
    'Template with {{variables}}...': '含 {{变量}} 的模板...',
    'Text Lines': '文本行',
    'The AI can actively': 'AI 可以主动',
    'The AI can actively browse and search your lorebook using tools (requires tool-calling API)':
        'AI 可通过工具主动浏览与搜索你的世界书（需要支持工具调用的 API）',
    'Tool Mode': '工具模式',
    'Tool Mode:': '工具模式：',
    'Tool Settings': '工具设置',
    'Truncate Length': '截断长度',
    'Truncated (saves tokens)': '截断（节省 Token）',
    'Two-Stage Predictive Retrieval': '两阶段预测式检索',
    'Two-Stage (Recommended) - Select candidates, then filter': '两阶段（推荐）— 先选候选，再过滤',
    'Two ways to use Pathfinder:': 'Pathfinder 的两种使用方式：',
    'Two-stage filtering': '两阶段过滤',
    'Two-stage is more accurate but uses an extra AI call': '两阶段更准确，但会多消耗一次 AI 调用',
    'Update existing entries': '更新已有条目',
    'Use a faster/cheaper model for the pipeline (e.g., Haiku, GPT-4o-mini)':
        '流水线使用更快、更便宜的模型（如 Haiku、GPT-4o-mini）',
    'Use main model': '使用主模型',
    'Use multi-stage LLM pipeline for lorebook retrieval instead of keyword matching':
        '用多阶段 LLM 流水线替代关键词匹配来检索世界书',
    'User Prompt Template': '用户提示词模板',
    'Uses a separate AI call to select entries before generation': '在生成前用一次独立 AI 调用挑选条目',
    'Variables:': '变量：',
    'What is Pathfinder?': '什么是 Pathfinder？',
    'When Pathfinder creates a memory summary, it will appear here for review and editing.':
        'Pathfinder 创建记忆摘要后会显示在这里，可供查看与编辑。',
    'When enabled, Pathfinder auto-selects lorebooks attached to the active character card or chat.':
        '启用后，Pathfinder 会自动选择关联到当前角色卡或聊天的世界书。',
    'Works with any API': '兼容任意 API',
    'Enable Predictive Pipeline': '启用预测式流水线',
    'JSON Array': 'JSON 数组',
    'JSON Object': 'JSON 对象',
    'Output Format': '输出格式',
    'Select a prompt...': '选择提示词...',
    'Use default': '使用默认',
});

// ========== 正则编辑器与其它零散文案 ==========
Object.assign(TEXT, {
    'Find Regex': '查找正则',
    'Replace String': '替换为',
    'Script Name': '脚本名称',
    'Markdown only': '仅 Markdown 显示',
    'Max Depth': '最大深度',
    'Min Depth': '最小深度',
    'Import': '导入',
    'Export': '导出',
    'Untitled': '未命名',
    'Apply to All': '应用到全部',
    'Loading…': '载入中…',
    'Loading...': '载入中...',
    'Enabled on Companions': '已对同伴启用',
    'No selection': '未选择',
});

// ========== templates/*.json：内置模板名称与描述 ==========
Object.assign(TEXT, {
    'Achievements Tracker': '成就追踪',
    'Actor Interview': '角色专访',
    'Chaos Mode': '混沌模式',
    'Chat Only': '仅聊天',
    'Chatroom': '聊天室',
    'Combined Director\'s Cut': '导演剪辑版（全随机）',
    'Continuity Companion': '连贯性同伴',
    'CYOA Choices with Skill Checks': '选择支（含技能检定）',
    'CYOA Choices': '选择支',
    'Dead Dove Escalation': '暗黑升级',
    'Direction Menu': '剧情方向菜单',
    'Director\'s Commentary': '导演评论',
    'Don\'t Write for User': '不要替玩家写',
    'Event Tracker': '事件追踪',
    'Expressions Agent': '表情智能体',
    'Friction Mode': '阻力模式',
    'Genre Randomiser': '题材随机化',
    'Grounded Complication': '写实波折',
    'Grounded Prose': '写实文风',
    'HTML Toggle': 'HTML 开关',
    'Intimacy & Kink Randomiser': '亲密与癖好随机化',
    'Item Tracker': '物品追踪',
    'Level Up Companion': '升级同伴',
    'Lorebook Scout': '世界书侦察',
    'Memory Shard': '记忆碎片',
    'Message Inbox': '消息收件箱',
    'Nightmare Difficulty Increase': '噩梦难度提升',
    'NPC Motivator': 'NPC 动机驱动',
    'NPC Profile Cards': 'NPC 档案卡',
    'Parallel Off-Screen': '离线平行剧情',
    'Pathfinder': 'Pathfinder 世界书检索',
    'Plot Compass': '剧情罗盘',
    'Prose Polisher': '文笔润色器',
    'Pura\'s Randomisers Only': 'Pura 随机化合集',
    'Pura\'s Trackers Only': 'Pura 追踪器合集',
    'Relationship Lens Companion': '关系透视同伴',
    'Relationship Tracker': '关系追踪',
    'Reputation Tracker': '声望追踪',
    'Scene Driving Force': '场景驱动力',
    'Scene Pressure Cocktail': '场景压力鸡尾酒',
    'Scene Tracker': '场景追踪',
    'Secrets Tracker': '秘密追踪',
    'Status Tracker': '状态追踪',
    'Time Tracker': '时间追踪',
    'User-based Stats Generator': '玩家属性生成器',
    'World Detail': '世界观细节',
    'Write for User': '代替玩家书写',

    'Track notable firsts, milestones, and memorable moments': '记录值得纪念的第一次、里程碑与高光时刻',
    'Manual side note card: interview the character about the latest scene, in character, off the record':
        '手动触发的便签卡片：以角色口吻、非正式地就最近的场景采访该角色',
    'Inject random surreal, chaotic, or unexpected turns into the scene (30% chance)':
        '向场景注入随机的超现实、混乱或意外转折（30% 概率）',
    'Manual private aside chat with the character or characters in the scene, kept outside the roleplay transcript':
        '手动触发的私密侧聊，与场景中的一个或多个角色对话，不记入角色扮演正文',
    'EchoChamber-style live audience reactions for the latest reply, rendered as a styled companion chat feed with selectable chat styles':
        '以 EchoChamber 风格的实时观众反应回应最新回复，渲染为可切换风格的同伴聊天流',
    'All randomisers combined: engine, genre, complication, consequence, weather, focus, pace':
        '合并全部随机化：驱动力、题材、波折、后果、天气、焦点、节奏',
    'Side note card for contradictions, unresolved setup, and state changes that may matter next':
        '便签卡片：记录矛盾、未收尾的铺垫以及可能影响后续的状态变化',
    'Append 3-7 skill-tagged action choices at the end of every response':
        '在每次回复末尾追加 3-7 个带技能标签的行动选项',
    'Append 3-5 numbered action choices at the end of every response': '在每次回复末尾追加 3-5 个编号行动选项',
    'Dark/predatory escalation -- characters act on worst impulses when context supports it':
        '暗黑/掠夺式升级 —— 当情境允许时，角色会依最坏的冲动行事',
    '4 plot-direction prompts at the end of every response (2 grounded + 2 wildcard pivots)':
        '在每次回复末尾给出 4 个剧情走向选项（2 个写实 + 2 个意外转折）',
    'The story\'s narrator steps out from behind the page: commentary on pacing, subtext, and next directions, delivered in a selectable Narration Voice':
        '让旁白走出幕后：以可选音色评论节奏、潜台词与后续走向',
    'Never write {{user}}\'s actions or dialogue -- only {{char}} and NPCs':
        '绝不代写 {{user}} 的动作或台词 —— 只书写 {{char}} 与 NPC',
    'Track upcoming events, deadlines, promises, and unresolved threads':
        '追踪即将发生的事件、期限、承诺与尚未收束的线索',
    'Classifies the emotional tone of the latest assistant reply so the character sprite can match it. Optionally triggers new sprite generation when an emotion has no sprite yet.':
        '识别最新回复的情绪基调，让角色立绘与之匹配；当某情绪尚无立绘时可选自动生成新立绘。',
    'Combats positivity bias -- characters resist, protect their pride, and take time to warm up':
        '对抗「过度正向」倾向 —— 角色会抗拒、维护自尊，并需要时间才卸下防备',
    'Apply a random genre lens to each scene (noir, thriller, romance, etc.)':
        '为每个场景套用随机题材滤镜（黑色、惊悚、浪漫等）',
    'Add one realistic complication that raises stakes without derailing realism (40% chance)':
        '加入一个写实的小波折以提升张力，但不破坏真实感（40% 概率）',
    'Anti-slop rules: avoid purple prose, cliches, and AI writing tics':
        '反注水规则：避免华丽堆砌、陈词滥调与 AI 写作习惯用语',
    'All tracker agents including interactive menus and profile sheets': '全部追踪器智能体，含互动菜单与档案表',
    'Just the randomiser agents from Director Preset v12': '仅包含「导演预设 v12」中的随机化智能体',
    'All bundled companion agents: auxiliary notes, reaction feeds, trackers fed back into context, and the rolling memory shard':
        '全部内置同伴智能体：辅助便签、反应流、回注上下文的追踪器以及滚动记忆碎片',
    'Use inline HTML for diegetic in-world objects (signs, letters, screens)':
        '用内联 HTML 呈现故事内的实物（标牌、信件、屏幕）',
    'Aggressively hostile environment -- maximum difficulty and consequences':
        '极具敌意的环境 —— 最高难度与最重后果',
    'Post-generation prose cleanup that rewrites repetitive tropes and cliched wording. Created by Geechan.':
        '生成后的文笔清理，重写重复桥段与陈词滥调。作者 Geechan。',
    'Randomised intimate encounters with position, kink, pacing, and mental state variables':
        '随机化的亲密场景，含姿势、癖好、节奏与心理状态变量',
    'Track items {{user}} acquires, loses, or uses that have narrative significance':
        '追踪 {{user}} 获得、失去或使用的、具有剧情意义的物品',
    'Generate brief profile cards when introducing new named NPCs': '在引入具名新 NPC 时生成简短的档案卡',
    'Helps NPCs feel less static and gives them more agency to pursue their own goals':
        '让 NPC 不再像背景板，并赋予它们追求自身目标的主动性',
    'Track what absent characters and the wider world are doing off-screen':
        '追踪不在场角色与整个世界在幕后发生的事',
    'Track affection and trust for recurring NPCs with meaningful interactions':
        '追踪有过重要互动的常驻 NPC 的好感与信任度',
    'Track how {{user}} is perceived by groups and factions': '追踪各团体与阵营对 {{user}} 的看法',
    'Choose random primary engine for the scene (dialogue, action, tension, etc.)':
        '为场景随机选择主要驱动力（对话、动作、张力等）',
    'Mix random tension, focus, consequence, mood, and pacing into each scene (50% chance)':
        '为每个场景混入随机的张力、焦点、后果、情绪与节奏（50% 概率）',
    'Mark scene transitions, time shifts, and location changes': '标记场景切换、时间跳跃与地点变化',
    'Track secrets, lies, and information asymmetry between characters': '追踪角色之间的秘密、谎言与信息差',
    'Track physical, mental, and behavioral states when they change': '在角色身体、心理与行为状态变化时加以追踪',
    'Track in-story time progression with day/period/hour stamps': '用日/时段/小时的标记追踪故事内的时间推进',
    'Add 1 small worldbuilding detail per scene that may matter later':
        '每个场景补充 1 个可能在之后派上用场的小世界观细节',
    'Include {{user}} as a fully realized character -- write their actions, dialogue, and reactions':
        '把 {{user}} 当作完整角色来写 —— 包含其动作、台词与反应',
    'Side note card for subtext, leverage, trust shifts, and emotional consequences':
        '便签卡片：记录潜台词、筹码、信任变化与情感后果',
    'Manual side note card: drafts one-concept lorebook entries with trigger keys from new facts established in the scene':
        '手动触发的便签卡片：依据场景中确立的新事实，起草单概念的世界书条目及触发关键词',
    'Auto-compresses history into a compact, resumable memory shard once the chat reaches ~30k tokens, feeds the latest shard back into context, and can hide the story it has absorbed':
        '当对话达到约 3 万 Token 时自动把历史压缩为紧凑可续的记忆碎片，把最新碎片回注上下文，并可隐藏已被吸收的剧情',
    'Set a Plot Objective on the note card or in this agent\'s settings and it plans how the story gets there: progress, next developments, obstacles, and a suggested move each turn':
        '在便签卡片或该智能体设置里设定剧情目标，它会规划如何抵达：进度、后续发展、阻碍以及每轮的建议行动',
    'Shows in-story texts or letters sent to the user as a phone inbox or parchment companion view, and stays hidden when no message arrives':
        '以手机收件箱或羊皮纸同伴视图呈现故事内发给玩家的短信或信件；没有新消息时保持隐藏',
    'Automatic agentic lorebook retrieval. Lets a model actively browse, search, and modify your lorebook using function tools.':
        '自动的世界书智能检索。允许模型通过函数工具主动浏览、搜索与修改你的世界书。',
    'Track major milestones and emit level-up blocks when earned': '追踪重要里程碑，并在达成时输出升级区块',
    'Generate and maintain a persona-informed RPG stat sheet for {{user}}':
        '依据人设为 {{user}} 生成并维护 RPG 属性表',
});

// ========== 动态文案规则（含变量） ==========
const RULES = [
    [/^(\d+) regex$/, '$1 条正则'],
    [/^(\d+) selected$/, '已选 $1 项'],
    [/^(\d+) pinned$/, '已固定 $1 个'],
    [/^Order (\d+)$/, '顺序 $1'],
    [/^depth (\d+)$/, '深度 $1'],
    [/^prompt (rewrite|append)$/, (match, mode) => (mode === 'rewrite' ? '提示词改写' : '提示词追加')],
    [/^(\d+) agents?$/, '$1 个智能体'],
    [/^(\d+) tokens?$/, '$1 Token'],
];

const ATTRS = ['title', 'placeholder', 'aria-label'];
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'PRE', 'INPUT']);
// 这些区域是用户/模型内容，绝不翻译
const SKIP_SELECTORS = ['.mes_text', '.ica--no-i18n', '.ica--i18n-skip', '.ica--prompt-preview'];

let installed = false;
let scheduled = false;
let pending = [];

/**
 * 读取当前界面语言，优先复用 SillyBunny 自身的 i18n 状态。
 * @returns {string} 语言代码，如 zh-cn
 */
function currentLocale() {
    try {
        const locale = getCurrentLocale();
        if (locale) {
            return String(locale).toLowerCase();
        }
    } catch {
        // 忽略：i18n 模块尚未初始化时回退到 localStorage
    }
    try {
        const stored = localStorage.getItem('language');
        if (stored) {
            return String(stored).toLowerCase();
        }
    } catch {
        // 忽略：隐私模式等场景下 localStorage 不可用
    }
    return String(navigator.language || navigator.userLanguage || 'en').toLowerCase();
}

/**
 * 把英文原文转换为中文。
 * @param {string} value 原文
 * @returns {string|null} 译文，未命中词典时返回 null
 */
function convert(value) {
    const key = String(value).trim();
    if (!key || !/[A-Za-z]/.test(key)) {
        return null;
    }
    if (Object.hasOwn(TEXT, key)) {
        return TEXT[key];
    }
    for (const [pattern, replacement] of RULES) {
        if (pattern.test(key)) {
            return key.replace(pattern, replacement);
        }
    }
    return null;
}

/**
 * 翻译一段文本，保留原有首尾空白。
 * @param {string} original 原文
 * @returns {string} 译文或原文
 */
function translateValue(original) {
    const translated = convert(original);
    if (translated === null) {
        return original;
    }
    const leading = original.match(/^\s*/)?.[0] ?? '';
    const trailing = original.match(/\s*$/)?.[0] ?? '';
    return `${leading}${translated}${trailing}`;
}

function shouldSkip(element) {
    if (SKIP_TAGS.has(element.tagName)) {
        return true;
    }
    return SKIP_SELECTORS.some(selector => element.matches?.(selector));
}

/**
 * 递归翻译一个节点（文本节点或元素）。
 * @param {Node} node 目标节点
 */
function translateNode(node) {
    if (!node) {
        return;
    }
    if (node.nodeType === Node.TEXT_NODE) {
        node.nodeValue = translateValue(node.nodeValue);
        return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
    }
    if (shouldSkip(node)) {
        return;
    }
    for (const attr of ATTRS) {
        const value = node.getAttribute(attr);
        if (value) {
            node.setAttribute(attr, translateValue(value));
        }
    }
    for (const child of Array.from(node.childNodes)) {
        translateNode(child);
    }
}

function flush() {
    scheduled = false;
    const nodes = pending;
    pending = [];
    for (const node of nodes) {
        if (node.isConnected) {
            translateNode(node);
        }
    }
}

function scheduleTranslation(node) {
    pending.push(node);
    if (scheduled) {
        return;
    }
    scheduled = true;
    requestAnimationFrame(flush);
}

/**
 * 安装简体中文本地化。
 * 仅在界面语言为中文时生效，可重复调用。
 */
export function installZhCnLocalization() {
    if (installed || !currentLocale().startsWith('zh')) {
        return;
    }
    installed = true;

    translateNode(document.body);

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === 'characterData') {
                scheduleTranslation(mutation.target);
                continue;
            }
            for (const node of mutation.addedNodes) {
                scheduleTranslation(node);
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    // 调试入口：控制台执行 icaZhCn.translateNow() 可手动全量重刷
    window.icaZhCn = {
        translateNow: () => translateNode(document.body),
        entries: TEXT,
        rules: RULES,
    };

    console.log('[In-Chat Agents] 简体中文本地化已启用');
}

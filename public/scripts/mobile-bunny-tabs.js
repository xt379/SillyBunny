/* CUSTOM mobile-bunny-tabs.js — 手机底部 Tab 导航（App 化：聊天/角色/世界/设置）
   通过模拟点击官方 .drawer-toggle 走 doNavbarIconClick，状态与官方完全同步 */
(function () {
    'use strict';

    var isMobileView = window.matchMedia('(max-width: 768px)').matches ||
        (window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    if (!isMobileView) return;

    var CONFIG = {
        chat: { drawer: null, icon: 'chat', label: '聊天' },
        characters: { drawer: 'right-nav-panel', icon: 'user', label: '角色' },
        world: { drawer: 'WorldInfo', icon: 'globe', label: '世界' },
        settings: { drawer: 'user-settings-block', icon: 'gear', label: '设置' },
    };

    var ICONS = {
        chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
        user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
        globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
        gear: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 0 2.83-2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
    };

    var tabBar = null;

    function drawerToggle(drawerId) {
        var drawer = document.getElementById(drawerId);
        if (!drawer) return null;
        var wrapper = drawer.closest('.drawer');
        return wrapper ? wrapper.querySelector('.drawer-toggle') : null;
    }

    function toggleById(drawerId) {
        var toggle = drawerToggle(drawerId);
        if (toggle) {
            toggle.click(); // 官方 doNavbarIconClick 接管开/关
        } else {
            var d = document.getElementById(drawerId);
            if (d) { d.classList.toggle('openDrawer'); d.classList.toggle('closedDrawer'); }
        }
    }

    function closeAll() {
        var list = Array.prototype.slice.call(document.querySelectorAll('.drawer-content.openDrawer:not(.pinnedOpen)'));
        list.forEach(function (d) {
            var wrapper = d.closest('.drawer');
            var toggle = wrapper ? wrapper.querySelector('.drawer-toggle') : null;
            if (toggle) toggle.click();
            else d.classList.replace('openDrawer', 'closedDrawer');
        });
    }

    function sync() {
        if (!tabBar) return;
        var open = new Set();
        document.querySelectorAll('.drawer-content.openDrawer').forEach(function (d) { open.add(d.id); });
        var active = 'chat';
        if (open.has('right-nav-panel')) active = 'characters';
        else if (open.has('WorldInfo')) active = 'world';
        else if (open.size > 0) active = 'settings';
        tabBar.querySelectorAll('.btab').forEach(function (b) {
            b.classList.toggle('active', b.dataset.tab === active);
        });
    }

    function switchTab(key) {
        var cfg = CONFIG[key];
        if (!cfg) return;
        if (key === 'chat') {
            closeAll();
        } else {
            toggleById(cfg.drawer); // 已打开则收起(回到聊天)，未打开则展开(官方自动关其他)
        }
        sync();
    }

    function build() {
        tabBar = document.createElement('nav');
        tabBar.id = 'bunny-mobile-tabs';
        tabBar.setAttribute('aria-label', '主导航');
        var html = '';
        ['chat', 'characters', 'world', 'settings'].forEach(function (key) {
            var cfg = CONFIG[key];
            html += '<button type="button" class="btab' + (key === 'chat' ? ' active' : '') + '" data-tab="' + key + '">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[cfg.icon] + '</svg>' +
                '<span>' + cfg.label + '</span>' +
                '</button>';
        });
        tabBar.innerHTML = html;
        document.body.appendChild(tabBar);
    }

    function boot() {
        build();

        // 官方抽屉状态变化 → 自动同步高亮
        document.querySelectorAll('.drawer-content').forEach(function (d) {
            new MutationObserver(sync).observe(d, { attributes: true, attributeFilter: ['class'] });
        });

        // 阻止点击 Tab 触发官方"点外部自动收起"
        tabBar.querySelectorAll('.btab').forEach(function (btn) {
            ['mousedown', 'touchstart'].forEach(function (evt) {
                btn.addEventListener(evt, function (e) { e.stopPropagation(); }, { passive: true });
            });
            btn.addEventListener('click', function () { switchTab(btn.dataset.tab); });
        });

        // Tab 栏上左右滑动切换（聊天→角色→世界→设置）
        var sx = 0, sy = 0;
        tabBar.addEventListener('touchstart', function (e) {
            sx = e.touches[0].clientX; sy = e.touches[0].clientY;
        }, { passive: true });
        tabBar.addEventListener('touchend', function (e) {
            var dx = e.changedTouches[0].clientX - sx;
            var dy = e.changedTouches[0].clientY - sy;
            if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;
            var order = ['chat', 'characters', 'world', 'settings'];
            var cur = tabBar.querySelector('.btab.active');
            var i = order.indexOf(cur ? cur.dataset.tab : 'chat');
            var next = dx < 0 ? order[Math.min(i + 1, order.length - 1)] : order[Math.max(i - 1, 0)];
            if (next !== (cur ? cur.dataset.tab : 'chat')) switchTab(next);
        }, { passive: true });

        sync();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();

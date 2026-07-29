/* ========================================================
   mechhub 공통 사이드바 메뉴 (모든 페이지 공용, 단일 소스)
   사용법: <script src="sidebar.js"></script> 를 head에 추가하고,
          window.onload 에서 renderSidebar('key')를 호출한다.
   ======================================================== */

const SIDEBAR_MENU = [
    { key: 'home',       name: '🏠 메인 홈',                          href: 'index.html' },
    { key: 'drawing',    name: '1. 기계제도 & RF & EMI',               href: 'javascript:void(0)', ready: true },
    { key: 'steel',      name: '2. Steel 소재 (구현됨) ⚡',            href: 'steel_material.html' },
    { key: 'stainless',  name: '3. Stainless 소재 (구현됨) ⚡',        href: 'stainless_material.html' },
    { key: 'aluminum',   name: '4. Aluminum 소재 (구현됨) ⚡',         href: 'aluminum_material.html' },
    { key: 'resin',      name: '5. 수지/세라믹/기타 (구현됨) ⚡',       href: 'resin_material.html' },
    { key: 'machining',  name: '6. 기계가공 (구현됨) ⚡',              href: 'index.html#machining-section' },
    { key: 'elements',   name: '7. 기계요소 (구현됨) ⚡',              href: 'index.html#elements-section' },
    { key: 'mecha',      name: '8. 요소설계 & 계산 (구현됨) ⚡',        href: 'index.html#mecha-section' },
    { key: 'vacuum',     name: '9. 진공부품',                         href: 'javascript:void(0)', ready: true },
    { key: 'vision',     name: '10. Vision Camera',                  href: 'javascript:void(0)', ready: true },
    { key: 'electric',   name: '11. Electricity & Control',          href: 'javascript:void(0)', ready: true },
    { key: 'utility',    name: '12. Utility 선정 & 반응',              href: 'javascript:void(0)', ready: true },
    { key: 'board',      name: '13. 기판 & Vibration',                href: 'javascript:void(0)', ready: true },
    { key: 'transport',  name: '14. Transportation & ETC',           href: 'javascript:void(0)', ready: true },
];

function renderSidebar(activeKey) {
    const menuUl = document.getElementById('sidebarMenu');
    if (!menuUl) return;

    // index.html 위에서는 index.html#... 앵커를 같은 페이지 내 스크롤(#...)로 축약
    const onIndexPage = /(^|\/)index\.html$/.test(location.pathname) || /\/$/.test(location.pathname);

    menuUl.innerHTML = SIDEBAR_MENU.map(item => {
        let href = item.href;
        if (onIndexPage && href.startsWith('index.html#')) href = href.slice('index.html'.length);
        const isActive = item.key === activeKey;
        return `<li class="${item.ready ? 'ready' : ''} ${isActive ? 'active' : ''}">
            <a href="${href}">${item.name}${item.ready ? ' <span class="badge-ready">준비중</span>' : ''}</a>
        </li>`;
    }).join('');
}

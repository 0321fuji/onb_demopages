(function () {
  // ============================================================
  // ナビゲーション定義 — ここだけ編集すれば全ページに反映
  // ============================================================
  const NAV_ITEMS = [
    { id: 'dashboard',   icon: 'dashboard',      label: 'ダッシュボード', href: 'index.html' },
    { id: 'products',    icon: 'inventory_2',    label: '商品管理',       href: 'products.html' },
    { id: 'orders',      icon: 'shopping_cart',  label: '注文管理',       href: 'orders.html' },
    { id: 'customers',   icon: 'group',          label: '顧客管理',       href: '#' },
    { id: 'inventory',   icon: 'warehouse',      label: '在庫管理',       href: '#' },
    { id: 'marketing',   icon: 'campaign',       label: 'マーケティング', href: '#' },
    { id: 'analytics',   icon: 'analytics',      label: '分析',           href: '#' },
    { id: 'crm',         icon: 'sync_alt',       label: 'CRM連携',        href: 'crm.html' },
    { id: 'shipping',    icon: 'local_shipping', label: '配送設定',       href: 'shipping.html' },
  ];

  // <body data-page="dashboard"> の値でアクティブ項目を判定
  // new-product は products セクション扱い
  const activePage = document.body.dataset.page;
  const activeId   = activePage === 'new-product' ? 'products' : activePage;

  // ============================================================
  // サイドバー生成
  // ============================================================
  function buildSidebar() {
    const navHTML = NAV_ITEMS.map(item => {
      const isActive = item.id === activeId;
      const linkCls  = isActive
        ? 'flex items-center gap-stack-md px-gutter py-stack-md border-l-4 border-slate-900 bg-slate-200 text-slate-900 font-semibold opacity-90 transition-all duration-200'
        : 'flex items-center gap-stack-md px-gutter py-stack-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors';
      const iconCls  = isActive ? 'material-symbols-outlined fill' : 'material-symbols-outlined';
      return `
        <li>
          <a class="${linkCls}" href="${item.href}">
            <span class="${iconCls}">${item.icon}</span>
            <span>${item.label}</span>
          </a>
        </li>`;
    }).join('');

    return `
      <aside class="hidden md:flex flex-col bg-slate-100 font-body-md text-body-md w-sidebar-width h-screen fixed left-0 top-0 border-r border-slate-200 z-50 py-container-padding">
        <!-- ブランド -->
        <div class="px-container-padding mb-stack-lg flex items-center gap-stack-sm">
          <div class="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-white fill" style="font-size:20px;">storefront</span>
          </div>
          <div>
            <h1 class="font-headline-sm text-headline-sm font-bold text-slate-900">PrecisionCMS</h1>
            <p class="font-label-sm text-label-sm text-slate-600">Eコマース管理者</p>
          </div>
        </div>
        <!-- ナビ -->
        <nav class="flex-1 overflow-y-auto">
          <ul class="flex flex-col gap-unit">${navHTML}</ul>
        </nav>
        <!-- 設定 + ユーザー -->
        <div class="mt-auto pt-stack-md">
          <a class="flex items-center gap-stack-md px-gutter py-stack-md text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors" href="#">
            <span class="material-symbols-outlined">settings</span>
            <span>設定</span>
          </a>
          <div class="mt-stack-sm px-gutter py-stack-md flex items-center gap-stack-sm border-t border-slate-200">
            <img
              class="w-8 h-8 rounded-full object-cover border border-slate-200"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_nqWH0-Pz_go0l_jZ2zs-KE6DygzE6XOy3XApZ7rE-fWyobjgBzoCSPobVPhf6t791JyMhMPbRgwQnwJ8ZY26IcYDJZbQvg1vvL1rw7Xev_y93IPnhV7XQWYuOH9yY_Y5ckyiqb9LdeXeeN-1xBoHPnbcRWoO6c9V1m31P57pGqGE71cmtFUwAbTeaD8GNJbH4Ei8y_fpGchVqv4rnLOsurjhbdomdH5hr8jstuSdhdYnjLuF9yXBBMn16dizQ6Tnqe0XWriif4A"
              alt="Store Manager Avatar"/>
            <div class="overflow-hidden">
              <p class="font-label-md text-label-md text-slate-900 truncate">Alex Mercer</p>
              <p class="font-label-sm text-label-sm text-slate-600 truncate">alex@precision.cms</p>
            </div>
          </div>
        </div>
      </aside>`;
  }

  // ============================================================
  // トップナビ生成
  // ============================================================
  function buildHeader() {
    return `
      <header class="bg-white font-label-md text-label-md h-16 fixed top-0 right-0 z-40 border-b border-slate-200 flex justify-between items-center w-[calc(100%-260px)] ml-sidebar-width px-container-padding transition-all duration-300 hidden md:flex">
        <div class="flex-1 max-w-md relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" style="font-size:20px;">search</span>
          <input
            class="w-full bg-slate-50 border border-slate-200 rounded text-slate-900 pl-10 pr-4 py-2 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 placeholder-slate-500 transition-colors"
            placeholder="注文、顧客、または商品を検索..."
            type="text"/>
        </div>
        <div class="flex items-center gap-stack-md">
          <button class="text-slate-600 hover:text-slate-900 transition-colors font-label-md px-3 py-1.5 rounded hover:bg-slate-100">
            サポート
          </button>
          <div class="flex items-center gap-unit border-l border-slate-200 pl-stack-md">
            <button class="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative group">
              <span class="material-symbols-outlined">notifications</span>
              <span class="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border border-white group-hover:scale-110 transition-transform"></span>
            </button>
            <button class="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
              <span class="material-symbols-outlined">help_outline</span>
            </button>
          </div>
        </div>
      </header>`;
  }

  // ============================================================
  // プレースホルダーに注入
  // ============================================================
  const sidebarEl = document.getElementById('app-sidebar');
  const headerEl  = document.getElementById('app-header');

  if (sidebarEl) sidebarEl.outerHTML = buildSidebar();
  if (headerEl)  headerEl.outerHTML  = buildHeader();

  // ============================================================
  // Onboarding JS — ここだけで全ページに適用
  // ============================================================
  var userAgent = window.navigator.userAgent.toLowerCase();
  if ((userAgent.indexOf('msie') === -1 && userAgent.indexOf('trident') === -1) && !document.querySelector("#stands_onbd_point")) {
    var ONB = ONB || {};
    ONB.ignition_url = "https://api.onboarding-app.io/v1/onboarding-init?aid=2&pid=393";

    // Custom Area Start=====================
    ONB._queryparam = {
      "user_id":        "ユーザID",
      "user_name":      "ユーザ名",
      "user_group_id":  "企業ID",
      "user_group_name":"企業名"
    };
    ONB.black_list = [];
    ONB._custom_functions = {};
    // Custom Area End======================

    ONB.embed = function(){for(ONB.item in ONB._queryparam){ONB.ignition_url+="&"+ONB.item+"="+ encodeURIComponent(ONB._queryparam[ONB.item])}for(ONB.d=0;ONB.d<ONB.black_list.length;ONB.d++){if(location.href.indexOf(ONB.black_list[ONB.d])!=-1){return}}if(Object.keys(ONB._custom_functions).length>0){ONB.ignition_url+="&custom_functions="+encodeURIComponent(JSON.stringify(ONB._custom_functions))}ONB.b=document.createElement("script"),ONB.c=document.getElementsByTagName("head")[0];ONB.b.src=ONB.ignition_url;ONB.b.id="stands_onbd_point";ONB.b.charset="utf-8";ONB.b.async="async";ONB.c.appendChild(ONB.b);};
    ONB.embed();
  }
})();

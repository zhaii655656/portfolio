const rangePaths = (id, kind, count, extensions = []) => Array.from({ length:count }, (_,index) => {
  const number = String(index + 1).padStart(2,"0");
  return `assets/works/${id}/${kind}-${number}.${extensions[index] || "jpg"}`;
});
const makeImages = (id, detailCount, mainExtensions = []) => ({
  main: rangePaths(id,"main",5,mainExtensions),
  sku: [`assets/works/${id}/sku-01.jpg`, `assets/works/${id}/sku-02.jpg`],
  detail: rangePaths(id,"detail",detailCount)
});

const baseProjects = [
  { id:"1063596496638", title:"银河 M7 专车坐垫", category:"auto", categoryLabel:"汽车用品", desc:"围绕专车适配、通风舒适与高级座舱质感，建立高辨识度的系列视觉。", tags:["主图视觉","SKU系统","详情页"], images:makeImages("1063596496638",47) },
  { id:"1012045536026", title:"胡桃木桌面增高架", category:"home", categoryLabel:"家居收纳", desc:"用温润木色与清爽场景呈现桌面分层收纳，让功能结构在第一眼清晰可见。", tags:["场景构图","材质表现","规格梳理"], images:makeImages("1012045536026",14) },
  { id:"1004772810930", title:"移动式文件收纳篮", category:"home", categoryLabel:"家居收纳", desc:"针对宿舍与家庭使用场景，以生活化陈列表现容量、移动性与多规格选择。", tags:["主图创意","场景搭建","SKU系统"], images:makeImages("1004772810930",8) },
  { id:"1076864577814", title:"折叠车载床垫", category:"auto", categoryLabel:"汽车用品", desc:"以户外出行场景建立使用想象，突出专车定制、快速铺装与空间扩展。", tags:["场景合成","卖点可视化","详情叙事"], images:makeImages("1076864577814",37) },
  { id:"1001896891433", title:"厨房转角置物架", category:"home", categoryLabel:"家居收纳", desc:"柔和家居光线结合紧凑构图，直观体现转角利用、层级容量与稳定结构。", tags:["产品渲染","空间表现","SKU系统"], images:makeImages("1001896891433",10) },
  { id:"1067620788472", title:"华境 S 全包坐垫", category:"auto", categoryLabel:"汽车用品", desc:"以明亮座舱和克制信息层级，传递专车贴合、包裹感与透气体验。", tags:["品牌主图","车型适配","转化设计"], images:makeImages("1067620788472",45) },
  { id:"984531598807", title:"多层厨房收纳架", category:"home", categoryLabel:"家居收纳", desc:"聚焦多尺寸与多层结构，通过统一视角建立清晰、可靠的产品选择体验。", tags:["场景主图","尺寸表达","详情页"], images:makeImages("984531598807",20) },
  { id:"1081048228948", title:"恒温皮全车坐垫", category:"auto", categoryLabel:"汽车用品", desc:"强调皮革触感、四季舒适与全车统一，完成从视觉吸引到功能说服的表达。", tags:["材质质感","整车方案","SKU系统"], images:makeImages("1081048228948",28) },
  { id:"998262265746", title:"木纹桌面置物架", category:"home", categoryLabel:"家居收纳", desc:"用温暖色彩和丰富桌搭场景，强化产品在办公、学习空间中的实用价值。", tags:["桌搭场景","产品表现","系列规范"], images:makeImages("998262265746",15) },
  { id:"1056142670633", title:"星愿专车隐形坐垫", category:"auto", categoryLabel:"汽车用品", desc:"围绕原车融合的核心诉求，建立轻盈、舒适并兼具安装服务信息的主图体系。", tags:["卖点提炼","车型定制","详情页"], images:makeImages("1056142670633",35) },
  { id:"979534526544", title:"墙面网篮收纳系统", category:"home", categoryLabel:"家居收纳", desc:"以奶油色生活场景呈现多层、多尺寸和壁挂组合，兼顾氛围与选购效率。", tags:["生活方式","SKU矩阵","主图体系"], images:makeImages("979534526544",13,["png","jpg","jpg","jpg","png"]) },
  { id:"1017307726019", title:"电脑主机移动托架", category:"home", categoryLabel:"家居收纳", desc:"用科技感光线表现承重、散热和灵活移动，突出设备与支架的尺寸关系。", tags:["科技场景","功能图示","SKU系统"], images:makeImages("1017307726019",11) },
  { id:"998262534991", title:"双层桌面收纳架", category:"home", categoryLabel:"家居收纳", desc:"简洁场景与统一构图呈现双层、三层差异，降低多规格产品的选择成本。", tags:["场景渲染","规格对比","详情页"], images:makeImages("998262534991",6) }
];

const state = { projects: [...baseProjects], filter:"all", visible:8, activeProject:null, galleryType:"main", imageIndex:0, uploadFiles:[] };
const grid = document.querySelector("#work-grid");
const loadMore = document.querySelector("#load-more");
const emptyState = document.querySelector("#empty-state");
const projectDialog = document.querySelector("#project-dialog");
const uploadDialog = document.querySelector("#upload-dialog");

const iconRefresh = () => window.lucide?.createIcons();
const twoDigits = n => String(n).padStart(2,"0");
const filteredProjects = () => state.projects.filter(p => state.filter === "all" || (state.filter === "custom" ? p.custom : p.category === state.filter));

function renderProjects() {
  const projects = filteredProjects();
  grid.innerHTML = projects.slice(0,state.visible).map((project,index) => `
    <article class="project-card reveal visible" data-project-id="${project.id}" tabindex="0" aria-label="查看${project.title}">
      <div class="project-visual">
        <img src="${project.images.main[0]}" alt="${project.title}" loading="lazy">
        <span class="project-number">${twoDigits(index + 1)}</span>
        <span class="project-open"><i data-lucide="arrow-up-right"></i></span>
      </div>
      <div class="project-info">
        <div><h3>${project.title}</h3><p>${project.tags.slice(0,3).join(" · ")}</p></div>
        <span>${project.categoryLabel}</span>
      </div>
    </article>`).join("");
  emptyState.hidden = projects.length > 0;
  loadMore.hidden = projects.length <= state.visible;
  document.querySelector("#project-count").textContent = twoDigits(state.projects.length);
  iconRefresh();
  bindCardTilt();
}

function bindCardTilt() {
  document.querySelectorAll(".project-card").forEach(card => {
    const visual = card.querySelector(".project-visual");
    card.addEventListener("pointermove", event => {
      if (matchMedia("(hover: none)").matches) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      visual.style.transform = `rotateX(${-y * 3}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener("pointerleave", () => visual.style.transform = "");
  });
}

function openProject(id) {
  state.activeProject = state.projects.find(project => project.id === id);
  if (!state.activeProject) return;
  state.galleryType = state.activeProject.images.main.length ? "main" : Object.keys(state.activeProject.images).find(key => state.activeProject.images[key].length);
  state.imageIndex = 0;
  const p = state.activeProject;
  document.querySelector("#dialog-index").textContent = `PROJECT / ${p.id.slice(-6)}`;
  document.querySelector("#dialog-title").textContent = p.title;
  document.querySelector("#dialog-desc").textContent = p.desc;
  document.querySelector("#dialog-tags").innerHTML = p.tags.map(tag => `<span>${tag}</span>`).join("");
  document.querySelector("#delete-project").hidden = !p.custom;
  renderGalleryTabs();
  updateGallery();
  projectDialog.showModal();
  document.body.classList.add("dialog-open");
  iconRefresh();
}

const typeLabels = { main:"主图", sku:"SKU", detail:"详情长图" };
function renderGalleryTabs() {
  const tabs = Object.entries(state.activeProject.images).filter(([,images]) => images.length);
  document.querySelector("#gallery-tabs").innerHTML = tabs.map(([type,images]) => `
    <button type="button" role="tab" data-type="${type}" class="${type === state.galleryType ? "active" : ""}">${typeLabels[type]} ${twoDigits(images.length)}</button>`).join("");
}

function updateGallery(direction = 0) {
  const images = state.activeProject.images[state.galleryType];
  const isCollage = state.galleryType === "detail";
  const stage = document.querySelector(".dialog-stage");
  const image = document.querySelector("#dialog-image");
  const collage = document.querySelector("#dialog-collage");
  const arrows = document.querySelectorAll(".gallery-arrow");
  stage.classList.toggle("detail-mode", isCollage);
  arrows.forEach(arrow => { arrow.hidden = isCollage; });
  if (isCollage) {
    state.imageIndex = 0;
    image.hidden = true;
    collage.hidden = false;
    collage.innerHTML = images.map((src,index) => `<img src="${src}" alt="${state.activeProject.title} 详情长图 ${index + 1}" loading="lazy">`).join("");
    document.querySelector("#dialog-current").textContent = "01";
    document.querySelector("#dialog-total").textContent = "01";
    document.querySelector("#progress-line").style.width = "100%";
    document.querySelector("#image-caption").textContent = `${typeLabels[state.galleryType]} / ${images.length} 张素材拼接`;
    requestAnimationFrame(() => { stage.scrollTop = 0; });
    return;
  }
  image.hidden = false;
  collage.hidden = true;
  state.imageIndex = (state.imageIndex + direction + images.length) % images.length;
  image.style.opacity = "0";
  image.style.transform = `translateX(${direction > 0 ? 14 : direction < 0 ? -14 : 0}px)`;
  window.setTimeout(() => {
    image.src = images[state.imageIndex];
    image.alt = `${state.activeProject.title} ${typeLabels[state.galleryType]} ${state.imageIndex + 1}`;
    image.onload = () => { image.style.transition = "opacity .25s, transform .25s"; image.style.opacity = "1"; image.style.transform = ""; };
  }, direction ? 120 : 0);
  document.querySelector("#dialog-current").textContent = twoDigits(state.imageIndex + 1);
  document.querySelector("#dialog-total").textContent = twoDigits(images.length);
  document.querySelector("#progress-line").style.width = `${(state.imageIndex + 1) / images.length * 100}%`;
  document.querySelector("#image-caption").textContent = `${typeLabels[state.galleryType]}设计 / ${twoDigits(state.imageIndex + 1)}`;
}

function closeDialog(dialog) {
  dialog.close();
  document.body.classList.remove("dialog-open");
}

document.addEventListener("click", event => {
  const card = event.target.closest(".project-card");
  if (card) openProject(card.dataset.projectId);
  const filter = event.target.closest(".filter-button");
  if (filter) {
    document.querySelectorAll(".filter-button").forEach(button => button.classList.toggle("active",button === filter));
    state.filter = filter.dataset.filter;
    state.visible = 8;
    renderProjects();
  }
  if (event.target.closest(".open-upload")) { uploadDialog.showModal(); document.body.classList.add("dialog-open"); }
  if (event.target.closest(".gallery-prev")) updateGallery(-1);
  if (event.target.closest(".gallery-next")) updateGallery(1);
  if (event.target.closest(".project-dialog .dialog-close")) closeDialog(projectDialog);
  if (event.target.closest(".upload-dialog .dialog-close")) closeDialog(uploadDialog);
});

grid.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.closest(".project-card")) openProject(event.target.closest(".project-card").dataset.projectId);
});
document.querySelector("#gallery-tabs").addEventListener("click", event => {
  const tab = event.target.closest("button");
  if (!tab) return;
  state.galleryType = tab.dataset.type;
  state.imageIndex = 0;
  renderGalleryTabs();
  updateGallery();
});
loadMore.addEventListener("click", () => { state.visible += 6; renderProjects(); });
projectDialog.addEventListener("click", event => { if (event.target === projectDialog) closeDialog(projectDialog); });
uploadDialog.addEventListener("click", event => { if (event.target === uploadDialog) closeDialog(uploadDialog); });
document.addEventListener("keydown", event => {
  if (!projectDialog.open) return;
  if (state.galleryType === "detail") return;
  if (event.key === "ArrowRight") updateGallery(1);
  if (event.key === "ArrowLeft") updateGallery(-1);
});

document.querySelector(".menu-button").addEventListener("click", () => {
  const menu = document.querySelector(".mobile-menu");
  menu.classList.add("open"); menu.setAttribute("aria-hidden","false"); document.body.classList.add("dialog-open");
});
document.querySelector(".close-menu").addEventListener("click", closeMenu);
document.querySelectorAll(".mobile-menu a").forEach(link => link.addEventListener("click", closeMenu));
function closeMenu() { const menu = document.querySelector(".mobile-menu"); menu.classList.remove("open"); menu.setAttribute("aria-hidden","true"); document.body.classList.remove("dialog-open"); }

const uploadFiles = document.querySelector("#upload-files");
const dropZone = document.querySelector("#drop-zone");
uploadFiles.addEventListener("change", () => setUploadFiles([...uploadFiles.files]));
["dragenter","dragover"].forEach(type => dropZone.addEventListener(type,event => { event.preventDefault(); dropZone.classList.add("dragging"); }));
["dragleave","drop"].forEach(type => dropZone.addEventListener(type,event => { event.preventDefault(); dropZone.classList.remove("dragging"); }));
dropZone.addEventListener("drop", event => setUploadFiles([...event.dataTransfer.files].filter(file => file.type.startsWith("image/"))));
function setUploadFiles(files) {
  state.uploadFiles = files;
  const preview = document.querySelector("#upload-preview");
  preview.innerHTML = "";
  files.slice(0,12).forEach(file => { const img = new Image(); img.src = URL.createObjectURL(file); img.alt = file.name; img.onload = () => URL.revokeObjectURL(img.src); preview.appendChild(img); });
}

const fileToDataUrl = file => new Promise((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
const openDB = () => new Promise((resolve,reject) => {
  const request = indexedDB.open("yi-portfolio",1);
  request.onupgradeneeded = () => request.result.createObjectStore("projects",{ keyPath:"id" });
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});
async function getCustomProjects() {
  const db = await openDB();
  return new Promise((resolve,reject) => { const request = db.transaction("projects").objectStore("projects").getAll(); request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
}
async function saveCustomProject(project) {
  const db = await openDB();
  return new Promise((resolve,reject) => { const request = db.transaction("projects","readwrite").objectStore("projects").put(project); request.onsuccess = resolve; request.onerror = () => reject(request.error); });
}
async function removeCustomProject(id) {
  const db = await openDB();
  return new Promise((resolve,reject) => { const request = db.transaction("projects","readwrite").objectStore("projects").delete(id); request.onsuccess = resolve; request.onerror = () => reject(request.error); });
}

document.querySelector("#upload-form").addEventListener("submit", async event => {
  event.preventDefault();
  if (!state.uploadFiles.length) { dropZone.focus(); return; }
  const submit = event.target.querySelector("button[type=submit]");
  submit.disabled = true; submit.textContent = "正在保存...";
  try {
    const images = await Promise.all(state.uploadFiles.map(fileToDataUrl));
    const category = document.querySelector("#upload-category").value;
    const labels = { home:"家居收纳", auto:"汽车用品", custom:"其他品类" };
    const project = {
      id:`custom-${Date.now()}`,
      title:document.querySelector("#upload-title").value.trim(),
      category,
      categoryLabel:labels[category],
      desc:document.querySelector("#upload-description").value.trim() || "个人新增视觉设计作品。",
      tags:["新增作品",`${images.length} 张图片`], custom:true,
      images:{ main:images, sku:[], detail:[] }
    };
    await saveCustomProject(project);
    state.projects.unshift(project);
    state.filter = "custom"; state.visible = 8;
    document.querySelectorAll(".filter-button").forEach(button => button.classList.toggle("active",button.dataset.filter === "custom"));
    renderProjects();
    event.target.reset(); state.uploadFiles = []; document.querySelector("#upload-preview").innerHTML = "";
    closeDialog(uploadDialog);
  } catch (error) { alert("图片保存失败，请减少图片数量后重试。"); console.error(error); }
  finally { submit.disabled = false; submit.innerHTML = `保存到作品集 <i data-lucide="check"></i>`; iconRefresh(); }
});

document.querySelector("#delete-project").addEventListener("click", async () => {
  if (!state.activeProject?.custom || !confirm("确定删除这组新增作品吗？")) return;
  await removeCustomProject(state.activeProject.id);
  state.projects = state.projects.filter(project => project.id !== state.activeProject.id);
  closeDialog(projectDialog); renderProjects();
});

function initParticles() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.querySelector("#particles");
  const ctx = canvas.getContext("2d");
  const pointer = { x:-1000, y:-1000 };
  let particles = [];
  function resize() {
    const dpr = Math.min(devicePixelRatio,2);
    canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const count = Math.min(85,Math.floor(innerWidth / 18));
    particles = Array.from({length:count},() => ({ x:Math.random()*innerWidth, y:Math.random()*innerHeight, vx:(Math.random()-.5)*.23, vy:(Math.random()-.5)*.23, r:Math.random()*1.2+.35, color:Math.random()>.8 ? "66,232,224" : "198,255,40" }));
  }
  window.addEventListener("resize",resize); resize();
  window.addEventListener("pointermove",event => { pointer.x=event.clientX; pointer.y=event.clientY; });
  function draw() {
    ctx.clearRect(0,0,innerWidth,innerHeight);
    particles.forEach((p,index) => {
      const dx=pointer.x-p.x, dy=pointer.y-p.y, dist=Math.hypot(dx,dy);
      if (dist < 130) { p.vx -= dx/dist*.008; p.vy -= dy/dist*.008; }
      p.vx *= .995; p.vy *= .995; p.x += p.vx; p.y += p.vy;
      if (p.x<0) p.x=innerWidth; if (p.x>innerWidth) p.x=0; if (p.y<0) p.y=innerHeight; if (p.y>innerHeight) p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(${p.color},.6)`; ctx.fill();
      particles.slice(index+1).forEach(q => { const d=Math.hypot(p.x-q.x,p.y-q.y); if(d<92){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(255,255,255,${.045*(1-d/92)})`;ctx.stroke();} });
    });
    requestAnimationFrame(draw);
  }
  draw();
}

function initMotion() {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle("visible",entry.isIntersecting)),{threshold:.1});
  document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
  const cursor = document.querySelector(".cursor-light");
  window.addEventListener("pointermove",event => { cursor.style.transform=`translate(${event.clientX}px,${event.clientY}px)`; cursor.classList.add("visible"); });
  window.addEventListener("scroll",() => {
    document.querySelector(".site-header").classList.toggle("scrolled",scrollY>30);
    const y=Math.min(scrollY*.08,50);
    document.querySelector(".hero-image-a").style.marginTop=`${y}px`;
    document.querySelector(".hero-image-b").style.marginBottom=`${y*.35}px`;
  },{passive:true});
}

async function init() {
  try { state.projects.unshift(...await getCustomProjects()); } catch (error) { console.warn("本地作品读取失败",error); }
  renderProjects(); initParticles(); initMotion(); iconRefresh();
}
init();

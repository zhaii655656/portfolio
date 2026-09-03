# Gitee Pages 部署说明

## 部署步骤

### 1. 注册 Gitee 账号
访问 https://gitee.com/ 注册一个账号（如果已有账号可以直接登录）

### 2. 创建新仓库
1. 登录后点击右上角的 `+` 号，选择「新建仓库」
2. 填写仓库信息：
   - 仓库名称：`portfolio`（或其他你喜欢的名字）
   - 路径：会自动生成
   - 开源：选择「公开」
   - 初始化仓库：不勾选任何选项
3. 点击「创建」

### 3. 上传文件到仓库
**方法A：网页上传（推荐，简单）**
1. 进入刚创建的仓库
2. 点击「上传文件」按钮
3. 把 `E:\ai\chajian\portfolio-web` 文件夹里的所有文件拖进去上传
4. 填写提交信息：「初始化作品集」
5. 点击「提交」

**方法B：使用 Git 命令（需要安装 Git）**
打开命令行，执行以下命令：
```bash
cd E:/ai/chajian/portfolio-web
git init
git add .
git commit -m "初始化作品集"
git remote add origin https://gitee.com/你的用户名/portfolio.git
git push -u origin master
```

### 4. 开启 Gitee Pages 服务
1. 在仓库页面找到「服务」菜单
2. 点击「Gitee Pages」
3. 选择分支：`master`
4. 部署目录：留空（根目录）
5. 点击「启动」或「部署」

### 5. 访问你的作品集
部署成功后，会显示一个访问地址，类似：
`https://你的用户名.gitee.io/portfolio`

这个链接就可以直接分享给别人了！

## 注意事项
- Gitee Pages 免费版首次部署后，后续更新需要手动点击「更新」按钮
- 如果图片加载慢，可能需要等待 CDN 缓存生效
- 确保仓库是「公开」状态，否则别人无法访问

## 更新作品集
如果以后要更新内容：
1. 修改本地文件
2. 重新上传到 Gitee 仓库（覆盖旧文件）
3. 在 Gitee Pages 页面点击「更新」按钮

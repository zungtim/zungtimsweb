# 个人网站更新备忘录

这个文件是给我自己看的：当我要更新个人网站的 Research、Achievements、Travel 板块时，按这里的步骤操作。

## 总原则

- 不要直接修改 `content/generated/media-manifest.ts`，它是自动生成文件。
- 不要直接修改 `public/photo-gen/`，它是自动生成图片目录。
- 原图统一放进 `public/photo-src/` 下对应板块目录，再运行媒体构建脚本。
- 上述是当前管线，不是私人存储方案：`public/photo-src/` 会随构建发布，只能放已确认可公开的素材。UI 改版没有处理原图的公开范围或历史记录隐私。
- 图片文件命名规则：
  - 封面图：`cover.jpg`、`cover.png`、`cover.webp` 等。
  - 图集图片：`1.jpg`、`2.jpg`、`3.jpg` 等数字命名。
- 新增或修改内容后，建议运行：

```bash
npm run media:build
npx tsc --noEmit
npm run build
```

`npm run dev` 和 `npm run build` 会自动先运行 `media:build`。

## 更新 Travel 板块

### 需要修改的内容文件

```text
content/travel.tsx
```

在 `travelEntries` 数组里新增一条旅行记录。页面按数组顺序生成滚动场景与底部缩略图，不需要逐项编写动画或修改场景数量。

常见字段包括：

```tsx
{
  id: '唯一 ID',
  year: 2026,
  date: '2026.05',
  title: '旅行标题',
  location: '地点',
  emoji: '图标',
  media: {
    module: 'travel',
    entryId: '2026.05.01',
  },
  description: (
    <>
      <div className="font-bold text-slate-900 dark:text-slate-200 mb-2">
        加粗简介
      </div>
      <p className="leading-relaxed">
        正文描述
      </p>
    </>
  ),
}
```

### 需要添加的图片目录

```text
public/photo-src/travel/<entryId>/
```

例子：

```text
public/photo-src/travel/2026.05.01/
├── cover.jpg
├── 1.jpg
├── 2.jpg
└── 3.jpg
```

`entryId` 必须和 `content/travel.tsx` 里的 `media.entryId` 完全一致。

封面展示会自动读取媒体清单中的宽高：竖图完整显示，横图在画幅合适时铺满；若屏幕比例导致裁切过多，也会改为完整展示。无需给每条记录手工设置横竖图开关。更换封面后仍需重新运行媒体构建，以更新宽高信息。

## 更新 Achievements 板块

### 需要修改的内容文件

```text
content/achievements.ts
```

在 `achievementEntries` 数组里新增一条成就卡片。

常见字段包括：

```ts
{
  id: 'achievement-2026-example',
  title: '比赛或成就标题',
  role: '第一作者',
  award: '金奖',
  date: '2026.05',
  organizer: '主办方',
  level: 'National',
  media: {
    module: 'achievements',
    entryId: '2026.05.01',
  },
}
```

`level` 目前可用：

```ts
'National' | 'Provincial' | 'Municipal'
```

### 需要添加的图片目录

```text
public/photo-src/achievements/<entryId>/
```

例子：

```text
public/photo-src/achievements/2026.05.01/
├── cover.jpg
├── 1.jpg
└── 2.jpg
```

`entryId` 必须和 `content/achievements.ts` 里的 `media.entryId` 完全一致。

## 更新 Research 与本科科研记录

2026-10-20 起，Research 以研究兴趣为主，本科项目和专利归入 Background。没有经确认的公开笔记或论文时，不展示空栏目。

- 首页姓名、研究导向简介、邮箱、头像和研究兴趣：`content/profile.ts`。不再使用临时阶段标签或旧的本科泛兴趣简介。
- Research 页面布局：`components/Research.tsx`。
- Background 页面组合：`components/Background.tsx`。
- 教育记录：`components/Education.tsx`。
- 全站配色、字体层级、响应式排版：`styles/site.css`。
- Travel 滚动切换场景、底部缩略图导航和鼠标视差：`components/Travel.tsx`；图集、大图、缩放与切图：`components/TravelGallery.tsx`。搜索、年份筛选、网格/列表切换工具栏已按要求删除。旅行正文仍只在 `content/travel.tsx` 维护。
- 内容进入视口时的过渡：`hooks/usePageMotion.ts`，配合 `styles/site.css`；不要给固定弹窗或 Travel 的 sticky 容器祖先添加位移。
- 原 `/education` 与 `/achievements` 地址会转到 `/background`，旧链接仍可使用。

### 需要修改的内容文件

```text
content/research.tsx
```

本科历史项目与专利的数据在 `content/research.tsx` 的 `researchData` 数组中，页面默认简要显示，展开后可查看原始记录与图片。未来真实开展的研究生课题不应直接混入这个本科档案，应另行增加经确认的当前研究展示。

常见字段包括：

```tsx
{
  id: '3',
  type: 'research',
  title: '科研项目标题',
  subtitle: '项目类别或正式名称',
  role: '第一负责人',
  date: '2026.01 - 2026.12',
  status: '记录状态',
  tags: ['关键词1', '关键词2'],
  sections: [
    { title: '研究问题', body: '经确认的研究背景' },
    { title: '技术路线', body: '经确认的研究方法' },
  ],
  metrics: [
    '关键成果 1',
    '关键成果 2',
  ],
  images: [
    {
      media: {
        module: 'research',
        entryId: 'research-example',
      },
      caption: '图片说明'
    }
  ]
}
```

如果是专利，可以使用：

```tsx
type: 'patent'
```

并按现有专利条目的格式添加 `citation`。

### 需要添加的图片目录

推荐 Research 图片也走压缩管线：

```text
public/photo-src/research/<entryId>/
```

例子：

```text
public/photo-src/research/research-example/
└── cover.png
```

`entryId` 必须和 `content/research.tsx` 里图片的 `media.entryId` 完全一致。

目前 Research 图片渲染会读取该目录下的 `cover.*`。如果一个 Research 项目要展示多张图，可以在 `images` 数组里放多个图片对象，每个对象对应一个不同的 `entryId`。

## 更新后检查

每次更新内容和图片后，建议按顺序执行：

```bash
npm run media:build
npx tsc --noEmit
npm run build
```

检查重点：

- 新增卡片是否出现在正确板块。
- 图片是否正常显示。
- 点击图集是否能打开。
- Travel 滚动、缩略图跳转及关闭图集后的原位置是否正常，手机横屏也要检查。
- 明暗模式下文字、按钮、卡片、边框、弹窗是否都清晰可读。
- `content/generated/media-manifest.ts` 不要手动改，它应该由脚本自动维护。

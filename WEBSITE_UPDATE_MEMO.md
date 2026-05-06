# 个人网站更新备忘录

这个文件是给我自己看的：当我要更新个人网站的 Research、Achievements、Travel 板块时，按这里的步骤操作。

## 总原则

- 不要直接修改 `content/generated/media-manifest.ts`，它是自动生成文件。
- 不要直接修改 `public/photo-gen/`，它是自动生成图片目录。
- 原图统一放进 `public/photo-src/` 下对应板块目录，再运行媒体构建脚本。
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

在 `travelEntries` 数组里新增一条旅行卡片。

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

## 更新 Achievements 板块

### 需要修改的内容文件

```text
content/achievements.ts
```

在 `achievementEntries` 数组里新增一条成就卡片。

常见字段包括：

```ts
{
  id: 'competition-2026-example',
  title: '比赛或成就标题',
  role: '第一作者',
  award: '金奖',
  date: '2026.05',
  organizer: '主办方',
  level: 'National',
  media: {
    module: 'competitions',
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
public/photo-src/competitions/<entryId>/
```

例子：

```text
public/photo-src/competitions/2026.05.01/
├── cover.jpg
├── 1.jpg
└── 2.jpg
```

`entryId` 必须和 `content/achievements.ts` 里的 `media.entryId` 完全一致。

## 更新 Research 板块

### 需要修改的内容文件

```text
components/Research.tsx
```

Research 目前的数据写在 `Research.tsx` 里的 `researchData` 数组中。新增科研项目或专利时，在这个数组里新增一项。

常见字段包括：

```tsx
{
  id: '3',
  type: 'research',
  title: '科研项目标题',
  role: '第一负责人',
  date: '2026.01 - 2026.12',
  tags: ['关键词1', '关键词2'],
  background: '研究背景',
  methodology: '研究方法',
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

`entryId` 必须和 `Research.tsx` 里图片的 `media.entryId` 完全一致。

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
- 明暗模式下文字、按钮、卡片、边框、弹窗是否都清晰可读。
- `content/generated/media-manifest.ts` 不要手动改，它应该由脚本自动维护。


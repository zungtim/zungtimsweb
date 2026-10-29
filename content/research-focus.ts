import type { ResearchInterestEntry, ResearchMethodEntry, ResearchQuestionEntry } from '../types/content';

// These are interests and method contexts, not completed projects or technical credentials.
export const researchInterests: ResearchInterestEntry[] = [
  { id: '01', context: '学科背景', title: '物理化学', english: 'Physical chemistry' },
  { id: '02', context: '研究主线', title: '低温离子—分子反应动力学', english: 'Cold ion–molecule reaction dynamics' },
  { id: '03', context: '方法视角', title: '量子态选择与外场调控', english: 'Quantum-state selection & external-field control' },
];

export const researchFocus = {
  primaryInterestId: '02',
  overview: '我的研究兴趣集中于基元化学反应动力学，尤其关注低温条件下离子—分子反应中，碰撞能量与反应物量子态对反应过程的影响，以及量子态制备、外场调控与精密测量在相关研究中的作用。',
  methodsIntro: '从反应物初态制备，到碰撞条件控制，再到动力学观测，关注实验条件如何支撑对微观机制的判断。',
};

export const researchQuestions: ResearchQuestionEntry[] = [
  {
    id: '01',
    title: '碰撞能量与内部量子态如何影响低温反应？',
    summary: '关注碰撞能量、反应物振转态及电子态与反应速率、产物通道之间的联系，理解动力学观测背后的微观反应机制。',
    details: [
      { label: '关注变量', body: '碰撞能量与反应物内部量子态。' },
      { label: '观测线索', body: '反应速率常数、产物种类与相对产率等可获得的动力学信息。' },
      { label: '解释目标', body: '辨析不同反应路径，并考察量子效应在低温反应中的作用。' },
    ],
  },
  {
    id: '02',
    title: '如何通过量子态选择与外场调控辨析反应机制？',
    summary: '关注反应物初态的可控制备，以及激光或其他外场对反应条件的调节；通过比较不同控制条件下的动力学响应，理解各因素对反应过程的影响。',
    details: [
      { label: '关注变量', body: '量子态布居、激发条件与外场参数。' },
      { label: '观测线索', body: '不同控制条件下反应速率与产物信号的变化。' },
      { label: '解释目标', body: '区分初态制备、探测过程与反应本身对测量结果的影响。' },
    ],
  },
];

export const researchMethods: ResearchMethodEntry[] = [
  {
    id: '01',
    title: '反应物制备与控制',
    english: 'Preparation',
    summary: '分子束、离子俘获与激光冷却，以及面向特定内部量子态的光谱制备。',
  },
  {
    id: '02',
    title: '碰撞条件控制',
    english: 'Controlled collisions',
    summary: '相对速度、碰撞能量与外场条件，以及能量分辨率和反应物初态分布。',
  },
  {
    id: '03',
    title: '动力学观测',
    english: 'Observation',
    summary: '将反应速率、产物信号与可控变量联系起来，通过对照测量和理论比较分析反应机制。',
  },
];

import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Education: React.FC = () => (
  <div>
    <article className="education-row">
      <p className="record-date">2023.09 - 2027.06</p>
      <div className="education-body">
        <div className="education-title"><img src="/photo/education/gdutlogo.png" alt="广东工业大学校徽" width="40" height="40" /><h3>广东工业大学</h3></div>
        <p>化学工程与工艺 · Bachelor of Engineering (工学学士)</p>
        <details className="record-details">
          <summary className="ui-focus-ring">本科阶段记录 <ChevronDown className="h-4 w-4" /></summary>
          <dl className="education-facts">
            <div><dt>GPA</dt><dd>3.46 / 5.0</dd></div>
            <div><dt>百分制成绩</dt><dd>87.18 / 100</dd></div>
            <div><dt>大一综合测评</dt><dd>Top 1.28% · 2 / 156</dd></div>
            <div><dt>大二综合测评</dt><dd>Top 1.95% · 3 / 154</dd></div>
          </dl>
          <div className="record-copy">
            <p>学科评估 B+</p>
            <h4>主修课程</h4><p>化工原理 / 化学反应工程 / 分离工程 / 化工热力学 / 物理化学 / 分析化学 / 有机化学 / 无机化学</p>
            <h4>在校经历</h4>
            <p>2024.09 — 2025.07 · 化工专业第二党支部党支部副书记<br />总体负责支部日常事务处理与党员管理</p>
            <p className="mt-3">2024.09 — 2025.07 · 轻工化工学院团委学生副书记<br />总体负责学院团委科技创新板块事务</p>
          </div>
        </details>
      </div>
    </article>
    <article className="education-row">
      <p className="record-date">2025.09 - 2026.09</p>
      <div className="education-body">
        <div className="education-title"><h3>印制电子电路技术 (PCB) 创新学院</h3></div>
        <p>广东工业大学 · 辅修专业</p>
        <details className="record-details">
          <summary className="ui-focus-ring">辅修记录 <ChevronDown className="h-4 w-4" /></summary>
          <div className="record-copy"><p>对印制电子电路制造工艺进行学习，拓宽专业视野并探索学科交叉可能性</p><h4>课程</h4><p>印制电子电路原理与工艺 / 电子装联工艺 / 印制电路板加工技术 / 印制电路板电镀技术</p></div>
        </details>
      </div>
    </article>
  </div>
);

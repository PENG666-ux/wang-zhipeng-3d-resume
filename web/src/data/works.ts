export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: '研究与能力',
    closeLabel: '返回',
    openLabel: '查看详情',
    hint: '继续下滑',
    awardsLabel: '状态',
    visitLabel: '访问链接',
    detailPlaceholder: '项目详情',
    phImageLabel: '研究 / 工程项目',
    phButtonLabel: '项目链接',
    countLabel: (n) => `${n} 项`,
    sections: [
      {
        id: 'physics-ai',
        no: '01',
        title: '物理信息学习',
        tagline: 'PINN · 超声导波 · 损伤识别',
        items: [
          {
            name: 'U-PINN：薄板结构少样本损伤推断',
            meta: 'Advanced Engineering Informatics',
            tags: ['Under Review'],
            slug: 'upinn-damage-inference',
          },
          {
            name: 'Rail-PINN：复杂变截面轨道损伤反演',
            meta: 'MSSP',
            tags: ['In Preparation'],
            slug: 'waveguide-anomaly-diagnosis',
          },
        ],
        footer: 'Python · TensorFlow · PyTorch · PINN · PDE · Sparse Data',
      },
      {
        id: 'motion-sensing',
        no: '02',
        title: '运动传感验证',
        tagline: '算法验证 · 模型评估 · 滑雪场景',
        items: [
          {
            name: '运动传感器算法验证能力图谱',
            meta: '目标岗位匹配',
            tags: ['TensorFlow', 'PyTorch', 'Ski'],
            slug: 'motion-sensor-validation',
          },
        ],
        footer: 'CNN · LSTM · GNN · 数据分析 · 调参 · 验证评估',
      },
      {
        id: 'engineering',
        no: '03',
        title: '工程分析',
        tagline: 'CAE · 振动测试 · 信号处理',
        items: [
          {
            name: '结构动力学建模与 CAE 仿真',
            tags: ['COMSOL', 'HyperMesh'],
            slug: 'engineering-toolkit',
          },
          {
            name: '振动测试与传感信号分析',
            tags: ['MATLAB', 'LabVIEW', 'NumPy'],
            slug: 'signal-analysis',
          },
        ],
        footer: '模型构建 · 工况配置 · 动态响应计算 · 后处理',
      },
      {
        id: 'automation',
        no: '04',
        title: '流程自动化',
        tagline: 'AI Agent · Python · Docker',
        items: [
          {
            name: 'AI Agent 驱动的仿真流程自动化',
            tags: ['Codex', 'Claude Code', 'RAG'],
            slug: 'simulation-automation',
          },
        ],
        footer: 'LangChain · Docker · Git · 参数传递 · 任务调度 · 结果提取',
      },
    ],
  },
  en: {
    title: 'Research & Skills',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Status',
    visitLabel: 'Visit link',
    detailPlaceholder: 'Project details',
    phImageLabel: 'Research / Engineering Project',
    phButtonLabel: 'Project link',
    countLabel: (n) => `${n} items`,
    sections: [
      {
        id: 'physics-ai',
        no: '01',
        title: 'Physics-Informed Learning',
        tagline: 'PINN · UGW · Damage Identification',
        items: [
          {
            name: 'U-PINN: Few-Shot Damage Inference for Thin Plates',
            meta: 'Advanced Engineering Informatics',
            tags: ['Under Review'],
            slug: 'upinn-damage-inference',
          },
          {
            name: 'Rail-PINN: Damage Inversion for Variable-Section Rails',
            meta: 'MSSP',
            tags: ['In Preparation'],
            slug: 'waveguide-anomaly-diagnosis',
          },
        ],
        footer: 'Python · TensorFlow · PyTorch · PINN · PDE · Sparse Data',
      },
      {
        id: 'motion-sensing',
        no: '02',
        title: 'Motion Sensor Validation',
        tagline: 'Algorithm Testing · Model Evaluation · Skiing',
        items: [
          {
            name: 'Motion Sensor Algorithm Validation Profile',
            meta: 'Target Role Fit',
            tags: ['TensorFlow', 'PyTorch', 'Ski'],
            slug: 'motion-sensor-validation',
          },
        ],
        footer: 'CNN · LSTM · GNN · Data Analysis · Tuning · Validation',
      },
      {
        id: 'engineering',
        no: '03',
        title: 'Engineering Analysis',
        tagline: 'CAE · Vibration Testing · Signal Processing',
        items: [
          {
            name: 'Structural Dynamics Modeling & CAE',
            tags: ['COMSOL', 'HyperMesh'],
            slug: 'engineering-toolkit',
          },
          {
            name: 'Vibration Testing & Sensor Signal Analysis',
            tags: ['MATLAB', 'LabVIEW', 'NumPy'],
            slug: 'signal-analysis',
          },
        ],
        footer: 'Modeling · Load Cases · Dynamic Response · Post-processing',
      },
      {
        id: 'automation',
        no: '04',
        title: 'Workflow Automation',
        tagline: 'AI Agent · Python · Docker',
        items: [
          {
            name: 'AI-Agent-Driven Simulation Automation',
            tags: ['Codex', 'Claude Code', 'RAG'],
            slug: 'simulation-automation',
          },
        ],
        footer: 'LangChain · Docker · Git · Parameters · Scheduling · Extraction',
      },
    ],
  },
}

// 使用编号渐变封面，避免沿用原作者的个人作品素材。
export const SECTION_COVERS: Record<string, string> = {}

export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((count, group) => count + group.items.length, 0)
  return 0
}

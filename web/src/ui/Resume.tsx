import { motion } from 'framer-motion'
import { FOCUS_POINTS } from '../data/focusPoints'

interface ResumeEntry {
  period: string
  place: string
  role: string
  points?: string[]
}

const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  zh: {
    title: '履历与研究',
    entries: [
      {
        period: '2024',
        place: '海南大学',
        role: '土木工程 · 本科',
        points: [
          '重点学习结构力学与数值分析，建立结构建模、力学分析与工程计算基础。',
        ],
      },
      {
        period: '2027（预计）',
        place: '中山大学',
        role: '土木工程 · 硕士研究生',
        points: [
          '研究方向：结构动力响应分析、超声导波、传感信号分析处理与结构损伤识别。',
          '主修结构动力学、理论力学、深度学习、深度学习前沿、弹性力学及有限元、数据挖掘、信号处理与数值分析。',
          '目标岗位：兼职运动传感器算法验证工程师。',
        ],
      },
      {
        period: 'Under Review',
        place: 'U-PINN · 薄板结构损伤推断',
        role: 'Advanced Engineering Informatics · Q1 · IF 9.9',
        points: [
          '基于 Kirchhoff-Love 薄板理论建立超声导波动力学模型，并使用 COMSOL 构建多损伤工况有限元模型。',
          '使用 PyTorch 构建 PINN，将物理 PDE 嵌入损失函数，融合数据驱动与物理约束训练。',
          '采用仿真数据预训练与实验数据微调的两阶段策略，在约 10% 稀疏测点下完成高分辨率波场重建与损伤定量识别。',
        ],
      },
      {
        period: 'In Preparation',
        place: 'Rail-PINN · 复杂变截面轨道损伤反演',
        role: 'Mechanical Systems and Signal Processing · Q1 · IF 8.9',
        points: [
          '由三维 Navier-Cauchy 方程沿厚度方向降维，建立考虑轨腰变厚度及厚度梯度影响的二维弹性动力学模型。',
          '搭建 PZT 阵列并获取 81 条激励-接收导波路径，将激励源位置作为条件输入，统一建模多激励工况。',
          '构建源条件化 PINN，采用“仿真预训练-实验微调-损伤参数反演”策略，估计损伤位置与尺寸。',
        ],
      },
      {
        period: '目标岗位',
        place: '运动传感器算法验证',
        role: '兼职方向 · 滑雪运动场景',
        points: [
          '熟悉 TensorFlow 与 PyTorch，具备机器学习和深度学习模型构建、训练、调参及评估经验，熟悉 PINN、CNN、LSTM、GNN。',
          '熟悉 MATLAB、LabVIEW、COMSOL、HyperMesh，具备振动/信号分析与结构动力学仿真经验。',
          '双板/单板滑雪爱好者，对运动传感器的真实使用场景具备直接体验。',
        ],
      },
    ],
  },
  en: {
    title: 'Résumé & Research',
    entries: [
      {
        period: '2024',
        place: 'Hainan University',
        role: 'B.Eng. in Civil Engineering',
        points: ['Focused on structural mechanics and numerical analysis.'],
      },
      {
        period: 'Expected 2027',
        place: 'Sun Yat-sen University',
        role: 'M.Sc. Candidate in Civil Engineering',
        points: [
          'Research: structural dynamic response, ultrasonic guided waves, sensor signal processing, and structural damage identification.',
          'Target role: part-time motion sensor algorithm validation engineer.',
        ],
      },
      {
        period: 'Under Review',
        place: 'U-PINN · Thin-Plate Damage Inference',
        role: 'Advanced Engineering Informatics · Q1 · IF 9.9',
        points: [
          'Built a Kirchhoff-Love ultrasonic guided-wave model and multi-damage COMSOL finite-element simulations.',
          'Embedded the governing PDE in a PyTorch PINN and used simulation pretraining plus experimental fine-tuning.',
          'Reconstructed high-resolution wavefields and quantified damage from roughly 10% sparse measurements.',
        ],
      },
      {
        period: 'In Preparation',
        place: 'Rail-PINN · Damage Inversion for Variable-Section Rails',
        role: 'Mechanical Systems and Signal Processing · Q1 · IF 8.9',
        points: [
          'Reduced the 3D Navier-Cauchy equations into a 2D elastic-dynamics model with rail-web thickness and thickness-gradient effects.',
          'Built a PZT array with 81 excitation-reception paths and conditioned the network on source location for multi-excitation modeling.',
          'Combined simulation pretraining, experimental fine-tuning, and parameter inversion to estimate damage location and size.',
        ],
      },
      {
        period: 'Target Role',
        place: 'Motion Sensor Algorithm Validation',
        role: 'Part-time · Skiing Scenarios',
        points: [
          'Experienced with TensorFlow and PyTorch model building, training, tuning, and evaluation; familiar with PINN, CNN, LSTM, and GNN.',
          'Uses MATLAB, LabVIEW, COMSOL, and HyperMesh for vibration/signal analysis and structural-dynamics simulation.',
          'Skier in both alpine and snowboard disciplines, with direct familiarity with the target motion-sensing context.',
        ],
      },
    ],
  },
}

const POINT_ORDER = FOCUS_POINTS
const EASE = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        <motion.div className="tl-role" variants={itemV}>
          {entry.role}
        </motion.div>
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((entry, index) => (
          <Entry key={`${entry.period}-${entry.place}`} entry={entry} index={index} />
        ))}
      </div>
    </section>
  )
}

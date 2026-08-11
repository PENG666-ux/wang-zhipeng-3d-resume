---
title: Rail-PINN：复杂变截面轨道损伤反演
year: In Preparation
role: 动力学降维建模 / 多源传感数据建模 / PINN 设计 / 损伤参数反演
tags: [Rail-PINN, Navier-Cauchy, PZT Array, Source-conditioned PINN, Sparse Sensing]
---

## 项目背景

面向复杂变截面轨道中导波传播复杂、传感观测稀疏以及损伤参数难以准确反演的问题，建立考虑轨腰变厚度特性的二维弹性动力学模型，并融合多源超声导波传感数据构建 Rail-PINN。

## 核心工作

- **动力学建模**：从三维 Navier-Cauchy 方程出发，通过厚度方向降维，建立包含轨腰变厚度及厚度梯度影响的二维弹性动力学模型，并将其作为 PINN 的核心物理约束。
- **多源传感数据建模**：搭建 PZT 阵列，获取 81 条激励-接收导波路径；将激励源位置作为网络条件输入，统一建模多激励工况。
- **PINN 算法设计**：构建源条件化 PINN，将传感观测数据、动力学 PDE、边界条件和初始条件联合嵌入损失函数。
- **损伤反演与验证**：采用“仿真预训练-实验微调-损伤参数反演”的两阶段策略，通过位置粗定位、尺寸精细估计与联合优化完成损伤识别。

论文 *Physics-informed Neural Network for Anomaly Diagnosis in Complex Waveguide Structures* 计划投稿至 **Mechanical Systems and Signal Processing**，当前处于准备阶段。

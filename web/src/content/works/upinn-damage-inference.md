---
title: U-PINN：薄板结构少样本损伤推断
year: Under Review
role: 动力学建模 / PINN 设计 / 仿真与实验数据融合
tags: [PyTorch, PINN, Kirchhoff-Love, COMSOL, Sparse Data]
---

## 项目目标

面向稀疏传感与有限试验数据下的薄壁结构波场重建和损伤反演问题，建立物理约束与数据驱动相结合的诊断框架。

## 核心工作

- 基于 Kirchhoff-Love 薄板理论建立超声导波动力学模型。
- 使用 COMSOL 构建多损伤工况有限元模型，完成材料、边界、激励和网格配置。
- 基于 PyTorch 构建 PINN，将物理 PDE 嵌入损失函数，优化网络结构与超参数。
- 采用仿真数据预训练和实验数据微调的两阶段训练策略，提高真实场景泛化能力。

## 研究结果

以约为传统采样极限点数 10% 的稀疏测点，实现高分辨率波场重建与损伤定量识别。

论文 *U-PINN: A Few-Shot UGW-based Damage Inference Model of Thin Plate Structures under a Kirchhoff-Love Plate Theory Informed Learning Framework* 投稿至 **Advanced Engineering Informatics**，当前处于审稿阶段。

'use client';

import { useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  type Node,
  type Edge,
  Handle,
  Position,
} from '@xyflow/react';
import { STACK } from '@/data/stack';

function CenterNode({ data }: { data: { label: string } }) {
  return (
    <div className="node-glow rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 px-8 py-5 text-center shadow-2xl">
      <div className="text-lg font-bold text-white tracking-wide">{data.label}</div>
      <div className="text-[10px] text-indigo-200 mt-1 uppercase tracking-widest">Workflow</div>
      <Handle type="source" position={Position.Top} className="!bg-indigo-400 !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} className="!bg-indigo-400 !w-2 !h-2" id="b" />
      <Handle type="source" position={Position.Left} className="!bg-indigo-400 !w-2 !h-2" id="l" />
      <Handle type="source" position={Position.Right} className="!bg-indigo-400 !w-2 !h-2" id="r" />
    </div>
  );
}

function ScenarioNode({ data }: { data: { label: string; icon: string } }) {
  return (
    <div className="rounded-xl border border-[var(--border-hover)] bg-[var(--bg-card)] px-5 py-3 shadow-lg hover:border-indigo-500/40 transition-colors">
      <div className="flex items-center gap-2">
        <span className="text-xl">{data.icon}</span>
        <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">{data.label}</span>
      </div>
      <Handle type="target" position={Position.Left} className="!bg-[var(--border-hover)] !w-1.5 !h-1.5" />
      <Handle type="target" position={Position.Right} className="!bg-[var(--border-hover)] !w-1.5 !h-1.5" id="r" />
      <Handle type="target" position={Position.Top} className="!bg-[var(--border-hover)] !w-1.5 !h-1.5" id="t" />
      <Handle type="target" position={Position.Bottom} className="!bg-[var(--border-hover)] !w-1.5 !h-1.5" id="b" />
      <Handle type="source" position={Position.Left} className="!bg-[var(--border-hover)] !w-1.5 !h-1.5" id="sl" />
      <Handle type="source" position={Position.Right} className="!bg-[var(--border-hover)] !w-1.5 !h-1.5" id="sr" />
      <Handle type="source" position={Position.Top} className="!bg-[var(--border-hover)] !w-1.5 !h-1.5" id="st" />
      <Handle type="source" position={Position.Bottom} className="!bg-[var(--border-hover)] !w-1.5 !h-1.5" id="sb" />
    </div>
  );
}

function ToolNode({ data }: { data: { name: string; role: string; note: string; isPaid: boolean; url: string; isMain: boolean } }) {
  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5 hover:border-indigo-500/30 hover:bg-[var(--bg-card)] transition-all group cursor-pointer w-[200px]"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${data.isMain ? 'bg-indigo-400' : 'bg-[var(--text-muted)]'}`} />
        <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-indigo-300 transition-colors truncate">{data.name}</span>
        <span className="text-[8px] ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)]">&#8599;</span>
      </div>
      <span className={`inline-block text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mb-1 ${
        data.isPaid ? 'bg-white/5 text-[var(--text-muted)]' : 'bg-emerald-500/10 text-emerald-400'
      }`}>{data.role}</span>
      <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">{data.note}</p>
      <Handle type="target" position={Position.Left} className="!bg-transparent !w-0 !h-0" />
      <Handle type="target" position={Position.Right} className="!bg-transparent !w-0 !h-0" id="r" />
      <Handle type="target" position={Position.Top} className="!bg-transparent !w-0 !h-0" id="t" />
      <Handle type="target" position={Position.Bottom} className="!bg-transparent !w-0 !h-0" id="b" />
    </a>
  );
}

const nodeTypes = {
  center: CenterNode,
  scenario: ScenarioNode,
  tool: ToolNode,
};

// Layout: left column (4 scenarios) and right column (3 scenarios), tools fan out horizontally
function buildLayout() {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const cx = 550, cy = 400;
  nodes.push({
    id: 'center',
    type: 'center',
    position: { x: cx - 80, y: cy - 30 },
    data: { label: 'Kiki 的工具栈' },
  });

  const leftScenarios = [0, 1, 2, 3]; // Scripting, Image, Video, Voice
  const rightScenarios = [4, 5, 6];    // Editing, Research, Automation

  const scenarioXLeft = cx - 280;
  const scenarioXRight = cx + 180;
  const yStart = 80;
  const yGap = 180;

  function placeScenario(idx: number, sx: number, sy: number, side: 'left' | 'right') {
    const section = STACK[idx];
    const scenarioId = `s-${idx}`;

    nodes.push({
      id: scenarioId,
      type: 'scenario',
      position: { x: sx, y: sy },
      data: { label: section.scenario, icon: section.icon },
    });

    const centerHandle = side === 'left' ? 'l' : 'r';
    const scenarioTarget = side === 'left' ? 'r' : Position.Left;
    edges.push({
      id: `e-center-${scenarioId}`,
      source: 'center',
      target: scenarioId,
      sourceHandle: centerHandle,
      targetHandle: scenarioTarget as string,
      type: 'default',
      style: { stroke: '#6366f1', strokeWidth: 2, opacity: 0.3 },
    });

    const toolXOffset = side === 'left' ? -240 : 240;
    const toolYStart = sy - ((section.picks.length - 1) * 80) / 2;

    section.picks.forEach((pick, j) => {
      const tx = sx + toolXOffset;
      const ty = toolYStart + j * 80;
      const toolId = pick.id;

      nodes.push({
        id: toolId,
        type: 'tool',
        position: { x: tx, y: ty },
        data: { ...pick, isMain: j === 0 },
      });

      const srcHandle = side === 'left' ? 'sl' : 'sr';
      const tgtHandle = side === 'left' ? 'r' : Position.Left;
      edges.push({
        id: `e-${scenarioId}-${toolId}`,
        source: scenarioId,
        target: toolId,
        sourceHandle: srcHandle,
        targetHandle: tgtHandle as string,
        type: 'default',
        style: { stroke: '#2a2a3e', strokeWidth: 1.5 },
      });
    });
  }

  leftScenarios.forEach((idx, i) => {
    placeScenario(idx, scenarioXLeft, yStart + i * yGap, 'left');
  });

  rightScenarios.forEach((idx, i) => {
    const yOffset = (leftScenarios.length - rightScenarios.length) * yGap / 2;
    placeScenario(idx, scenarioXRight, yStart + i * yGap + yOffset, 'right');
  });

  return { initialNodes: nodes, initialEdges: edges };
}

export default function MindMap() {
  const { initialNodes, initialEdges } = useMemo(buildLayout, []);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edgesState, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[80vh] min-h-[600px] rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--bg-primary)]">
      <ReactFlow
        key="mindmap-v2"
        nodes={nodes}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15, maxZoom: 0.32 }}
        minZoom={0.1}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1a1a2a" />
        <Controls />
      </ReactFlow>
    </div>
  );
}

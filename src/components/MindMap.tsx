'use client';

import { useCallback, useMemo } from 'react';
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
      className="block rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5 hover:border-indigo-500/30 hover:bg-[var(--bg-card)] transition-all group cursor-pointer max-w-[220px]"
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

export default function MindMap() {
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const cx = 600, cy = 450;
    nodes.push({
      id: 'center',
      type: 'center',
      position: { x: cx - 80, y: cy - 30 },
      data: { label: 'Kiki 的工具栈' },
    });

    const scenarioCount = STACK.length;
    const radius = 280;

    STACK.forEach((section, i) => {
      const angle = (2 * Math.PI * i) / scenarioCount - Math.PI / 2;
      const sx = cx + radius * Math.cos(angle) - 70;
      const sy = cy + radius * Math.sin(angle) - 20;
      const scenarioId = `s-${i}`;

      nodes.push({
        id: scenarioId,
        type: 'scenario',
        position: { x: sx, y: sy },
        data: { label: section.scenario, icon: section.icon },
      });

      const sourceHandle = i < scenarioCount / 2 ? 'r' : 'l';
      const targetHandle = angle > -Math.PI / 4 && angle < Math.PI * 3 / 4 ? Position.Left : Position.Right;

      edges.push({
        id: `e-center-${scenarioId}`,
        source: 'center',
        target: scenarioId,
        sourceHandle: sourceHandle,
        type: 'default',
        style: { stroke: '#6366f1', strokeWidth: 2, opacity: 0.3 },
      });

      const toolRadius = 180;
      const spreadAngle = Math.PI / (section.picks.length + 1);
      const baseAngle = angle - spreadAngle * (section.picks.length - 1) / 2;

      section.picks.forEach((pick, j) => {
        const ta = baseAngle + spreadAngle * j;
        const outerR = radius + toolRadius;
        const tx = cx + outerR * Math.cos(ta) - 100;
        const ty = cy + outerR * Math.sin(ta) - 30;
        const toolId = pick.id;

        nodes.push({
          id: toolId,
          type: 'tool',
          position: { x: tx, y: ty },
          data: { ...pick, isMain: j === 0 },
        });

        edges.push({
          id: `e-${scenarioId}-${toolId}`,
          source: scenarioId,
          target: toolId,
          sourceHandle: sx > cx ? 'sr' : 'sl',
          targetHandle: tx > sx ? Position.Left : Position.Right,
          type: 'default',
          style: { stroke: '#2a2a3e', strokeWidth: 1.5 },
        });
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, []);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edgesState, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[700px] rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--bg-primary)]">
      <ReactFlow
        nodes={nodes}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.3}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.65 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1a1a2a" />
        <Controls />
      </ReactFlow>
    </div>
  );
}

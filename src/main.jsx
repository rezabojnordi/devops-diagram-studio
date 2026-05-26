import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  Download,
  Upload,
  Type,
  Square,
  Circle,
  Diamond,
  ArrowRight,
  Trash2,
  Copy,
  Undo2,
  Redo2,
  Image as ImageIcon,
  Server,
  Cloud,
  Database,
  Shield,
  Network,
  GitBranch,
  MousePointer2,
  ZoomIn,
  ZoomOut,
  FileJson,
  Grid3X3,
  Layers,
} from "lucide-react";
import "./styles.css";

const uid = () => Math.random().toString(36).slice(2, 10);

const initialElements = [
  {
    id: uid(),
    type: "text",
    x: 350,
    y: 58,
    w: 560,
    h: 86,
    text: "DevOps & SRE Diagram Studio",
    fontSize: 42,
    fill: "#f8fafc",
    stroke: "transparent",
  },
  {
    id: uid(),
    type: "icon",
    icon: "cloud",
    x: 210,
    y: 240,
    w: 110,
    h: 110,
    text: "Cloud",
    fill: "#38bdf8",
    stroke: "#bae6fd",
  },
  {
    id: uid(),
    type: "icon",
    icon: "server",
    x: 510,
    y: 240,
    w: 110,
    h: 110,
    text: "App",
    fill: "#a78bfa",
    stroke: "#ddd6fe",
  },
  {
    id: uid(),
    type: "icon",
    icon: "database",
    x: 810,
    y: 240,
    w: 110,
    h: 110,
    text: "DB",
    fill: "#34d399",
    stroke: "#bbf7d0",
  },
  { id: uid(), type: "connector", x1: 320, y1: 295, x2: 510, y2: 295, stroke: "#e2e8f0" },
  { id: uid(), type: "connector", x1: 620, y1: 295, x2: 810, y2: 295, stroke: "#e2e8f0" },
];

const iconMap = {
  server: Server,
  cloud: Cloud,
  database: Database,
  shield: Shield,
  network: Network,
  git: GitBranch,
};

const templates = {
  incident: [
    { type: "text", x: 410, y: 60, w: 410, h: 70, text: "Incident Response Flow", fontSize: 40, fill: "#f8fafc", stroke: "transparent" },
    { type: "rect", x: 140, y: 230, w: 170, h: 90, text: "Alert", fill: "#1e293b", stroke: "#38bdf8" },
    { type: "diamond", x: 420, y: 210, w: 150, h: 130, text: "Impact?", fill: "#1e293b", stroke: "#f59e0b" },
    { type: "rect", x: 700, y: 230, w: 190, h: 90, text: "Mitigate", fill: "#1e293b", stroke: "#22c55e" },
    { type: "rect", x: 970, y: 230, w: 190, h: 90, text: "Postmortem", fill: "#1e293b", stroke: "#a78bfa" },
    { type: "connector", x1: 310, y1: 275, x2: 420, y2: 275, stroke: "#e2e8f0" },
    { type: "connector", x1: 570, y1: 275, x2: 700, y2: 275, stroke: "#e2e8f0" },
    { type: "connector", x1: 890, y1: 275, x2: 970, y2: 275, stroke: "#e2e8f0" },
  ],
  k8s: [
    { type: "text", x: 430, y: 60, w: 390, h: 70, text: "Kubernetes Architecture", fontSize: 40, fill: "#f8fafc", stroke: "transparent" },
    { type: "icon", icon: "cloud", x: 110, y: 240, w: 120, h: 120, text: "Ingress", fill: "#38bdf8", stroke: "#bae6fd" },
    { type: "icon", icon: "network", x: 360, y: 240, w: 120, h: 120, text: "Service", fill: "#60a5fa", stroke: "#bfdbfe" },
    { type: "icon", icon: "server", x: 610, y: 240, w: 120, h: 120, text: "Pods", fill: "#a78bfa", stroke: "#ddd6fe" },
    { type: "icon", icon: "database", x: 860, y: 240, w: 120, h: 120, text: "Storage", fill: "#34d399", stroke: "#bbf7d0" },
    { type: "icon", icon: "shield", x: 610, y: 450, w: 120, h: 120, text: "Policy", fill: "#f97316", stroke: "#fed7aa" },
    { type: "connector", x1: 230, y1: 300, x2: 360, y2: 300, stroke: "#e2e8f0" },
    { type: "connector", x1: 480, y1: 300, x2: 610, y2: 300, stroke: "#e2e8f0" },
    { type: "connector", x1: 730, y1: 300, x2: 860, y2: 300, stroke: "#e2e8f0" },
    { type: "connector", x1: 670, y1: 360, x2: 670, y2: 450, stroke: "#e2e8f0" },
  ],
  cicd: [
    { type: "text", x: 455, y: 60, w: 330, h: 70, text: "CI/CD Pipeline", fontSize: 40, fill: "#f8fafc", stroke: "transparent" },
    { type: "icon", icon: "git", x: 120, y: 260, w: 105, h: 105, text: "Git", fill: "#f97316", stroke: "#fed7aa" },
    { type: "rect", x: 340, y: 265, w: 150, h: 90, text: "Build", fill: "#1e293b", stroke: "#38bdf8" },
    { type: "rect", x: 610, y: 265, w: 150, h: 90, text: "Test", fill: "#1e293b", stroke: "#22c55e" },
    { type: "rect", x: 880, y: 265, w: 150, h: 90, text: "Deploy", fill: "#1e293b", stroke: "#a78bfa" },
    { type: "connector", x1: 225, y1: 312, x2: 340, y2: 312, stroke: "#e2e8f0" },
    { type: "connector", x1: 490, y1: 312, x2: 610, y2: 312, stroke: "#e2e8f0" },
    { type: "connector", x1: 760, y1: 312, x2: 880, y2: 312, stroke: "#e2e8f0" },
  ],
};

function ToolbarButton({ active, children, onClick, title }) {
  return (
    <button title={title} onClick={onClick} className={`toolbar-button ${active ? "active" : ""}`}>
      {children}
    </button>
  );
}

function App() {
  const stageRef = useRef(null);
  const fileRef = useRef(null);
  const importRef = useRef(null);
  const [elements, setElements] = useState(() => {
    try {
      const saved = localStorage.getItem("sre-diagram-elements");
      return saved ? JSON.parse(saved) : initialElements;
    } catch {
      return initialElements;
    }
  });
  const [selectedId, setSelectedId] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const drag = useRef(null);

  const selected = useMemo(() => elements.find((e) => e.id === selectedId), [elements, selectedId]);

  useEffect(() => {
    localStorage.setItem("sre-diagram-elements", JSON.stringify(elements));
  }, [elements]);

  const commit = (next) => {
    setHistory((h) => [...h.slice(-30), elements]);
    setFuture([]);
    setElements(next);
  };

  const undo = () => {
    setHistory((h) => {
      if (!h.length) return h;
      const prev = h[h.length - 1];
      setFuture((f) => [elements, ...f]);
      setElements(prev);
      return h.slice(0, -1);
    });
  };

  const redo = () => {
    setFuture((f) => {
      if (!f.length) return f;
      const next = f[0];
      setHistory((h) => [...h, elements]);
      setElements(next);
      return f.slice(1);
    });
  };

  const addElement = (type, extra = {}) => {
    const base = {
      id: uid(),
      type,
      x: 430,
      y: 250,
      w: type === "text" ? 280 : 160,
      h: type === "text" ? 70 : 105,
      text: type === "text" ? "New text" : type === "circle" ? "Node" : "Step",
      fontSize: type === "text" ? 34 : 18,
      fill: type === "text" ? "#f8fafc" : "#1e293b",
      stroke: "#38bdf8",
      ...extra,
    };
    commit([...elements, base]);
    setSelectedId(base.id);
  };

  const addConnector = () => {
    const item = { id: uid(), type: "connector", x1: 300, y1: 350, x2: 620, y2: 350, stroke: "#e2e8f0" };
    commit([...elements, item]);
    setSelectedId(item.id);
  };

  const applyTemplate = (key) => {
    const next = templates[key].map((e) => ({ ...e, id: uid() }));
    commit(next);
    setSelectedId(null);
  };

  const updateSelected = (patch) => {
    if (!selectedId) return;
    commit(elements.map((e) => (e.id === selectedId ? { ...e, ...patch } : e)));
  };

  const duplicateSelected = () => {
    if (!selected) return;
    const copy = {
      ...selected,
      id: uid(),
      x: (selected.x || 0) + 30,
      y: (selected.y || 0) + 30,
      x1: (selected.x1 || 0) + 30,
      y1: (selected.y1 || 0) + 30,
      x2: (selected.x2 || 0) + 30,
      y2: (selected.y2 || 0) + 30,
    };
    commit([...elements, copy]);
    setSelectedId(copy.id);
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    commit(elements.filter((e) => e.id !== selectedId));
    setSelectedId(null);
  };

  const pointer = (evt) => {
    const rect = stageRef.current.getBoundingClientRect();
    return { x: (evt.clientX - rect.left) / zoom, y: (evt.clientY - rect.top) / zoom };
  };

  const onPointerDown = (evt, el) => {
    evt.stopPropagation();
    setSelectedId(el.id);
    const p = pointer(evt);
    drag.current = { id: el.id, start: p, original: { ...el }, before: elements };
  };

  const onStageMove = (evt) => {
    if (!drag.current) return;
    const p = pointer(evt);
    const dx = p.x - drag.current.start.x;
    const dy = p.y - drag.current.start.y;
    const original = drag.current.original;
    setElements((prev) =>
      prev.map((e) => {
        if (e.id !== drag.current.id) return e;
        if (e.type === "connector") return { ...e, x1: original.x1 + dx, y1: original.y1 + dy, x2: original.x2 + dx, y2: original.y2 + dy };
        return { ...e, x: original.x + dx, y: original.y + dy };
      })
    );
  };

  const onStageUp = () => {
    if (drag.current) {
      setHistory((h) => [...h.slice(-30), drag.current.before]);
      setFuture([]);
      drag.current = null;
    }
  };

  const addImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const item = { id: uid(), type: "image", x: 380, y: 210, w: 260, h: 180, src: reader.result, text: "Uploaded image" };
      commit([...elements, item]);
      setSelectedId(item.id);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(elements, null, 2)], { type: "application/json" });
    downloadBlob(blob, "devops-sre-diagram.json");
  };

  const importJSON = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) commit(parsed);
    } catch {
      alert("Invalid JSON file");
    }
    e.target.value = "";
  };

  const svgMarkup = () => {
    const node = stageRef.current.querySelector("svg");
    const cloned = node.cloneNode(true);
    cloned.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    return new XMLSerializer().serializeToString(cloned);
  };

  const exportSVG = () => {
    const blob = new Blob([svgMarkup()], { type: "image/svg+xml" });
    downloadBlob(blob, "devops-sre-diagram.svg");
  };

  const exportPNG = () => {
    const svg = svgMarkup();
    const img = new Image();
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => downloadBlob(blob, "devops-sre-diagram.png"));
    };
    img.src = url;
  };

  const renderIcon = (el) => {
    const Icon = iconMap[el.icon] || Server;
    return (
      <foreignObject x={el.x + el.w / 2 - 26} y={el.y + 16} width="52" height="52" pointerEvents="none">
        <Icon className="svg-icon" style={{ color: el.fill }} />
      </foreignObject>
    );
  };

  const renderElement = (el) => {
    const active = el.id === selectedId;
    const common = { onPointerDown: (evt) => onPointerDown(evt, el), className: "canvas-item" };
    if (el.type === "connector") {
      const angle = Math.atan2(el.y2 - el.y1, el.x2 - el.x1);
      const arrow = { x: el.x2 - Math.cos(angle) * 10, y: el.y2 - Math.sin(angle) * 10 };
      return (
        <g key={el.id} {...common}>
          <line x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} stroke={el.stroke} strokeWidth="4" strokeLinecap="round" />
          <polygon points={`${el.x2},${el.y2} ${arrow.x - Math.sin(angle) * 7},${arrow.y + Math.cos(angle) * 7} ${arrow.x + Math.sin(angle) * 7},${arrow.y - Math.cos(angle) * 7}`} fill={el.stroke} />
          {active && <rect x={Math.min(el.x1, el.x2) - 10} y={Math.min(el.y1, el.y2) - 10} width={Math.abs(el.x2 - el.x1) + 20} height={Math.abs(el.y2 - el.y1) + 20} fill="none" stroke="#22d3ee" strokeDasharray="6 6" />}
        </g>
      );
    }
    if (el.type === "text") {
      return (
        <g key={el.id} {...common}>
          <text x={el.x} y={el.y + el.h / 2} fill={el.fill} fontSize={el.fontSize || 30} fontFamily="Inter, Arial" dominantBaseline="middle">
            {el.text}
          </text>
          {active && <rect x={el.x - 8} y={el.y - 8} width={el.w + 16} height={el.h + 16} fill="none" stroke="#22d3ee" strokeDasharray="6 6" />}
        </g>
      );
    }
    if (el.type === "image") {
      return (
        <g key={el.id} {...common}>
          <image href={el.src} x={el.x} y={el.y} width={el.w} height={el.h} preserveAspectRatio="xMidYMid slice" />
          {active && <rect x={el.x - 6} y={el.y - 6} width={el.w + 12} height={el.h + 12} fill="none" stroke="#22d3ee" strokeDasharray="6 6" />}
        </g>
      );
    }
    const labelY = el.type === "icon" ? el.y + el.h - 18 : el.y + el.h / 2;
    return (
      <g key={el.id} {...common}>
        {el.type === "rect" && <rect x={el.x} y={el.y} width={el.w} height={el.h} rx="18" fill={el.fill} stroke={el.stroke} strokeWidth="3" />}
        {el.type === "circle" && <ellipse cx={el.x + el.w / 2} cy={el.y + el.h / 2} rx={el.w / 2} ry={el.h / 2} fill={el.fill} stroke={el.stroke} strokeWidth="3" />}
        {el.type === "diamond" && <polygon points={`${el.x + el.w / 2},${el.y} ${el.x + el.w},${el.y + el.h / 2} ${el.x + el.w / 2},${el.y + el.h} ${el.x},${el.y + el.h / 2}`} fill={el.fill} stroke={el.stroke} strokeWidth="3" />}
        {el.type === "icon" && (
          <>
            <rect x={el.x} y={el.y} width={el.w} height={el.h} rx="24" fill="#0f172a" stroke={el.stroke} strokeWidth="3" />
            {renderIcon(el)}
          </>
        )}
        <text x={el.x + el.w / 2} y={labelY} textAnchor="middle" dominantBaseline="middle" fill="#f8fafc" fontSize={el.fontSize || 18} fontFamily="Inter, Arial" fontWeight="700">
          {el.text}
        </text>
        {active && <rect x={el.x - 6} y={el.y - 6} width={el.w + 12} height={el.h + 12} fill="none" stroke="#22d3ee" strokeDasharray="6 6" />}
      </g>
    );
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon"><Layers size={20} /></div>
          <div>
            <h1>DevOps & SRE Diagram Studio</h1>
            <p>Free browser-based architecture, flowchart, and runbook canvas.</p>
          </div>
        </div>
        <div className="top-actions">
          <ToolbarButton onClick={undo} title="Undo"><Undo2 size={16} /> Undo</ToolbarButton>
          <ToolbarButton onClick={redo} title="Redo"><Redo2 size={16} /> Redo</ToolbarButton>
          <ToolbarButton onClick={() => setShowGrid(!showGrid)} active={showGrid} title="Grid"><Grid3X3 size={16} /> Grid</ToolbarButton>
          <ToolbarButton onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(1)))} title="Zoom out"><ZoomOut size={16} /></ToolbarButton>
          <span className="zoom-label">{Math.round(zoom * 100)}%</span>
          <ToolbarButton onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.1).toFixed(1)))} title="Zoom in"><ZoomIn size={16} /></ToolbarButton>
        </div>
      </header>

      <main className="layout">
        <aside className="sidebar left">
          <h2>Tools</h2>
          <div className="button-grid">
            <ToolbarButton title="Select"><MousePointer2 size={16} /> Select</ToolbarButton>
            <ToolbarButton onClick={() => addElement("text")} title="Text"><Type size={16} /> Text</ToolbarButton>
            <ToolbarButton onClick={() => addElement("rect")} title="Rectangle"><Square size={16} /> Box</ToolbarButton>
            <ToolbarButton onClick={() => addElement("circle")} title="Circle"><Circle size={16} /> Circle</ToolbarButton>
            <ToolbarButton onClick={() => addElement("diamond")} title="Decision"><Diamond size={16} /> Decision</ToolbarButton>
            <ToolbarButton onClick={addConnector} title="Arrow"><ArrowRight size={16} /> Arrow</ToolbarButton>
          </div>

          <h2>DevOps Icons</h2>
          <div className="button-grid">
            <ToolbarButton onClick={() => addElement("icon", { icon: "server", text: "Server", fill: "#a78bfa", stroke: "#ddd6fe" })}><Server size={16} /> Server</ToolbarButton>
            <ToolbarButton onClick={() => addElement("icon", { icon: "cloud", text: "Cloud", fill: "#38bdf8", stroke: "#bae6fd" })}><Cloud size={16} /> Cloud</ToolbarButton>
            <ToolbarButton onClick={() => addElement("icon", { icon: "database", text: "Database", fill: "#34d399", stroke: "#bbf7d0" })}><Database size={16} /> DB</ToolbarButton>
            <ToolbarButton onClick={() => addElement("icon", { icon: "shield", text: "Security", fill: "#f97316", stroke: "#fed7aa" })}><Shield size={16} /> Sec</ToolbarButton>
            <ToolbarButton onClick={() => addElement("icon", { icon: "network", text: "Network", fill: "#60a5fa", stroke: "#bfdbfe" })}><Network size={16} /> Net</ToolbarButton>
            <ToolbarButton onClick={() => addElement("icon", { icon: "git", text: "Git", fill: "#fb7185", stroke: "#fecdd3" })}><GitBranch size={16} /> Git</ToolbarButton>
          </div>

          <h2>Templates</h2>
          <button onClick={() => applyTemplate("incident")} className="template-button">Incident response flow</button>
          <button onClick={() => applyTemplate("k8s")} className="template-button">Kubernetes architecture</button>
          <button onClick={() => applyTemplate("cicd")} className="template-button">CI/CD pipeline</button>

          <h2>Files</h2>
          <input ref={fileRef} type="file" accept="image/*" onChange={addImage} hidden />
          <input ref={importRef} type="file" accept="application/json" onChange={importJSON} hidden />
          <div className="file-buttons">
            <ToolbarButton onClick={() => fileRef.current?.click()}><ImageIcon size={16} /> Upload image</ToolbarButton>
            <ToolbarButton onClick={exportPNG}><Download size={16} /> Export PNG</ToolbarButton>
            <ToolbarButton onClick={exportSVG}><Download size={16} /> Export SVG</ToolbarButton>
            <ToolbarButton onClick={exportJSON}><FileJson size={16} /> Export JSON</ToolbarButton>
            <ToolbarButton onClick={() => importRef.current?.click()}><Upload size={16} /> Import JSON</ToolbarButton>
          </div>
        </aside>

        <section className="workspace">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stage-frame">
            <div
              ref={stageRef}
              onPointerMove={onStageMove}
              onPointerUp={onStageUp}
              onPointerLeave={onStageUp}
              onPointerDown={() => setSelectedId(null)}
              style={{ width: 1280 * zoom, height: 720 * zoom }}
              className="stage"
            >
              <svg width={1280 * zoom} height={720 * zoom} viewBox="0 0 1280 720">
                <defs>
                  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="1" />
                  </pattern>
                  <radialGradient id="bg" cx="50%" cy="0%" r="90%">
                    <stop offset="0%" stopColor="#172554" />
                    <stop offset="55%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </radialGradient>
                </defs>
                <rect width="1280" height="720" fill="url(#bg)" />
                {showGrid && <rect width="1280" height="720" fill="url(#grid)" />}
                {elements.map(renderElement)}
              </svg>
            </div>
          </motion.div>
        </section>

        <aside className="sidebar right">
          <div className="inspector-title">
            <h2>Inspector</h2>
            <button onClick={() => commit([])} className="clear-button">Clear</button>
          </div>
          {!selected && <p className="empty-state">Select any item on the canvas to edit text, colors, and size. Everything runs locally in the browser.</p>}
          {selected && (
            <div className="inspector">
              <div className="selected-box">
                <span>Selected</span>
                <strong>{selected.type}</strong>
              </div>
              {selected.type !== "connector" && selected.type !== "image" && (
                <label>
                  Label
                  <input value={selected.text || ""} onChange={(e) => updateSelected({ text: e.target.value })} />
                </label>
              )}
              {selected.type !== "connector" && selected.type !== "image" && (
                <label>
                  Font size
                  <input type="number" value={selected.fontSize || 18} onChange={(e) => updateSelected({ fontSize: Number(e.target.value) })} />
                </label>
              )}
              {selected.type !== "connector" && (
                <div className="two-cols">
                  <label>Width<input type="number" value={selected.w || 0} onChange={(e) => updateSelected({ w: Number(e.target.value) })} /></label>
                  <label>Height<input type="number" value={selected.h || 0} onChange={(e) => updateSelected({ h: Number(e.target.value) })} /></label>
                </div>
              )}
              {selected.type === "connector" && (
                <div className="two-cols">
                  {["x1", "y1", "x2", "y2"].map((key) => (
                    <label key={key}>{key}<input type="number" value={selected[key] || 0} onChange={(e) => updateSelected({ [key]: Number(e.target.value) })} /></label>
                  ))}
                </div>
              )}
              <div className="two-cols">
                {selected.type !== "connector" && selected.type !== "image" && (
                  <label>Fill<input type="color" value={selected.fill === "transparent" ? "#ffffff" : selected.fill || "#1e293b"} onChange={(e) => updateSelected({ fill: e.target.value })} /></label>
                )}
                <label>Stroke<input type="color" value={selected.stroke === "transparent" ? "#ffffff" : selected.stroke || "#38bdf8"} onChange={(e) => updateSelected({ stroke: e.target.value })} /></label>
              </div>
              <div className="button-grid">
                <ToolbarButton onClick={duplicateSelected}><Copy size={16} /> Duplicate</ToolbarButton>
                <ToolbarButton onClick={deleteSelected}><Trash2 size={16} /> Delete</ToolbarButton>
              </div>
            </div>
          )}
          <div className="hosting-note">
            <strong>Static hosting ready</strong>
            <p>This app does not need a backend. It can run on GitHub Pages and connect to a custom subdomain with a CNAME record.</p>
          </div>
        </aside>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

"use client";

import React, { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  target_x: number;
  target_y: number;
  cluster_index: number;
  pulse_phase: number;
};

type Cluster = {
  x: number;
  y: number;
  radius: number;
  color: string;
  pulse: number;
  pulse_speed: number;
};

export function Background_Sessions() {
  const canvas_ref = useRef<HTMLCanvasElement>(null);
  const animation_frame_ref = useRef<number>(0);
  const frame_count_ref = useRef<number>(0);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes: Node[] = [];
    const clusters: Cluster[] = [];
    const cluster_colors = ["#FF0080", "#00F2EA", "#FE2C55", "#25F4EE", "#FFD700", "#9D4EDD"];

    const resize_canvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initialize_clusters();
    };

    const initialize_clusters = () => {
      clusters.length = 0;
      const cluster_count = 25;
      const padding = 50;

      for (let i = 0; i < cluster_count; i++) {
        clusters.push({
          x: padding + Math.random() * (canvas.width - padding * 2),
          y: padding + Math.random() * (canvas.height - padding * 2),
          radius: 80 + Math.random() * 40,
          color: cluster_colors[i % cluster_colors.length],
          pulse: 0,
          pulse_speed: 0.01 + Math.random() * 0.01,
        });
      }
    };

    const create_node = (cluster_index: number): Node => {
      const cluster = clusters[cluster_index];
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * cluster.radius;

      return {
        x: cluster.x + Math.cos(angle) * distance,
        y: cluster.y + Math.sin(angle) * distance,
        vx: 0,
        vy: 0,
        size: 3 + Math.random() * 3,
        target_x: cluster.x,
        target_y: cluster.y,
        cluster_index,
        pulse_phase: Math.random() * Math.PI * 2,
      };
    };

    resize_canvas();

    for (let i = 0; i < 80; i++) {
      const cluster_index = Math.floor(Math.random() * clusters.length);
      nodes.push(create_node(cluster_index));
    }

    const draw_cluster = (cluster: Cluster) => {
      const pulse_factor = Math.sin(cluster.pulse) * 0.3 + 0.7;
      const current_radius = cluster.radius * pulse_factor;

      const gradient = ctx.createRadialGradient(cluster.x, cluster.y, 0, cluster.x, cluster.y, current_radius);
      gradient.addColorStop(0, `${cluster.color}15`);
      gradient.addColorStop(0.5, `${cluster.color}08`);
      gradient.addColorStop(1, `${cluster.color}00`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cluster.x, cluster.y, current_radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = `${cluster.color}40`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cluster.x, cluster.y, current_radius * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    };

    const draw_connections = () => {
      const connection_distance = 120;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const node_a = nodes[i];
          const node_b = nodes[j];
          const dx = node_b.x - node_a.x;
          const dy = node_b.y - node_a.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connection_distance) {
            const opacity = (1 - distance / connection_distance) * 0.3;
            const cluster_a = clusters[node_a.cluster_index];

            ctx.strokeStyle =
              node_a.cluster_index === node_b.cluster_index
                ? `${cluster_a.color}${Math.floor(opacity * 255)
                    .toString(16)
                    .padStart(2, "0")}`
                : `rgba(255,255,255,${opacity * 0.5})`;

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node_a.x, node_a.y);
            ctx.lineTo(node_b.x, node_b.y);
            ctx.stroke();
          }
        }
      }
    };

    const draw_node = (node: Node) => {
      const cluster = clusters[node.cluster_index];
      const pulse_factor = Math.sin(frame_count_ref.current * 0.05 + node.pulse_phase) * 0.4 + 0.6;
      const current_size = node.size * pulse_factor;

      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, current_size * 2);
      gradient.addColorStop(0, `${cluster.color}ff`);
      gradient.addColorStop(0.5, `${cluster.color}aa`);
      gradient.addColorStop(1, `${cluster.color}00`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, current_size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = cluster.color;
      ctx.beginPath();
      ctx.arc(node.x, node.y, current_size, 0, Math.PI * 2);
      ctx.fill();
    };

    const update_clusters = () => clusters.forEach((c) => (c.pulse += c.pulse_speed));

    const update_nodes = () => {
      nodes.forEach((node) => {
        if (Math.random() < 0.005) node.cluster_index = Math.floor(Math.random() * clusters.length);

        const target_cluster = clusters[node.cluster_index];
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * target_cluster.radius * 0.8;
        node.target_x = target_cluster.x + Math.cos(angle) * distance;
        node.target_y = target_cluster.y + Math.sin(angle) * distance;

        const dx = node.target_x - node.x;
        const dy = node.target_y - node.y;

        node.vx += dx * 0.001;
        node.vy += dy * 0.001;
        node.vx *= 0.95;
        node.vy *= 0.95;
        node.x += node.vx;
        node.y += node.vy;

        nodes.forEach((other) => {
          if (other === node) return;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0 && distance < 20) {
            const force = (20 - distance) / 20;
            node.vx -= (dx / distance) * force * 0.1;
            node.vy -= (dy / distance) * force * 0.1;
          }
        });
      });
    };

    const animate = () => {
      frame_count_ref.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      update_clusters();
      update_nodes();
      clusters.forEach(draw_cluster);
      draw_connections();
      nodes.forEach(draw_node);

      animation_frame_ref.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize_canvas);

    return () => {
      window.removeEventListener("resize", resize_canvas);
      if (animation_frame_ref.current) cancelAnimationFrame(animation_frame_ref.current);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas
        ref={canvas_ref}
        className="absolute inset-0 h-full w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black"
      />
    </div>
  );
}

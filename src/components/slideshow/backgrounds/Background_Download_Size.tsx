"use client";

import React, { useEffect, useRef } from "react";

type Data_Column = {
  x: number;
  characters: string[];
  y_positions: number[];
  speed: number;
  opacity_values: number[];
  glow_intensity: number;
};

export function Background_Download_Size() {
  const canvas_ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvas_ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize_canvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initialize_columns();
    };

    const data_columns: Data_Column[] = [];
    let animation_frame: number;

    const binary_chars = ["0", "1"];
    const hex_chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

    const get_random_character = () => {
      const rand = Math.random();
      if (rand < 0.6) {
        return binary_chars[Math.floor(Math.random() * binary_chars.length)];
      } else {
        return hex_chars[Math.floor(Math.random() * hex_chars.length)];
      }
    };

    const initialize_columns = () => {
      data_columns.length = 0;
      const column_width = 20;
      const column_count = Math.ceil(canvas.width / column_width);

      for (let i = 0; i < column_count; i++) {
        const char_count = 30 + Math.floor(Math.random() * 20);
        const characters: string[] = [];
        const y_positions: number[] = [];
        const opacity_values: number[] = [];

        for (let j = 0; j < char_count; j++) {
          characters.push(get_random_character());
          y_positions.push(j * 20 - Math.random() * canvas.height);
          opacity_values.push(0);
        }

        data_columns.push({
          x: i * column_width,
          characters,
          y_positions,
          speed: 1 + Math.random() * 2,
          opacity_values,
          glow_intensity: 0.3 + Math.random() * 0.5,
        });
      }
    };

    resize_canvas();

    const draw_column = (column: Data_Column) => {
      ctx.font = "14px 'Courier New', monospace";
      ctx.textAlign = "center";

      for (let i = 0; i < column.characters.length; i++) {
        const y = column.y_positions[i];

        if (y > 0 && y < canvas.height) {
          const distance_from_lead = i === 0 ? 0 : i;
          const opacity = Math.max(0, 1 - distance_from_lead * 0.05);
          column.opacity_values[i] = opacity;

          const is_lead = i === 0;
          const is_size_unit = column.characters[i].length > 1;

          if (is_lead) {
            ctx.shadowColor = is_size_unit ? "#00FFFF" : "#00FF00";
            ctx.shadowBlur = 15 * column.glow_intensity;
            ctx.fillStyle = is_size_unit ? `rgba(0, 255, 255, ${opacity})` : `rgba(0, 255, 0, ${opacity})`;
          } else {
            ctx.shadowBlur = 5 * column.glow_intensity;
            ctx.shadowColor = is_size_unit ? "#00AAAA" : "#00AA00";
            ctx.fillStyle = is_size_unit ? `rgba(0, 200, 200, ${opacity * 0.8})` : `rgba(0, 200, 0, ${opacity * 0.8})`;
          }

          ctx.fillText(column.characters[i], column.x, y);
        }
      }

      ctx.shadowBlur = 0;
    };

    const update_column = (column: Data_Column) => {
      for (let i = 0; i < column.y_positions.length; i++) {
        column.y_positions[i] += column.speed;

        if (column.y_positions[i] > canvas.height + 100) {
          column.y_positions[i] = -20;
          column.characters[i] = get_random_character();

          if (i > 0) {
            column.y_positions[i] = column.y_positions[i - 1] - 20;
          }
        }
      }

      if (Math.random() < 0.05) {
        const random_index = Math.floor(Math.random() * column.characters.length);
        column.characters[random_index] = get_random_character();
      }
    };

    const draw_data_bars = () => {
      const bar_count = 8;
      const bar_width = canvas.width / bar_count;

      for (let i = 0; i < bar_count; i++) {
        const x = i * bar_width;
        const height = (Math.sin(Date.now() * 0.001 + i) * 0.5 + 0.5) * 60 + 20;

        const gradient = ctx.createLinearGradient(x, canvas.height, x, canvas.height - height);
        gradient.addColorStop(0, "rgba(0, 255, 100, 0.15)");
        gradient.addColorStop(1, "rgba(0, 255, 100, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - height, bar_width - 2, height);

        ctx.strokeStyle = "rgba(0, 255, 100, 0.3)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, canvas.height - height, bar_width - 2, height);
      }
    };

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      draw_data_bars();

      data_columns.forEach((column) => {
        update_column(column);
        draw_column(column);
      });

      animation_frame = requestAnimationFrame(animate);
    };

    animation_frame = requestAnimationFrame(animate);
    window.addEventListener("resize", resize_canvas);

    return () => {
      cancelAnimationFrame(animation_frame);
      window.removeEventListener("resize", resize_canvas);
    };
  }, []);

  return (
    <canvas
      ref={canvas_ref}
      className="fixed inset-0 -z-10 bg-black"
    />
  );
}

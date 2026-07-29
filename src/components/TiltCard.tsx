"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  glare?: boolean;
};

export default function TiltCard({
  children,
  className = "",
  glare = true,
}: TiltCardProps) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(y, [0, 1], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-12, 12]),
    springConfig
  );
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(207,243,59,0.16), transparent 60%)`
  );

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`perspective-1000 relative overflow-hidden will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}

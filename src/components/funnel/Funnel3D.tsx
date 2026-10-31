"use client";

import { useEffect, useRef, useState } from "react";
import FlatFunnel from "./FlatFunnel";
import type { FunnelScene } from "./scene";

/**
 * Loads three.js in the browser, after the page has painted, and only here.
 *
 * Nothing about the hero waits for it: the headline, the stage card and the
 * buttons are server-rendered text beside this box, and the flat funnel sits
 * in the box until the scene is ready. three.js is a dynamic import, so it
 * is its own chunk and never touches first load for any other page.
 *
 * Gives up to the flat funnel if there is no WebGL, if the import fails, or
 * if the scene has not come up within eight seconds.
 */
export default function Funnel3D({
  stage,
  names,
  onPick,
}: {
  stage: number;
  names: string[];
  onPick: (i: number) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const labels = useRef<HTMLDivElement>(null);
  const scene = useRef<FunnelScene | null>(null);
  const pickRef = useRef(onPick);
  const stageRef = useRef(stage);
  const [mode, setMode] = useState<"loading" | "3d" | "flat">("loading");

  useEffect(() => {
    pickRef.current = onPick;
  }, [onPick]);

  useEffect(() => {
    stageRef.current = stage;
    scene.current?.setStage(stage);
  }, [stage]);

  useEffect(() => {
    let disposed = false;
    let gaveUp = false;

    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) {
      setMode("flat");
      return;
    }

    const failsafe = window.setTimeout(() => {
      if (!scene.current) {
        gaveUp = true;
        setMode("flat");
      }
    }, 8000);

    Promise.all([import("three"), import("./scene")])
      .then(([THREE, { createFunnelScene }]) => {
        if (disposed || gaveUp || !host.current || !labels.current) return;
        try {
          scene.current = createFunnelScene(THREE, host.current, labels.current, {
            stage: stageRef.current,
            names,
            reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
            onPick: (i) => pickRef.current(i),
            onReady: () => setMode("3d"),
          });
        } catch {
          setMode("flat");
        }
      })
      .catch(() => setMode("flat"));

    return () => {
      disposed = true;
      window.clearTimeout(failsafe);
      scene.current?.dispose();
      scene.current = null;
    };
    // names is static content; the scene is built once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`funnel3d funnel3d-${mode}`}>
      <div className="funnel3d-flat">
        <FlatFunnel stage={stage} names={names} />
      </div>
      <div ref={host} className="funnel3d-canvas" />
      <div ref={labels} className="funnel3d-labels" aria-hidden="true" />
    </div>
  );
}

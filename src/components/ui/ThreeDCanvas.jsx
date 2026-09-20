import { useEffect, useRef } from 'react';

/**
 * High-performance, lightweight 3D wireframe and shaded polyhedral models rendered in HTML5 Canvas.
 * Archetypes supported:
 *  - 'tesseract': Intersecting hypercube wireframe representing AI & Cloud computing
 *  - 'icosahedron': Tech matrix geodesic polyhedron representing skills and connectivity
 *  - 'torus': Interlocking dual rings representing Collaboration and Unity
 *  - 'octahedron': Crystalline prism representing Innovation and Leadership
 *  - 'dodecahedron': Geometric star representing Community and Impact
 */
export default function ThreeDCanvas({
  archetype = 'icosahedron',
  color = '#ea580c',
  secondaryColor = '#ff5500',
  wireframeOnly = false,
  opacity = 0.6,
  size = 320,
  speed = 1,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = size);
    let height = (canvas.height = size);

    // Mouse tracking for subtle tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.8;
      targetRotX = -y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Geometry Generation
    let vertices = [];
    let edges = [];
    let faces = [];

    if (archetype === 'icosahedron') {
      const t = (1 + Math.sqrt(5)) / 2;
      const scale = 70;
      const rawVerts = [
        [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
        [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
        [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
      ];
      vertices = rawVerts.map(([x, y, z]) => {
        const len = Math.hypot(x, y, z);
        return [(x / len) * scale, (y / len) * scale, (z / len) * scale];
      });

      edges = [
        [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
        [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
        [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
        [9, 4], [4, 2], [2, 6], [6, 8], [8, 9],
        [4, 5], [5, 9], [8, 1], [1, 9], [7, 8],
        [6, 7], [10, 6], [2, 10], [11, 2], [4, 11],
      ];
    } else if (archetype === 'tesseract') {
      const s = 45;
      const sInner = 24;
      // Outer cube
      const outer = [
        [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
        [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
      ];
      // Inner cube
      const inner = [
        [-sInner, -sInner, -sInner], [sInner, -sInner, -sInner], [sInner, sInner, -sInner], [-sInner, sInner, -sInner],
        [-sInner, -sInner, sInner], [sInner, -sInner, sInner], [sInner, sInner, sInner], [-sInner, sInner, sInner],
      ];
      vertices = [...outer, ...inner];
      edges = [
        // outer cube
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
        // inner cube
        [8, 9], [9, 10], [10, 11], [11, 8],
        [12, 13], [13, 14], [14, 15], [15, 12],
        [8, 12], [9, 13], [10, 14], [11, 15],
        // cross connects
        [0, 8], [1, 9], [2, 10], [3, 11],
        [4, 12], [5, 13], [6, 14], [7, 15],
      ];
    } else if (archetype === 'torus') {
      // Interlocking dual rings
      const segs = 20;
      const rMajor = 60;
      vertices = [];
      edges = [];
      // Ring 1 (XY plane)
      for (let i = 0; i < segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        vertices.push([Math.cos(theta) * rMajor, Math.sin(theta) * rMajor, 0]);
        edges.push([i, (i + 1) % segs]);
      }
      // Ring 2 (YZ plane)
      for (let i = 0; i < segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        vertices.push([0, Math.cos(theta) * rMajor, Math.sin(theta) * rMajor]);
        edges.push([segs + i, segs + ((i + 1) % segs)]);
      }
      // Cross linkage points
      for (let i = 0; i < segs; i += 4) {
        edges.push([i, segs + i]);
      }
    } else if (archetype === 'octahedron') {
      const s = 75;
      vertices = [
        [0, -s, 0], [s, 0, 0], [0, 0, s], [-s, 0, 0], [0, 0, -s], [0, s, 0],
      ];
      edges = [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [5, 1], [5, 2], [5, 3], [5, 4],
        [1, 2], [2, 3], [3, 4], [4, 1],
      ];
    } else {
      // Dodecahedron default
      const s = 65;
      vertices = [
        [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
        [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
        [0, -s * 1.3, 0], [0, s * 1.3, 0], [s * 1.3, 0, 0], [-s * 1.3, 0, 0],
      ];
      edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],
        [8, 0], [8, 1], [8, 4], [8, 5],
        [9, 2], [9, 3], [9, 6], [9, 7],
        [10, 1], [10, 2], [10, 5], [10, 6],
        [11, 0], [11, 3], [11, 4], [11, 7],
      ];
    }

    // Rotation state
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth rotate
      angleX += 0.007 * speed;
      angleY += 0.011 * speed;
      angleZ += 0.004 * speed;

      const curRotX = angleX + targetRotX * 0.5;
      const curRotY = angleY + targetRotY * 0.5;

      const cosX = Math.cos(curRotX);
      const sinX = Math.sin(curRotX);
      const cosY = Math.cos(curRotY);
      const sinY = Math.sin(curRotY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // Project vertices
      const projected = vertices.map(([x, y, z]) => {
        // Rotate Y
        let x1 = x * cosY + z * sinY;
        let y1 = y;
        let z1 = -x * sinY + z * cosY;

        // Rotate X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Rotate Z
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        // Perspective
        const fov = 340;
        const scale = fov / (fov + z3 + 80);
        return {
          x: width / 2 + x3 * scale,
          y: height / 2 + y3 * scale,
          z: z3,
          scale,
        };
      });

      // Draw subtle glowing center
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        5,
        width / 2,
        height / 2,
        width * 0.45
      );
      grad.addColorStop(0, `${color}25`);
      grad.addColorStop(0.5, `${secondaryColor}10`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, width * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Draw Edges
      ctx.lineWidth = 1.3;
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        if (!p1 || !p2) return;

        // Edge depth calculation for alpha
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, Math.min(0.9, (avgZ + 100) / 200)) * opacity;

        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Vertex nodes
      projected.forEach((p) => {
        const nodeAlpha = Math.max(0.25, Math.min(1, (p.z + 100) / 200)) * opacity;
        const nodeRadius = Math.max(1.8, 3.2 * p.scale);

        ctx.globalAlpha = nodeAlpha;
        ctx.fillStyle = secondaryColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Glow ring around nodes
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [archetype, color, secondaryColor, size, speed, opacity]);

  return (
    <div
      className={`threed-canvas-wrap ${className}`}
      style={{
        width: size,
        height: size,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}

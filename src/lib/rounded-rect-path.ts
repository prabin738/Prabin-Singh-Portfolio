export type PointOnPath = {
  x: number;
  y: number;
  /** Tangent heading in degrees. 0 = heading right, 90 = heading down, measured clockwise. */
  angle: number;
};

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

function normalizeDegrees(degrees: number): number {
  return ((degrees % 360) + 360) % 360;
}

function roundedRectSegments(width: number, height: number, radius: number) {
  const r = Math.max(0, Math.min(radius, Math.min(width, height) / 2));
  const straightTopHalf = width / 2 - r;
  const straightSide = height - 2 * r;
  const straightBottom = width - 2 * r;
  const arcLength = (Math.PI * r) / 2;
  const total = 2 * straightTopHalf + 2 * straightSide + straightBottom + 4 * arcLength;

  return { r, straightTopHalf, straightSide, straightBottom, arcLength, total };
}

/**
 * Total length of a rounded-rectangle outline. Uses the same width, height
 * and radius clamping as `pointOnRoundedRect`, so a caller that spaces
 * markers evenly along the perimeter stays in sync with the path.
 */
export function roundedRectPerimeter(width: number, height: number, radius: number): number {
  return roundedRectSegments(width, height, radius).total;
}

/**
 * Returns the position and tangent heading of a point travelling clockwise
 * along a rounded-rectangle outline, starting at the top centre.
 *
 * `progress` is the fraction of one full lap (0 to 1, wraps for values
 * outside that range). `radius` is clamped to half the shorter side so the
 * rectangle never self-intersects.
 */
export function pointOnRoundedRect(
  progress: number,
  width: number,
  height: number,
  radius: number,
): PointOnPath {
  const { r, straightTopHalf, straightSide, straightBottom, arcLength, total } = roundedRectSegments(
    width,
    height,
    radius,
  );

  if (total === 0) {
    return { x: width / 2, y: 0, angle: 0 };
  }

  const t = ((progress % 1) + 1) % 1;
  let d = t * total;

  // 1. Top edge, start to top-right corner.
  if (d <= straightTopHalf) {
    return { x: width / 2 + d, y: 0, angle: 0 };
  }
  d -= straightTopHalf;

  // 2. Top-right corner arc: centre (width - r, r), phi from -90deg to 0deg.
  if (d <= arcLength) {
    const phi = -Math.PI / 2 + (d / arcLength) * (Math.PI / 2);
    const cx = width - r;
    const cy = r;
    return {
      x: cx + r * Math.cos(phi),
      y: cy + r * Math.sin(phi),
      angle: normalizeDegrees(toDegrees(phi) + 90),
    };
  }
  d -= arcLength;

  // 3. Right edge, top-right corner to bottom-right corner.
  if (d <= straightSide) {
    return { x: width, y: r + d, angle: 90 };
  }
  d -= straightSide;

  // 4. Bottom-right corner arc: centre (width - r, height - r), phi from 0deg to 90deg.
  if (d <= arcLength) {
    const phi = (d / arcLength) * (Math.PI / 2);
    const cx = width - r;
    const cy = height - r;
    return {
      x: cx + r * Math.cos(phi),
      y: cy + r * Math.sin(phi),
      angle: normalizeDegrees(toDegrees(phi) + 90),
    };
  }
  d -= arcLength;

  // 5. Bottom edge, right to left.
  if (d <= straightBottom) {
    return { x: width - r - d, y: height, angle: 180 };
  }
  d -= straightBottom;

  // 6. Bottom-left corner arc: centre (r, height - r), phi from 90deg to 180deg.
  if (d <= arcLength) {
    const phi = Math.PI / 2 + (d / arcLength) * (Math.PI / 2);
    const cx = r;
    const cy = height - r;
    return {
      x: cx + r * Math.cos(phi),
      y: cy + r * Math.sin(phi),
      angle: normalizeDegrees(toDegrees(phi) + 90),
    };
  }
  d -= arcLength;

  // 7. Left edge, bottom-left corner to top-left corner.
  if (d <= straightSide) {
    return { x: 0, y: height - r - d, angle: 270 };
  }
  d -= straightSide;

  // 8. Top-left corner arc: centre (r, r), phi from 180deg to 270deg.
  if (d <= arcLength) {
    const phi = Math.PI + (d / arcLength) * (Math.PI / 2);
    const cx = r;
    const cy = r;
    return {
      x: cx + r * Math.cos(phi),
      y: cy + r * Math.sin(phi),
      angle: normalizeDegrees(toDegrees(phi) + 90),
    };
  }
  d -= arcLength;

  // 9. Top edge, top-left corner back to start.
  const clamped = Math.min(d, straightTopHalf);
  return { x: r + clamped, y: 0, angle: 0 };
}

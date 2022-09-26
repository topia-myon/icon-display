import { Vector3 } from "./state.js";

export const dot = (a: Vector3, b: Vector3) =>
  a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

export const normalize = (a: Vector3) => {
  const d = Math.hypot(...a);
  return [a[0] / d, a[1] / d, a[2] / d] as Vector3;
};

export const fromAxisAngle = (axis: Vector3, angle: number) => {
  const v = [-axis[1], axis[0], 0];
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const rot = [
    cos * v[0] + sin * (axis[1] * v[2] - axis[2] * v[1]),
    cos * v[1] + sin * (axis[2] * v[0] - axis[0] * v[2]),
    cos * v[2] + sin * (axis[0] * v[1] - axis[1] * v[0]),
  ] as Vector3;
  return normalize(rot);
};``

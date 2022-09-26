export type Vector3 = [number, number, number];
export type Item = {
  url: string;
  speed: number;
  maxSpeed: number;

  axis: Vector3;
  angle: number;
  mouseHovered: boolean;
};

const getRandomUnitVector = (): Vector3 => {
  const theta = Math.random() * 2 * Math.PI;
  const z = Math.random() * 2 - 1;
  const r = Math.sqrt(1 - z * z);
  return [r * Math.cos(theta), r * Math.sin(theta), z];
};

const iconUrls = [
  "./assets/icons/rui-3-hearts.png",
  "./assets/icons/rui-default.png",
  "./assets/icons/rui-innocent.png",
  "./assets/icons/rui-kissing.png",
  "./assets/icons/rui-melting.png",
  "./assets/icons/rui-mogumogu.png",
  "./assets/icons/rui-pien.png",
  "./assets/icons/rui-smiling-tear.png",
  "./assets/icons/rui-zany.png",
];
export const items: Item[] = iconUrls.map((url) => {
  const axis = getRandomUnitVector();
  const speed = Math.random() + 1;
  return {
    url,
    speed,
    maxSpeed: speed,

    axis,
    angle: Math.random() * 2 * Math.PI,
    mouseHovered: false,
  };
});

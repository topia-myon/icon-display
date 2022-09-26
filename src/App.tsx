import { useEffect, useRef } from "react";
import { tw } from "twind/css";
import { Item, items } from "./state.js";
import "./App.css";
import { fromAxisAngle } from "./utils.js";

function App() {
  const itemToStyle = (item: Item) => {
    const position = fromAxisAngle(item.axis, item.angle);
    position[2] += 2.5;
    const size = -6 + position[2] * 10;
    const ratio = Math.sqrt(
      Math.max(window.innerWidth, window.innerHeight) /
        Math.min(window.innerWidth, window.innerHeight),
    );
    return {
      transform: `translate(-50%, -50%)`,
      left: `${(50 + 100 * position[0] / position[2] * ratio)}%`,
      top: `${(50 - 100 * position[1] / position[2] * ratio)}%`,
      width: `${size}%`,
      height: `${size}%`,
      zIndex: `${Math.floor(position[2] * 100)}`,
    };
  };

  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;

      for (const item of items) {
        item.angle += item.speed * deltaTime / 1000;
        if (item.mouseHovered) {
          item.speed *= 0.92;
        } else {
          const weight = Math.max(0.01, item.speed / item.maxSpeed / 5);
          item.speed = item.speed * (1 - weight) +
            item.maxSpeed * weight;
        }
        const el = document.getElementById(item.url);
        if (el) {
          for (const [key, value] of Object.entries(itemToStyle(item))) {
            el.style[key as keyof ReturnType<typeof itemToStyle>] = value;
          }
        }
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return (
    <div
      className={tw`w-full h-full bg-gray-100 flex justify-center items-center overflow-hidden`}
    >
      <div
        className={tw`portrait:w-full landscape:h-full relative`}
        style={{ aspectRatio: "1 / 1" }}
      >
        {items.map((item) => (
          <img
            id={item.url}
            src={item.url}
            className={tw`absolute cursor-pointer`}
            style={itemToStyle(item)}
            onMouseEnter={() => {
              item.mouseHovered = true;
            }}
            onMouseOut={() => {
              item.mouseHovered = false;
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

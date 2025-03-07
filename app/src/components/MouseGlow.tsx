import { useEffect, useState } from "react";

function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event: any) {
      setPosition({ x: event.client.x, y: event.client.y });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="absolute w-32 h-32 bg-blue-500 opacity-50 blur-3xl rounded-full pointer-events-none transition-all duration-75"
      style={{
        left: position.x - 64,
        top: position.y - 64,
      }}
    ></div>
  );
}

export default MouseGlow;

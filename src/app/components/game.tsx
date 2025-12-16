import { VT323 } from "next/font/google";
const VT3 = VT323({
  weight: "400",
  subsets: ["latin"],
});
import { GameCanvas } from "./GameCanvas";
export function Game() {
  return (
    <div
      className="relative min-h-screen w-full bg-repeat bg-center"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white/80">
        <GameCanvas />
      </div>
    </div>
  );
}

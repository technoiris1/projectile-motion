import { VT323 } from "next/font/google";
import { GameCanvas } from "./GameCanvas";

const VT3 = VT323({
  weight: "400",
  subsets: ["latin"],
});

export function Game() {
  return (
    <div className="relative h-screen w-full">
      <GameCanvas />
    </div>
  );
}

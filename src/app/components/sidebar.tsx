"use client";
import { VT323 } from "next/font/google";
import { useState } from "react";
import { Hammer, Blocks, Settings } from "lucide-react";

const VT3 = VT323({
  weight: "400",
  subsets: ["latin"],
});

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ControlMenu() {
  const [mode, setMode] = useState<"destroyer" | "creator">("destroyer");
  const [physicsMode, setPhysicsMode] = useState(false);
  const [gravity, setGravity] = useState(9.8);
  const [mass, setMass] = useState(1);

  return (
    <Sidebar className="text-white">
      <SidebarContent
        className="bg-repeat bg-center px-4 py-5"
        style={{ backgroundImage: "url('/dirt.png')" }}
      >
        <div className="rounded-2xl bg-black/45 backdrop-blur-xl shadow-xl ring-1 ring-white/10">
          <div className="space-y-8 p-6">
            <SidebarGroup>
              <SidebarGroupLabel
                className={`text-sm tracking-widest text-white/80 ${VT3.className}`}
              >
                MODE
              </SidebarGroupLabel>

              <SidebarGroupContent className="space-y-3">
                <button
                  onClick={() => setMode("destroyer")}
                  className={`w-full rounded-lg px-4 py-3 text-left transition ${
                    mode === "destroyer"
                      ? "bg-white/20"
                      : "bg-black/30 hover:bg-white/10"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-base ${VT3.className}`}
                  >
                    <Hammer size={18} />
                    Destroyer Mode
                  </div>
                </button>

                <button
                  onClick={() => setMode("creator")}
                  className={`w-full rounded-lg px-4 py-3 text-left transition ${
                    mode === "creator"
                      ? "bg-white/20"
                      : "bg-black/30 hover:bg-white/10"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-base ${VT3.className}`}
                  >
                    <Blocks size={18} />
                    Creator Mode
                  </div>
                </button>
              </SidebarGroupContent>
            </SidebarGroup>

            {mode === "creator" && (
              <SidebarGroup>
                <SidebarGroupLabel
                  className={`text-sm tracking-widest text-white/80 ${VT3.className}`}
                >
                  CREATOR TOOLS
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="rounded-lg bg-black/30 p-4">
                    <label
                      className={`mb-2 block text-sm text-white/80 ${VT3.className}`}
                    >
                      Block Material
                    </label>
                    <Select defaultValue="wood">
                      <SelectTrigger
                        className={`bg-black/40 text-white text-base ${VT3.className}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        className={`bg-black/90 text-white ${VT3.className}`}
                      >
                        <SelectItem value="wood" className="text-base">
                          Wood
                        </SelectItem>
                        <SelectItem value="stone" className="text-base">
                          Stone
                        </SelectItem>
                        <SelectItem value="metal" className="text-base">
                          Metal
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            <SidebarGroup>
              <SidebarGroupLabel
                className={`text-sm tracking-widest text-white/80 ${VT3.className}`}
              >
                PHYSICS
              </SidebarGroupLabel>

              <SidebarGroupContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-black/30 px-4 py-3">
                  <span
                    className={`flex items-center gap-2 text-base ${VT3.className}`}
                  >
                    <Settings size={18} />
                    Physics Mode
                  </span>
                  <Switch
                    checked={physicsMode}
                    onCheckedChange={setPhysicsMode}
                  />
                </div>

                {physicsMode && (
                  <div className="space-y-5 rounded-lg bg-black/30 p-4">
                    <div className="space-y-2">
                      <div
                        className={`flex justify-between text-sm text-white/70 ${VT3.className}`}
                      >
                        <span>Gravity</span>
                        <span>m/s²</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Slider
                          min={1}
                          max={20}
                          step={0.1}
                          value={[gravity]}
                          onValueChange={([v]) => setGravity(v)}
                        />
                        <Input
                          type="number"
                          step="0.1"
                          className="w-36 bg-black/40 text-white text-base"
                          value={gravity}
                          onChange={(e) => setGravity(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div
                        className={`flex justify-between text-sm text-white/70 ${VT3.className}`}
                      >
                        <span>Mass</span>
                        <span>kg</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Slider
                          min={0.1}
                          max={10}
                          step={0.1}
                          value={[mass]}
                          onValueChange={([v]) => setMass(v)}
                        />
                        <Input
                          type="number"
                          step="0.1"
                          className="w-36 bg-black/40 text-white text-base"
                          value={mass}
                          onChange={(e) => setMass(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

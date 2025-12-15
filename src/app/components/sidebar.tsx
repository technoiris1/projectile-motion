"use client";
import { VT323 } from "next/font/google";
import { useState } from "react";
import { Hammer, Blocks, Settings } from "lucide-react";

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
              <SidebarGroupLabel className="text-xs tracking-widest text-white/80">
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
                  <div className="flex items-center gap-2 text-sm">
                    <Hammer size={16} />
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
                  <div className="flex items-center gap-2 text-sm">
                    <Blocks size={16} />
                    Creator Mode
                  </div>
                </button>
              </SidebarGroupContent>
            </SidebarGroup>

            {mode === "creator" && (
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs tracking-widest text-white/80">
                  CREATOR TOOLS
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="rounded-lg bg-black/30 p-4">
                    <label className="mb-2 block text-xs text-white/80">
                      Block Material
                    </label>
                    <Select defaultValue="wood">
                      <SelectTrigger className="bg-black/40 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 text-white">
                        <SelectItem value="wood">Wood</SelectItem>
                        <SelectItem value="stone">Stone</SelectItem>
                        <SelectItem value="metal">Metal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs tracking-widest text-white/80">
                PHYSICS
              </SidebarGroupLabel>

              <SidebarGroupContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-black/30 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm">
                    <Settings size={16} />
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
                      <div className="flex justify-between text-xs text-white/70">
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
                          className="w-36 bg-black/40 text-white"
                          value={gravity}
                          onChange={(e) => setGravity(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/70">
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
                          className="w-36 bg-black/40 text-white"
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

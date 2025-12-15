"use client";

import { useState } from "react";
import { Hammer, Blocks, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mode</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <Hammer size={16} />
                  Destroyer
                </span>

                <Switch
                  checked={mode === "creator"}
                  onCheckedChange={(v) => setMode(v ? "creator" : "destroyer")}
                />

                <span className="flex items-center gap-2">
                  <Blocks size={16} />
                  Creator
                </span>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {mode === "creator" && (
          <SidebarGroup>
            <SidebarGroupLabel>Creator Tools</SidebarGroupLabel>
            <SidebarGroupContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  Block Material
                </label>
                <Select defaultValue="wood">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
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
          <SidebarGroupLabel>Physics</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Settings size={16} />
                Physics Mode
              </span>
              <Switch checked={physicsMode} onCheckedChange={setPhysicsMode} />
            </div>

            {physicsMode && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    Gravity (m/s²)
                  </label>

                  <div className="flex items-center gap-2">
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
                      className="w-20"
                      value={gravity}
                      onChange={(e) => setGravity(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    Mass (kg)
                  </label>

                  <div className="flex items-center gap-2">
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
                      className="w-20"
                      value={mass}
                      onChange={(e) => setMass(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

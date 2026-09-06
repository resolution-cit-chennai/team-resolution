// Placeholder icon set — swap for real software/brand marks later.
// Each icon comes from lucide-react and is picked only as a rough visual stand-in.
import {
  Flame,
  Clapperboard,
  Scissors,
  Disc3,
  Image,
  PenTool,
  Box,
  Music4,
  Headphones,
  Camera,
  Smartphone,
  Move3d,
  PlaneTakeoff,
} from "lucide-react";

export const DEPARTMENTS = [
  "Computer Science Engineering",
  "AI and Data Science",
  "CSE (AI-ML)",
  "Information Technology",
  "ECE",
  "EEE",
  "VLSI",
  "ACT",
  "CSBS",
  "Cyber Security",
  "Mechanical",
  "Civil",
  "Mechatronics",
  "Bio-Medical Engineering",
];

export const SOFTWARE_OPTIONS = [
  { id: "ae", label: "After Effects", icon: Flame },
  { id: "premiere", label: "Premiere Pro", icon: Clapperboard },
  { id: "capcut", label: "CapCut PC", icon: Scissors },
  { id: "davinci", label: "DaVinci Resolve", icon: Disc3 },
  { id: "photoshop", label: "Photoshop", icon: Image },
  { id: "figma", label: "Figma", icon: PenTool },
  { id: "blender", label: "Blender", icon: Box },
  { id: "resolume", label: "Resolume Arena", icon: Music4 },
  { id: "vdj", label: "Virtual DJ", icon: Headphones },
];

export const EQUIPMENT_OPTIONS = [
  { id: "camera", label: "Camera (Mirrorless / DSLR)", icon: Camera },
  { id: "iphone", label: "iPhone", icon: Smartphone },
  { id: "gimbal", label: "Gimbal & Tripod", icon: Move3d },
  { id: "drone", label: "Drone", icon: PlaneTakeoff },
];

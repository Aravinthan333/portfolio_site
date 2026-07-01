import {
  Globe,
  Server,
  Layers,
  Cloud,
  ShieldCheck,
  Workflow,
  MessagesSquare,
  Cpu,
  Search,
  Hammer,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export const serviceIconMap: Record<string, LucideIcon> = {
  web: Globe,
  backend: Server,
  saas: Layers,
  cloud: Cloud,
};

export const whyChooseIconMap: Record<string, LucideIcon> = {
  engineering: ShieldCheck,
  delivery: Workflow,
  communication: MessagesSquare,
  stack: Cpu,
};

export const processIconMap: Record<string, LucideIcon> = {
  "01": Search,
  "02": Hammer,
  "03": Rocket,
  "04": Cloud,
};

export const industryIconMap: Record<string, LucideIcon> = {
  "E-Commerce": Globe,
  FinTech: ShieldCheck,
  "Enterprise ERP": Layers,
  "Real-time Messaging": MessagesSquare,
};

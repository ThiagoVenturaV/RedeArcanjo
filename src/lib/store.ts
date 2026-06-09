import { create } from "zustand";

export type View = "hero" | "login" | "signup" | "lar" | "tecnico" | "anjo" | "escada";

export type Task = {
  id: string;
  type: "Logística" | "Execução";
  description: string;
};

export type ResidentStatus = "enviado" | "analise" | "publicado" | "entregue";

type State = {
  activeView: View;
  setActiveView: (v: View) => void;
  residentStatus: ResidentStatus;
  setResidentStatus: (s: ResidentStatus) => void;
  publishedTasks: Task[];
  publishTasks: (tasks: Task[]) => void;
  completedMissions: number;
  completeMission: () => void;
};

export const useStore = create<State>((set) => ({
  activeView: "hero",
  setActiveView: (v) => set({ activeView: v }),
  residentStatus: "analise",
  setResidentStatus: (s) => set({ residentStatus: s }),
  publishedTasks: [],
  publishTasks: (tasks) => set({ publishedTasks: tasks, residentStatus: "publicado" }),
  completedMissions: 7,
  completeMission: () =>
    set((s) => ({
      completedMissions: s.completedMissions + 1,
      residentStatus: "entregue",
    })),
}));

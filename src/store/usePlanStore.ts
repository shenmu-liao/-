import { create } from "zustand";
import { planA26Snapshot } from "@/domain/planA26Data";
import type { PlanSnapshot } from "@/domain/types";

interface PlanState {
  snapshot: PlanSnapshot;
  setSnapshot: (snapshot: PlanSnapshot) => void;
}

export const usePlanStore = create<PlanState>((set) => ({
  snapshot: planA26Snapshot,
  setSnapshot: (snapshot) => set({ snapshot }),
}));

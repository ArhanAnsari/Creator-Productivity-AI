import appwriteService from "@/services/appwrite";
import { ContentPlan, FocusSession, Idea, Script, Streak } from "@/types";
import { create } from "zustand";

interface AppState {
  // Ideas
  ideas: Idea[];
  ideasLoading: boolean;

  // Scripts
  scripts: Script[];
  scriptsLoading: boolean;

  // Plans
  plans: ContentPlan[];
  plansLoading: boolean;

  // Streaks
  streak: Streak | null;
  streakLoading: boolean;

  // Focus Sessions
  focusSessions: FocusSession[];
  focusLoading: boolean;

  // Actions
  loadIdeas: (userId: string) => Promise<void>;
  addIdea: (
    userId: string,
    idea: Omit<Idea, "$id" | "userId" | "createdAt">,
  ) => Promise<void>;
  removeIdea: (ideaId: string) => Promise<void>;

  loadScripts: (userId: string) => Promise<void>;
  addScript: (
    userId: string,
    script: Omit<Script, "$id" | "userId" | "createdAt">,
  ) => Promise<void>;
  removeScript: (scriptId: string) => Promise<void>;

  loadPlans: (userId: string) => Promise<void>;
  addPlan: (
    userId: string,
    plan: Omit<ContentPlan, "$id" | "userId" | "createdAt">,
  ) => Promise<void>;
  updatePlan: (planId: string, updates: Partial<ContentPlan>) => Promise<void>;
  removePlan: (planId: string) => Promise<void>;

  loadStreak: (userId: string) => Promise<void>;
  updateStreak: (streakId: string, updates: Partial<Streak>) => Promise<void>;

  loadFocusSessions: (userId: string) => Promise<void>;
  addFocusSession: (
    userId: string,
    session: Omit<FocusSession, "$id" | "userId" | "createdAt">,
  ) => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  ideas: [],
  ideasLoading: false,
  scripts: [],
  scriptsLoading: false,
  plans: [],
  plansLoading: false,
  streak: null,
  streakLoading: false,
  focusSessions: [],
  focusLoading: false,

  loadIdeas: async (userId: string) => {
    set({ ideasLoading: true });
    try {
      const ideas = await appwriteService.getUserIdeas(userId);
      set({ ideas, ideasLoading: false });
    } catch (error) {
      console.error("Error loading ideas:", error);
      set({ ideasLoading: false });
    }
  },

  addIdea: async (userId: string, idea: any) => {
    try {
      const newIdea = await appwriteService.saveIdea(userId, idea);
      set((state) => ({ ideas: [...state.ideas, newIdea] }));
    } catch (error) {
      console.error("Error adding idea:", error);
    }
  },

  removeIdea: async (ideaId: string) => {
    try {
      await appwriteService.deleteIdea(ideaId);
      set((state) => ({ ideas: state.ideas.filter((i) => i.$id !== ideaId) }));
    } catch (error) {
      console.error("Error removing idea:", error);
    }
  },

  loadScripts: async (userId: string) => {
    set({ scriptsLoading: true });
    try {
      const scripts = await appwriteService.getUserScripts(userId);
      set({ scripts, scriptsLoading: false });
    } catch (error) {
      console.error("Error loading scripts:", error);
      set({ scriptsLoading: false });
    }
  },

  addScript: async (userId: string, script: any) => {
    try {
      const newScript = await appwriteService.saveScript(userId, script);
      set((state) => ({ scripts: [...state.scripts, newScript] }));
    } catch (error) {
      console.error("Error adding script:", error);
    }
  },

  removeScript: async (scriptId: string) => {
    try {
      await appwriteService.deleteScript(scriptId);
      set((state) => ({
        scripts: state.scripts.filter((s) => s.$id !== scriptId),
      }));
    } catch (error) {
      console.error("Error removing script:", error);
    }
  },

  loadPlans: async (userId: string) => {
    set({ plansLoading: true });
    try {
      const plans = await appwriteService.getUserContentPlans(userId);
      set({ plans, plansLoading: false });
    } catch (error) {
      console.error("Error loading plans:", error);
      set({ plansLoading: false });
    }
  },

  addPlan: async (userId: string, plan: any) => {
    try {
      const newPlan = await appwriteService.createContentPlan(userId, plan);
      set((state) => ({ plans: [...state.plans, newPlan] }));
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  },

  updatePlan: async (planId: string, updates: Partial<ContentPlan>) => {
    try {
      const updated = await appwriteService.updateContentPlan(planId, updates);
      set((state) => ({
        plans: state.plans.map((p) => (p.$id === planId ? updated : p)),
      }));
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  },

  removePlan: async (planId: string) => {
    try {
      await appwriteService.deleteContentPlan(planId);
      set((state) => ({ plans: state.plans.filter((p) => p.$id !== planId) }));
    } catch (error) {
      console.error("Error removing plan:", error);
    }
  },

  loadStreak: async (userId: string) => {
    set({ streakLoading: true });
    try {
      const streak = await appwriteService.getOrCreateStreak(userId);
      set({ streak, streakLoading: false });
    } catch (error) {
      console.error("Error loading streak:", error);
      set({ streakLoading: false });
    }
  },

  updateStreak: async (streakId: string, updates: Partial<Streak>) => {
    try {
      const updated = await appwriteService.updateStreak(streakId, updates);
      set({ streak: updated });
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  },

  loadFocusSessions: async (userId: string) => {
    set({ focusLoading: true });
    try {
      const sessions = await appwriteService.getUserFocusSessions(userId);
      set({
        focusSessions: sessions,
        focusLoading: false,
      });
    } catch (error) {
      console.error("Error loading focus sessions:", error);
      set({ focusLoading: false });
    }
  },

  addFocusSession: async (userId: string, session: any) => {
    try {
      const newSession = await appwriteService.createFocusSession(
        userId,
        session,
      );
      set((state) => ({ focusSessions: [...state.focusSessions, newSession] }));
    } catch (error) {
      console.error("Error adding focus session:", error);
    }
  },
}));

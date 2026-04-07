export type UserRole = "free" | "premium" | "admin";

export interface User {
  $id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  ideasGenerated: number;
  scriptsGenerated: number;
}

export interface Idea {
  $id: string;
  userId: string;
  niche: string;
  title: string;
  hook: string;
  description: string;
  category: string;
  saved: boolean;
  createdAt: string;
}

export interface Script {
  $id: string;
  userId: string;
  ideaId: string;
  title: string;
  content: string;
  type: "short" | "long";
  duration?: number; // in seconds
  wordCount: number;
  saved: boolean;
  createdAt: string;
}

export interface ContentPlan {
  $id: string;
  userId: string;
  title: string;
  description: string;
  dueDate: string;
  status: "scheduled" | "in-progress" | "completed";
  scriptId?: string;
  ideaId?: string;
  createdAt: string;
}

export interface FocusSession {
  $id: string;
  userId: string;
  duration: number; // in minutes
  sessionName: string;
  breakInterval: number;
  completedAt?: string;
  createdAt: string;
}

export interface Streak {
  $id: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  totalPosts: number;
  productivityScore: number;
  lastActivityDate: string;
  updatedAt: string;
}

export interface AiPromptRequest {
  type: "idea" | "script";
  niche?: string;
  scriptType?: "short" | "long";
  contentLength?: string;
}

export interface AiPromptResponse {
  success: boolean;
  data?: Idea[] | Script | string;
  error?: string;
}

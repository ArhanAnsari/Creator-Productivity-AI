import ENV from "@/config/env";
import { ContentPlan, FocusSession, Idea, Script, Streak, User } from "@/types";
import { Account, Client, ID, Query, TablesDB } from "react-native-appwrite";

class AppwriteService {
  private client: Client;
  private account: Account;
  private tablesDB: TablesDB;

  constructor() {
    this.client = new Client()
      .setEndpoint(ENV.appwrite.endpoint)
      .setProject(ENV.appwrite.projectId);

    this.account = new Account(this.client);
    this.tablesDB = new TablesDB(this.client);
  }

  // ===== AUTH METHODS =====
  async createAccount(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      // Create session
      await this.account.createEmailPasswordSession(email, password);

      // Create user document in database
      return await this.createUserDocument(user.$id, email, name);
    } catch (error) {
      throw error;
    }
  }

  async loginWithEmail(email: string, password: string): Promise<User> {
    try {
      await this.account.createEmailPasswordSession(email, password);
      const user = await this.account.get();
      return this.getUserDocument(user.$id);
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const accountUser = await this.account.get();
      return this.getUserDocument(accountUser.$id);
    } catch (error) {
      return null;
    }
  }

  // ===== USER DOCUMENT METHODS =====
  private async createUserDocument(
    userId: string,
    email: string,
    name: string,
  ): Promise<User> {
    const row = await this.tablesDB.createRow({
      databaseId: ENV.appwrite.databaseId,
      tableId: "users",
      rowId: userId,
      data: {
        email,
        name,
        role: "free",
        ideasGenerated: 0,
        scriptsGenerated: 0,
        createdAt: new Date().toISOString(),
      },
    });
    return row as unknown as User;
  }

  async getUserDocument(userId: string): Promise<User> {
    try {
      const doc = await this.tablesDB.getRow({
        databaseId: ENV.appwrite.databaseId,
        tableId: "users",
        rowId: userId,
      });
      return doc as unknown as User;
    } catch (error) {
      throw error;
    }
  }

  // ===== IDEAS METHODS =====
  async saveIdea(
    userId: string,
    idea: Omit<Idea, "$id" | "userId" | "createdAt">,
  ): Promise<Idea> {
    const row = await this.tablesDB.createRow({
      databaseId: ENV.appwrite.databaseId,
      tableId: "ideas",
      rowId: ID.unique(),
      data: {
        ...idea,
        userId,
        createdAt: new Date().toISOString(),
      },
    });
    return row as unknown as Idea;
  }

  async getUserIdeas(userId: string): Promise<Idea[]> {
    const ideas = await this.tablesDB.listRows({
      databaseId: ENV.appwrite.databaseId,
      tableId: "ideas",
      queries: [Query.equal("userId", userId)],
    });
    return (ideas.rows || []) as unknown as Idea[];
  }

  async deleteIdea(ideaId: string): Promise<void> {
    await this.tablesDB.deleteRow({
      databaseId: ENV.appwrite.databaseId,
      tableId: "ideas",
      rowId: ideaId,
    });
  }

  // ===== SCRIPTS METHODS =====
  async saveScript(
    userId: string,
    script: Omit<Script, "$id" | "userId" | "createdAt">,
  ): Promise<Script> {
    const row = await this.tablesDB.createRow({
      databaseId: ENV.appwrite.databaseId,
      tableId: "scripts",
      rowId: ID.unique(),
      data: {
        ...script,
        userId,
        createdAt: new Date().toISOString(),
      },
    });
    return row as unknown as Script;
  }

  async getUserScripts(userId: string): Promise<Script[]> {
    const scripts = await this.tablesDB.listRows({
      databaseId: ENV.appwrite.databaseId,
      tableId: "scripts",
      queries: [Query.equal("userId", userId)],
    });
    return (scripts.rows || []) as unknown as Script[];
  }

  async deleteScript(scriptId: string): Promise<void> {
    await this.tablesDB.deleteRow({
      databaseId: ENV.appwrite.databaseId,
      tableId: "scripts",
      rowId: scriptId,
    });
  }

  // ===== CONTENT PLAN METHODS =====
  async createContentPlan(
    userId: string,
    plan: Omit<ContentPlan, "$id" | "userId" | "createdAt">,
  ): Promise<ContentPlan> {
    const row = await this.tablesDB.createRow({
      databaseId: ENV.appwrite.databaseId,
      tableId: "plans",
      rowId: ID.unique(),
      data: {
        ...plan,
        userId,
        createdAt: new Date().toISOString(),
      },
    });
    return row as unknown as ContentPlan;
  }

  async getUserContentPlans(userId: string): Promise<ContentPlan[]> {
    const plans = await this.tablesDB.listRows({
      databaseId: ENV.appwrite.databaseId,
      tableId: "plans",
      queries: [Query.equal("userId", userId)],
    });
    return (plans.rows || []) as unknown as ContentPlan[];
  }

  async updateContentPlan(
    planId: string,
    updates: Partial<ContentPlan>,
  ): Promise<ContentPlan> {
    const row = await this.tablesDB.updateRow({
      databaseId: ENV.appwrite.databaseId,
      tableId: "plans",
      rowId: planId,
      data: updates,
    });
    return row as unknown as ContentPlan;
  }

  async deleteContentPlan(planId: string): Promise<void> {
    await this.tablesDB.deleteRow({
      databaseId: ENV.appwrite.databaseId,
      tableId: "plans",
      rowId: planId,
    });
  }

  // ===== FOCUS SESSION METHODS =====
  async createFocusSession(
    userId: string,
    session: Omit<FocusSession, "$id" | "userId" | "createdAt">,
  ): Promise<FocusSession> {
    const row = await this.tablesDB.createRow({
      databaseId: ENV.appwrite.databaseId,
      tableId: "focus_sessions",
      rowId: ID.unique(),
      data: {
        ...session,
        userId,
        createdAt: new Date().toISOString(),
      },
    });
    return row as unknown as FocusSession;
  }

  async getUserFocusSessions(userId: string): Promise<FocusSession[]> {
    const sessions = await this.tablesDB.listRows({
      databaseId: ENV.appwrite.databaseId,
      tableId: "focus_sessions",
      queries: [Query.equal("userId", userId)],
    });
    return (sessions.rows || []) as unknown as FocusSession[];
  }

  // ===== STREAK METHODS =====
  async getOrCreateStreak(userId: string): Promise<Streak> {
    try {
      const streaks = await this.tablesDB.listRows({
        databaseId: ENV.appwrite.databaseId,
        tableId: "streaks",
        queries: [Query.equal("userId", userId)],
      });

      if (streaks.rows && streaks.rows.length > 0) {
        return streaks.rows[0] as unknown as Streak;
      }

      // Create new streak
      const row = await this.tablesDB.createRow({
        databaseId: ENV.appwrite.databaseId,
        tableId: "streaks",
        rowId: ID.unique(),
        data: {
          userId,
          currentStreak: 0,
          longestStreak: 0,
          totalPosts: 0,
          productivityScore: 0,
          lastActivityDate: new Date().toISOString(),
        },
      });
      return row as unknown as Streak;
    } catch (error) {
      throw error;
    }
  }

  async updateStreak(
    streakId: string,
    updates: Partial<Streak>,
  ): Promise<Streak> {
    const updatesWithoutUpdatedAt = { ...updates };
    delete (updatesWithoutUpdatedAt as any).updatedAt;
    const row = await this.tablesDB.updateRow({
      databaseId: ENV.appwrite.databaseId,
      tableId: "streaks",
      rowId: streakId,
      data: updatesWithoutUpdatedAt,
    });
    return row as unknown as Streak;
  }

  // ===== UTILITY METHODS =====
  getClient(): Client {
    return this.client;
  }

  getAccount(): Account {
    return this.account;
  }

  getTablesDB(): TablesDB {
    return this.tablesDB;
  }
}

export default new AppwriteService();

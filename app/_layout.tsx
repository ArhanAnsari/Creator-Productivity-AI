import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/store/authStore";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { checkAuth, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Auth check failed:", error);
        // Continue anyway - user will be taken to auth screen
      }
    };
    initializeAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {isLoading ? (
        <LoadingScreen message="Initializing app..." />
      ) : (
        <Stack
          screenOptions={{
            headerShown: false,
            cardStyle: {
              backgroundColor: colorScheme === "dark" ? "#0f172a" : "#fff",
            },
          }}
          initialRouteName={isAuthenticated ? "(tabs)" : "(auth)"}
        >
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      )}
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

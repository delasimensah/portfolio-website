import "react-native-reanimated";
import "../global.css";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { cssInterop } from "nativewind";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { queryClientDefaultOptions } from "shared";

import {
  ActiveToast,
  BottomSheetsManager,
  ErrorToast,
  LoadingScreen,
  NeutralToast,
  SuccessToast,
} from "@/components";
import { FONT_LOADING_MAP } from "@/constants";
// import { useAuthStore } from "@/hooks";
import { defaultStackScreenOptions, screenPresets } from "@/utils";

// Configure expo-image and LinearGradient to work with NativeWind
cssInterop(Image, { className: "style" });
cssInterop(ImageBackground, { className: "style" });
cssInterop(LinearGradient, { className: "style" });

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient(queryClientDefaultOptions);

const RootLayout = () => {
  const [loaded, error] = useFonts({
    ...FONT_LOADING_MAP,
  });

  // Customize: Uncomment when auth is set up
  // const segments = useSegments();
  // useAuthInitialize();
  // const { user, isInitialized } = useAuthStore();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      // Customize: Add isInitialized check when auth is set up
      // if (loaded && isInitialized) {
      SplashScreen.hideAsync();
      // }
    }
  }, [loaded]);

  // Show loading screen while fonts are loading
  if (!loaded) {
    return <LoadingScreen />;
  }

  // Customize: Uncomment and adjust route protection logic as needed
  // ROUTE PROTECTION LOGIC
  // const inAuthGroup = segments[0] === "(auth)";
  // const inOnboardingGroup = segments[0] === "(onboarding)";
  //
  // // Not authenticated - redirect to auth
  // if (!user && !inAuthGroup) {
  //   return <Redirect href="/(auth)" />;
  // }
  //
  // // Authenticated but not onboarded - redirect to onboarding
  // if (user && !user.hasOnboarded && !inOnboardingGroup) {
  //   return <Redirect href="/(onboarding)" />;
  // }
  //
  // // Authenticated and onboarded but in auth/onboarding - redirect to main app
  // if (user && user.hasOnboarded && (inAuthGroup || inOnboardingGroup)) {
  //   return <Redirect href="/(main-app)/(tabs)/home" />;
  // }

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <QueryClientProvider client={queryClient}>
            <Stack
              screenOptions={{
                ...defaultStackScreenOptions,
                ...screenPresets.noHeader,
              }}
            >
              <Stack.Screen name="index" />
              {/* Customize: Add route groups as needed */}
              {/* <Stack.Screen name="(auth)" /> */}
              {/* <Stack.Screen name="(onboarding)" /> */}
              {/* <Stack.Screen name="(main-app)" /> */}
            </Stack>
            <BottomSheetsManager />
            <Toast
              config={{
                active: (props) => <ActiveToast {...props} />,
                neutral: (props) => <NeutralToast {...props} />,
                success: (props) => <SuccessToast {...props} />,
                error: (props) => <ErrorToast {...props} />,
              }}
            />
          </QueryClientProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;

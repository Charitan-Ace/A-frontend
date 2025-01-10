import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/auth/providers/cookies-provider.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { LayoutProvider, LoadersProvider, SettingsProvider } from "@/providers";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NuqsAdapter>
          <SettingsProvider>
            <LayoutProvider>
              <LoadersProvider>{children}</LoadersProvider>
            </LayoutProvider>
          </SettingsProvider>
        </NuqsAdapter>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
};

export { ProvidersWrapper };

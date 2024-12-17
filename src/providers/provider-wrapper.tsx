import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/auth/providers/cookies-provider.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { LayoutProvider, LoadersProvider, SettingsProvider } from "@/providers";

const queryClient = new QueryClient();

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NuqsAdapter>
          <SettingsProvider>
            <LayoutProvider>
              <LoadersProvider> {children}</LoadersProvider>
            </LayoutProvider>
          </SettingsProvider>
        </NuqsAdapter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export { ProvidersWrapper };

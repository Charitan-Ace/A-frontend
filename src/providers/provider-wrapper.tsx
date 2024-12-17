import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/auth/providers/cookies-provider.tsx";
import { SettingsProvider } from "@/providers/settings-provider.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { LoadersProvider } from "@/providers/loaders-provider.tsx";

const queryClient = new QueryClient();

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NuqsAdapter>
          <SettingsProvider>
            <LoadersProvider> {children}</LoadersProvider>
          </SettingsProvider>
        </NuqsAdapter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export { ProvidersWrapper };

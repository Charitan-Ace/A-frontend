import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/auth/providers/cookies-provider.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
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
      <ShadcnToaster />
    </QueryClientProvider>
  );
};

export { ProvidersWrapper };

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/auth/providers/cookies-provider.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import { LayoutProvider, LoadersProvider, SettingsProvider } from "@/providers";
import { Toaster } from "sonner";
import { queryClient } from "@/api/client";


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
      <Toaster position="top-center" />
      <ShadcnToaster />
    </QueryClientProvider>
  );
};

export { ProvidersWrapper };

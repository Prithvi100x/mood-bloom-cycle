
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CycleProvider } from "./context/CycleContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import CalendarPage from "./pages/Calendar";
import FoodPage from "./pages/Food";
import InsightsPage from "./pages/Insights";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ThemeInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Check for dark mode preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Apply dark mode if saved or if user prefers dark mode
    if (savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CycleProvider>
        <ThemeInitializer>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/food" element={<FoodPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeInitializer>
      </CycleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

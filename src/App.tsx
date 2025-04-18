import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import EditorPage from "./pages/EditorPage"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import QuickJoinPage from "./pages/QuickJoinPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import NotFound from "./pages/NotFound";
import VideoCall from "./components/VideoCall"

const queryClient = new QueryClient();

const App = () => (
<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors">
          <Toaster />
          <Sonner />
            <Router>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/quick-join" element={<QuickJoinPage />} />
                    <Route path="/create-room" element={<CreateRoomPage />} />
                    <Route path="/editor/:roomId" element={<EditorPage />} />
                    <Route path="/video-call" element={<VideoCall />} />
                    <Route path="*" element={<NotFound />} /> 
                </Routes>
            </Router>
            </div>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
)

export default App

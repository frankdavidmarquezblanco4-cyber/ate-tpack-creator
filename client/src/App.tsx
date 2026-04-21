import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Example from "./pages/Example";
import Examples from "./pages/Examples";
import Templates from "./pages/Templates";
import Gallery from "./pages/Gallery";
import Creator from "./pages/Creator";
import Dashboard from "./pages/Dashboard";
import Navigation from "./components/Navigation";
import VirtualAssistant from "./components/VirtualAssistant";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Welcome} />
      <Route path={"/home"} component={Home} />
      <Route path={"/learn"} component={Learn} />
      <Route path={"/example"} component={Example} />
      <Route path={"/examples"} component={Examples} />
      <Route path={"/templates"} component={Templates} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/creator"} component={Creator} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main>
              <Router />
            </main>
            <VirtualAssistant />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

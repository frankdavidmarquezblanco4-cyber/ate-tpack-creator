import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Example from "./pages/Example";
import Creator from "./pages/Creator";
import Navigation from "./components/Navigation";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/learn"} component={Learn} />
      <Route path={"/example"} component={Example} />
      <Route path={"/creator"} component={Creator} />
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
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

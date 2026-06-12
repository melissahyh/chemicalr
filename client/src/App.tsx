import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider } from "./contexts/AppContext";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import Home from "./pages/Home";
import About from "./pages/About";
import Shipping from "./pages/Shipping";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/shipping" component={Shipping} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={Terms} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
            <CartDrawer />
            <WishlistDrawer />
          </TooltipProvider>
        </ThemeProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;

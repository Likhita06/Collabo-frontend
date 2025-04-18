
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/layout";
import { Code2, UserPlus, LogIn, Laptop } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    if (userInfo.isLoggedIn) {
      navigate("/create-room");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Laptop className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Collabo
            </h1>
          </div>
          <p className="text-2xl mb-8">
            Real-time code collaboration platform for developers
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center p-6 bg-secondary rounded-lg text-center">
              <Code2 className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-lg font-medium mb-2">Live Collaboration</h3>
              <p className="text-muted-foreground">
                Code together in real-time with your team
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-secondary rounded-lg text-center">
              <UserPlus className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-lg font-medium mb-2">Easy Onboarding</h3>
              <p className="text-muted-foreground">
                Quick join or register for more features
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-secondary rounded-lg text-center">
              <LogIn className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-lg font-medium mb-2">Secure Sessions</h3>
              <p className="text-muted-foreground">
                Create private rooms with custom IDs
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Create Account
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/quick-join")}>
              Quick Join
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

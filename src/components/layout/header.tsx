
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import AvatarLetter from "../ui/avatar-letter";
import { LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in from localStorage
  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = userInfo.isLoggedIn || false;
  const username = userInfo.username || "";
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  
  return (
    <header className="border-b border-border sticky top-0 bg-background z-10">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-primary">
            Collabo
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <AvatarLetter username={username} size="sm" />
                <span className="font-medium">{username}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const QuickJoinForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to check if a room exists
  const roomExists = (roomId: string): boolean => {
    // Get all active rooms from localStorage
    const activeRoom = JSON.parse(localStorage.getItem("activeRoom") || "null");
    
    // Check if the roomId matches any existing room
    return activeRoom !== null && activeRoom.id === roomId;
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError("");
    
    // Form validation
    if (!roomId) {
      setError("Please enter a room ID");
      return;
    }
    
    if (!username) {
      setError("Please enter a username");
      return;
    }

    try {
      setIsLoading(true);
      
      // Check if the room exists
      if (!roomExists(roomId)) {
        setError("Room does not exist. Please check the room ID and try again.");
        setIsLoading(false);
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Store temporary user info
      localStorage.setItem("tempUser", JSON.stringify({ 
        username,
        roomId,
        isTemporary: true 
      }));
      
      toast({
        title: "Room joined!",
        description: `You've joined room ${roomId}`,
      });
      
      // Redirect to editor page with the room ID
      navigate(`/editor/${roomId}`,{
        state:{username}
      });
    } catch (err) {
      setError("Failed to join room. Please check the room ID and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Quick Join</CardTitle>
        <CardDescription className="text-center">
          Enter a room ID and username to join an existing collaboration session
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleJoin} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="roomId">Room ID</Label>
            <Input
              id="roomId"
              placeholder="Enter the room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Choose a temporary username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Joining..." : "Join Room"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-center text-muted-foreground">
          Want to create your own rooms?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/login")}>
            Log in
          </Button>
          {" "}or{" "}
          <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuickJoinForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";

const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const CreateRoomForm = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const username = userInfo.username || "User";

  const handleGenerateRoomId = () => {
    setRoomId(generateRoomId());
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId.trim()) return;

    try {
      setIsCreating(true);

      // Simulate backend call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Save active room info to localStorage
      localStorage.setItem(
        "activeRoom",
        JSON.stringify({
          id: roomId,
          host: username,
          createdAt: new Date().toISOString(),
        })
      );

      // Redirect to editor
      navigate(`/editor/${roomId}`,{
        state:{username}
      });
    } catch (err) {
      console.error("Failed to create room:", err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Create a Room</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="room-id">Room ID</Label>
            <div className="flex gap-2">
              <Input
                id="room-id"
                placeholder="Enter or generate a room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateRoomId}
                title="Generate Room ID"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isCreating || !roomId.trim()}>
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Room"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          Share the room ID with your collaborators
        </div>
      </CardFooter>
    </Card>
  );
};

export default CreateRoomForm;

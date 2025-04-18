import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/layout";
import CreateRoomForm from "@/components/room/create-room-form";
import AvatarLetter from "@/components/ui/avatar-letter";
import { useToast } from "@/hooks/use-toast";

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = userInfo.isLoggedIn || false;
  const username = userInfo.username || "";

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You must be logged in to create a room",
      });
      navigate("/login");
    }
  }, [isLoggedIn, navigate, toast]);

  if (!isLoggedIn) return null;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-6">Create a Room</h1>
            <p className="mb-4 text-muted-foreground">
              Create a new collaboration room to start coding with your team.
              Share the room ID with others to invite them.
            </p>
            <div className="bg-muted rounded-lg p-6 mb-6">
              <h3 className="font-medium mb-2">Your Profile</h3>
              <div className="flex items-center gap-3">
                <AvatarLetter username={username} />
                <div>
                  <p className="font-medium">{username}</p>
                  <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <CreateRoomForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateRoomPage;

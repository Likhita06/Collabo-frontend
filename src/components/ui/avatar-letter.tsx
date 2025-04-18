
import { cn } from "@/lib/utils";

interface AvatarLetterProps {
  username: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const AvatarLetter = ({ 
  username, 
  size = "md",
  className 
}: AvatarLetterProps) => {
  const firstLetter = username ? username.charAt(0).toUpperCase() : "?";
  
  // Generate a consistent color based on the username
  const colors = [
    "bg-purple-500", "bg-indigo-500", "bg-blue-500", 
    "bg-violet-500", "bg-fuchsia-500", "bg-pink-500"
  ];
  
  const colorIndex = username
    ? username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
    : 0;
  
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-xl",
  };

  return (
    <div 
      className={cn(
        "rounded-full flex items-center justify-center text-white font-semibold",
        colors[colorIndex],
        sizeClasses[size],
        className
      )}
    >
      {firstLetter}
    </div>
  );
};

export default AvatarLetter;

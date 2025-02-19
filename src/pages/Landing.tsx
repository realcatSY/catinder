
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <Heart className="w-16 h-16 text-primary mx-auto animate-pulse" />
          <h1 className="text-4xl font-bold tracking-tight">Catinder</h1>
          <p className="text-muted-foreground">Find your purr-fect match today!</p>
        </div>
        
        <Button 
          size="lg"
          onClick={() => navigate('/join')}
          className="bg-primary hover:bg-primary/90 text-white px-8"
        >
          Join Now
        </Button>
      </div>
    </div>
  );
};

export default Landing;

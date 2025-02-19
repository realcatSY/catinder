
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Join = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || (!isLogin && !name.trim())) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      });
      return;
    }
    login({ name: name || email.split('@')[0], image: "" });
    navigate('/swipe');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0d0f14]">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-8 rounded-2xl bg-[#1a1d24]/50 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Вход" : "Регистрация"}
        </h1>

        <div className="space-y-4">
          {!isLogin && (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Имя"
              className="bg-[#272a31] border-0"
            />
          )}

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-[#272a31] border-0"
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="bg-[#272a31] border-0"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
        >
          {isLogin ? "Войти" : "Зарегистрироваться"}
        </Button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center text-[#9b87f5] text-sm hover:underline mt-4"
        >
          {isLogin ? "Создать аккаунт" : "Уже есть аккаунт?"}
        </button>
      </form>
    </div>
  );
};

export default Join;

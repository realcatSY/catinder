
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { generateCats, type Cat } from '@/utils/catData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Swipe = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setCats(generateCats(80));
  }, []);

  const handleSwipe = (liked: boolean) => {
    setDirection(liked ? 'right' : 'left');
    const currentCat = cats[currentIndex];
    
    if (liked) {
      const savedLikes = localStorage.getItem('catinder_likes');
      const likedIds = savedLikes ? JSON.parse(savedLikes) : [];
      if (!likedIds.includes(currentCat.id)) {
        likedIds.push(currentCat.id);
        localStorage.setItem('catinder_likes', JSON.stringify(likedIds));
      }
    }

    const updatedCats = [...cats];
    updatedCats[currentIndex].liked = liked;
    setCats(updatedCats);

    setTimeout(() => {
      setDirection(null);
      setCurrentIndex((prev) => prev + 1);
    }, 300);
  };

  if (currentIndex >= cats.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0d0f14]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Больше нет котиков!</h2>
          <p className="text-muted-foreground">Проверьте свои совпадения в чате</p>
          <Button onClick={() => navigate('/chat')} className="bg-[#9b87f5]">
            Перейти к чатам
          </Button>
        </div>
      </div>
    );
  }

  const currentCat = cats[currentIndex];

  return (
    <div className="min-h-screen p-4 flex flex-col items-center bg-[#0d0f14]">
      <div className="flex-1 flex items-center justify-center w-full max-w-md">
        <AnimatePresence>
          <motion.div
            key={currentCat.id}
            className="w-full relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: direction === 'left' ? -200 : direction === 'right' ? 200 : 0,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
              <img
                src={currentCat.image}
                alt={currentCat.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 className="text-2xl font-bold">
                  {currentCat.name}, {currentCat.age} years
                </h3>
                <p className="text-white/80 mt-2">
                  {currentCat.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-8 mb-4">
        <button
          onClick={() => handleSwipe(false)}
          className="w-16 h-16 rounded-full flex items-center justify-center bg-white text-black hover:scale-110 transition-transform"
        >
          <X className="w-8 h-8" />
        </button>

        <button
          onClick={() => handleSwipe(true)}
          className="w-16 h-16 rounded-full flex items-center justify-center bg-[#9b87f5] text-white hover:scale-110 transition-transform"
        >
          <Heart className="w-8 h-8" />
        </button>
      </div>

      <div className="flex gap-4 text-sm">
        <button
          onClick={() => navigate('/chat')}
          className="text-[#9b87f5] hover:underline"
        >
          Перейти к чатам
        </button>
        <button
          onClick={() => setCurrentIndex(0)}
          className="text-[#9b87f5] hover:underline"
        >
          Начать сначала
        </button>
      </div>
    </div>
  );
};

export default Swipe;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cat, MEOW_MESSAGES, getRandomMeow, generateCats } from '@/utils/catData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isGif?: boolean;
}

const Chat = () => {
  const [matches, setMatches] = useState<Cat[]>([]);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load all cats and filter only liked ones
    const cats = generateCats(80);
    const savedLikes = localStorage.getItem('catinder_likes');
    const likedIds = savedLikes ? JSON.parse(savedLikes) : [];
    const likedCats = cats.filter(cat => likedIds.includes(cat.id));
    setMatches(likedCats);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedCat) return;

    const catId = selectedCat.id;
    const newMessages = [...(messages[catId] || [])];
    
    // Add user message
    newMessages.push({
      id: Date.now(),
      text: MEOW_MESSAGES[Math.floor(Math.random() * MEOW_MESSAGES.length)],
      isUser: true
    });

    // Add cat response
    const response = getRandomMeow();
    const isGif = response.startsWith('http');
    
    newMessages.push({
      id: Date.now() + 1,
      text: response,
      isUser: false,
      isGif
    });

    setMessages({ ...messages, [catId]: newMessages });
    setNewMessage('');
  };

  return (
    <div className="min-h-screen flex">
      {/* Matches sidebar */}
      <div className="w-80 border-r border-border p-4 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Matches</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/swipe')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {matches.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat)}
              className={`w-full p-3 rounded-lg flex items-center space-x-3 transition-colors ${
                selectedCat?.id === cat.id
                  ? 'bg-primary/20'
                  : 'hover:bg-secondary'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedCat ? (
          <>
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedCat.image}
                  alt={selectedCat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h3 className="font-bold">{selectedCat.name}</h3>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-auto">
              {messages[selectedCat.id]?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className={`chat-message ${
                    message.isUser ? 'bg-primary/20' : 'bg-secondary'
                  }`}>
                    {message.isGif ? (
                      <img src={message.text} alt="Cat GIF" className="rounded" />
                    ) : (
                      <p>{message.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a meow..."
                  className="flex-1"
                />
                <Button type="submit">Send</Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a match to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;

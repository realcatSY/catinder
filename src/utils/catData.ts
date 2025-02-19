
import { faker } from '@faker-js/faker';

export interface Cat {
  id: number;
  name: string;
  image: string;
  description: string;
  liked?: boolean;
  age: number;
}

const descriptions = [
  "Living life one nap at a time",
  "Purr-fessional cuddle expert",
  "Looking for my paw-fect match",
  "Treat enthusiast, nap professional",
  "Adventure seeker with nine lives",
  "Queen of the window sill",
  "Seeking someone to share treats with",
  "Professional yarn chaser",
  "Sunbeam connoisseur",
  "Box inspector by day, dreamer by night"
];

const CAT_IMAGES = [
  "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif",
  "https://media.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif",
  "https://media.giphy.com/media/OmK8lulOMQ9XO/giphy.gif",
  "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif",
  "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
  "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
  "https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif",
  "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif",
  "https://media.giphy.com/media/W3QKEujo8vztC/giphy.gif",
  "https://media.giphy.com/media/5i7umUqAOYYEw/giphy.gif",
  "https://media.giphy.com/media/v6aOjy0Qo1fIA/giphy.gif",
  "https://media.giphy.com/media/E1gzVjyPJFpYY/giphy.gif",
  "https://media.giphy.com/media/aC45M5Q4D07Pq/giphy.gif",
  "https://media.giphy.com/media/33OrjzUFwkwEg/giphy.gif",
  "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif",
  "https://media.giphy.com/media/CjmvTCZf2U3p09Cn0h/giphy.gif",
  "https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif",
  "https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif",
  "https://media.giphy.com/media/cfuL5gqFDreXxkWQ4o/giphy.gif",
  "https://media.giphy.com/media/H4DjXQXamtTiIuCcRU/giphy.gif"
];

export const generateCats = (count: number): Cat[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: faker.person.firstName('female'),
    image: CAT_IMAGES[i % CAT_IMAGES.length], // Cycle through the images array
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    age: Math.floor(Math.random() * 8) + 1
  }));
};

export const MEOW_MESSAGES = ["meow)", "meow(", "MEW😜", "meow!", "Meow"];

const getRandomMeowWord = () => MEOW_MESSAGES[Math.floor(Math.random() * MEOW_MESSAGES.length)];

const generateMeowMessage = () => {
  // 60% chance for 1 word, 30% for 2 words, 10% for 3 words
  const random = Math.random();
  if (random < 0.6) {
    return getRandomMeowWord();
  } else if (random < 0.9) {
    return `${getRandomMeowWord()} ${getRandomMeowWord()}`;
  } else {
    return `${getRandomMeowWord()} ${getRandomMeowWord()} ${getRandomMeowWord()}`;
  }
};

// We'll use the same images for both profile cards and chat messages
export const getRandomMeow = () => {
  // Increase chance of sending an image to 25%
  const shouldSendGif = Math.random() < 0.25;
  if (shouldSendGif) {
    return CAT_IMAGES[Math.floor(Math.random() * CAT_IMAGES.length)];
  }
  return generateMeowMessage();
};

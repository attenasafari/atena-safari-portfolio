import type { Category, CategoryId, Trait } from "@/club/types";

export const categories: Category[] = [
  {
    id: "movies",
    name: "Movies & TV",
    blurb: "Clapperboards, couch premieres, and the lines you quote wrong on purpose.",
    image: "/assets/categories/movies.jpg",
    alt: "A coral fuzzy clapperboard plush with yellow boots",
    tint: "#FF776E",
  },
  {
    id: "music",
    name: "Music",
    blurb: "Lyrics you know in the shower and bands you would defend at dinner.",
    image: "/assets/categories/music.jpg",
    alt: "A sky-blue fuzzy musical note plush in a purple boot",
    tint: "#48A9ED",
  },
  {
    id: "brain",
    name: "Brain Teasers",
    blurb: "Short riddles that feel obvious one second after you miss them.",
    image: "/assets/categories/brain.jpg",
    alt: "A pink fuzzy brain plush in mint boots",
    tint: "#F08BB0",
  },
  {
    id: "general",
    name: "General Knowledge",
    blurb: "The wide shelf: capitals, oceans, and facts that win a quiet room.",
    image: "/assets/categories/globe.jpg",
    alt: "A mint fuzzy globe plush in tan boots",
    tint: "#28B99A",
  },
  {
    id: "science",
    name: "Science",
    blurb: "Kitchen experiments and the kind of science you can say out loud.",
    image: "/assets/categories/science.jpg",
    alt: "A purple fuzzy atom plush with yellow electron puffs and blue boots",
    tint: "#7657E8",
  },
  {
    id: "funny",
    name: "Funny & Weird",
    blurb: "Facts that sound invented, and a few that really should be.",
    image: "/assets/categories/funny.jpg",
    alt: "A yellow fuzzy grinning face with one red boot kicked up",
    tint: "#FFCA4B",
  },
  {
    id: "logic",
    name: "Logic & Puzzles",
    blurb: "Odd ones out, patterns, and the little trap in the wording.",
    image: "/assets/categories/logic.jpg",
    alt: "A green fuzzy puzzle-piece plush in brown boots",
    tint: "#1F9A72",
  },
  {
    id: "personality",
    name: "Personality",
    blurb: "Which fuzzy friend you are, plus a few questions about people.",
    image: "/assets/categories/personality.jpg",
    alt: "A red fuzzy heart plush with one yellow boot",
    tint: "#FF776E",
  },
  {
    id: "sports",
    name: "Sports",
    blurb: "Stadium nights and the rules everyone forgets until the replay.",
    image: "/assets/categories/sports.jpg",
    alt: "A yellow and coral fuzzy soccer ball plush in blue boots",
    tint: "#FFCA4B",
  },
  {
    id: "history",
    name: "History",
    blurb: "Firsts, ruins, and the stories that still start arguments.",
    image: "/assets/categories/history.jpg",
    alt: "An amber fuzzy alarm-clock plush in purple boots",
    tint: "#C9843A",
  },
];

export const characters: Record<
  Trait,
  { id: Trait; name: string; line: string; crop: string }
> = {
  spark: {
    id: "spark",
    name: "Spark",
    line: "You bring the noise, the heels, and a reason for everyone else to stay.",
    crop: "18% 78%",
  },
  tower: {
    id: "tower",
    name: "Tower",
    line: "You keep the plan steady when the room gets loud.",
    crop: "38% 22%",
  },
  ranger: {
    id: "ranger",
    name: "Ranger",
    line: "You would rather see what is around the next corner.",
    crop: "54% 62%",
  },
  comet: {
    id: "comet",
    name: "Comet",
    line: "You are already halfway into a different plan, one boot off.",
    crop: "84% 64%",
  },
};

export function getCategory(id: CategoryId) {
  return categories.find((category) => category.id === id);
}

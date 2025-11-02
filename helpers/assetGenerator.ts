// lib/heroData.ts
export type HeroData = {
  seed: string;
  author: string;
  sales: string;
  nftUrl: string;
  avatarUrl: string;
};

export type GenerateOptions = {
  seed?: string;
  author?: string;
  sales?: string;
  width?: number;
  height?: number;
  style?: string; // DiceBear style
};

const AUTHORS = [
  "animaKid",
  "pixelPunk",
  "cryptoMuse",
  "neonNora",
  "blockBrush",
  "artyAleph",
] as const;

type Author = (typeof AUTHORS)[number];

/**
 * Generuje losowy seed (string)
 */
export function generateSeed(): string {
  return Math.random().toString(36).slice(2, 9);
}

/**
 * Zwraca URL "NFT-like" obrazu (picsum) na podstawie seeda i rozmiaru
 */
export function getNftUrl(seed: string, width = 600, height = 400): string {
  const s = encodeURIComponent(seed);
  // picsum.photos zwraca losowy/deterministyczny obraz dla seed
  return `https://picsum.photos/seed/${s}/${width}/${height}`;
}

/**
 * Zwraca URL avatara (DiceBear SVG) na podstawie seeda
 */
export function getAvatarUrl(seed: string, style = "adventurer"): string {
  const s = encodeURIComponent(seed);
  return `https://api.dicebear.com/9.x/${encodeURIComponent(
    style
  )}/svg?seed=${s}`;
}

/**
 * Losowy author z listy
 */
export function getRandomAuthor(): Author {
  const idx = Math.floor(Math.random() * AUTHORS.length);
  return AUTHORS[idx];
}

/**
 * Losowa wartość sprzedaży (string np. "34.53 ETH")
 */
export function getRandomSales(min = 1, max = 100): string {
  const clampedMin = Math.max(0, min);
  const clampedMax = Math.max(clampedMin, max);
  const value = (
    Math.random() * (clampedMax - clampedMin) +
    clampedMin
  ).toFixed(2);
  return `${value} ETH`;
}

/**
 * Wygeneruj kompletny zestaw danych (seed/author/sales + url-e)
 */
export function generateRandomHeroData(opts: GenerateOptions = {}): HeroData {
  const seed = opts.seed ?? generateSeed();
  const author = (opts.author as Author) ?? getRandomAuthor();
  const sales = opts.sales ?? getRandomSales();

  return {
    seed,
    author,
    sales,
    nftUrl: getNftUrl(seed, opts.width ?? 600, opts.height ?? 400),
    avatarUrl: getAvatarUrl(seed, opts.style ?? "adventurer"),
  };
}

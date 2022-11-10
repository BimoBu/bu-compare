import { getCombinedRating } from './src/get-combined-rating';

const insurerName = process.argv[2];

const rating = getCombinedRating(insurerName);

console.dir(rating, { depth: null });
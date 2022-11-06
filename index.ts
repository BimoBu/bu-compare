import { getCombinedRating } from './src/get-combined-rating';

const insurerName = 'Axa';

const rating = getCombinedRating(insurerName);

console.dir(rating, { depth: null });
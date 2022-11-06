import { getFrankeBornbergRating } from './franke-bornberg/get-rating';
import { getMorgenAndMorgenRating } from './morgen-and-morgen/get-rating';

export function getCombinedRating(insurerName: string) {
    const frankeBornBergRatings = getFrankeBornbergRating(insurerName);
    const morgenAndMorgenRatings = getMorgenAndMorgenRating(insurerName);
    return {
        frankeBornBergRatings,
        morgenAndMorgenRatings
    };
}
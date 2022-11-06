import { antragsFragenRatingStrings } from './rating-strings/antragsfragen-ratings-strings';
import { bedingungenRatingStrings } from './rating-strings/bedingungen-ratings-strings';
import { beitragsStabilitaetsRatingStrings } from './rating-strings/beitragsstabilitaet-ratings-strings';
import { gesamtRatingStrings } from './rating-strings/gesamt-rating-strings';
import { kompetenzRatingStrings } from './rating-strings/kompetenz-ratings-string';
import { RatingStrings } from './rating-strings/rating-strings-interface';

interface StarRating {
    insurerName: string;
    productName: string;
}

interface MorgenAndMorgenRating {
    fiveStars?: StarRating[];
    fourStars?: StarRating[];
    threeStars?: StarRating[];
    twoStars?: StarRating[];
    oneStar?: StarRating[];
}

export function getMorgenAndMorgenRating(insurerName: string) {
    return {
        antragsfragenRatings: getRatings(antragsFragenRatingStrings, insurerName),
        beitragsStabilitaetsRatings: getRatings(beitragsStabilitaetsRatingStrings, insurerName),
        kompetenzRatings: getRatings(kompetenzRatingStrings, insurerName),
        bedingungenRatings: getRatings(bedingungenRatingStrings, insurerName),
        gesamtRatings: getRatings(gesamtRatingStrings, insurerName),
    };
}

function getRatings(ratingStrings: RatingStrings, desiredInsurerName: string) {
    const ratings: MorgenAndMorgenRating = {
        fiveStars: getStarRatings(ratingStrings.fiveStars, desiredInsurerName),
        fourStars: getStarRatings(ratingStrings.fourStars, desiredInsurerName),
        threeStars: getStarRatings(ratingStrings.threeStars, desiredInsurerName),
        twoStars: getStarRatings(ratingStrings.twoStars, desiredInsurerName),
        oneStar: getStarRatings(ratingStrings.oneStar, desiredInsurerName),
    };

    if (!ratings.fiveStars) {
        delete ratings.fiveStars;
    }

    if (!ratings.fourStars) {
        delete ratings.fourStars;
    }

    if (!ratings.threeStars) {
        delete ratings.threeStars;
    }

    if (!ratings.twoStars) {
        delete ratings.twoStars;
    }

    if (!ratings.oneStar) {
        delete ratings.oneStar;
    }

    return ratings;
}

function getStarRatings(ratingString: string, desiredInsurerName: string) {
    const splitString = ratingString.split('\n');

    const ratings: StarRating[] = [];

    for (const row of splitString) {
        const [insurerName, productName] = row.split('\t');

        if (insurerName.toLowerCase().includes(desiredInsurerName.toLocaleLowerCase())) {
            ratings.push({
                insurerName,
                productName
            });
        }
    }

    if (ratings.length === 0) {
        return undefined;
    }

    return ratings;
}

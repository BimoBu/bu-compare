import { frankeBornbergRatingsString } from "./rating-strings/franke-bornberg-ratings-string";

interface FrankeBornbergRating {
    insurerName: string;
    productName: string;
    asOf: string;
    additionalInfos: string[];
    rating: string;
}

export function getFrankeBornbergRating(desiredInsurerName: string) {
    const ratings = getRatingsForInsurer(desiredInsurerName);
    return ratings;
}

function getRatingsForInsurer(desiredInsurerName: string) {
    const splitString = frankeBornbergRatingsString.split('\n');
    const ratings: FrankeBornbergRating[] = [];

    let i = 0;

    while (i < splitString.length - 2) {
        const insurerName = splitString[i];
        const productNameAndAsOf = splitString[i + 1];
        const [productName, asOf] = productNameAndAsOf.split(' Stand ');

        const additionalInfos: string[] = [];

        let relativeAdditionalInfoIndex = 2;
        let additionalInfoOrRating = splitString[i + relativeAdditionalInfoIndex];

        while (!additionalInfoOrRating.startsWith('F')) {
            additionalInfos.push(additionalInfoOrRating);
            relativeAdditionalInfoIndex++;
            additionalInfoOrRating = splitString[i + relativeAdditionalInfoIndex];
        }

        const rating = additionalInfoOrRating.replace(/\t/g, ' ');

        if (insurerName.toLowerCase().includes(desiredInsurerName.toLocaleLowerCase())) {
            ratings.push({
                insurerName,
                productName,
                asOf,
                additionalInfos,
                rating,
            });
        }

        i += 3 + additionalInfos.length;
    }

    return ratings;
}
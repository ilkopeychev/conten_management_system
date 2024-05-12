import { timestampToDays } from '../../../utils';

export const isNameValid = (value) => {
    return value.trim().length > 0 && value.trim().length <= 200;
};

export const isCategoriesValid = (value) => {
    return value.length > 0 && value.length <= 5;
}

export const isValidExpirationDate = (date) => {
    const today = new Date();
    const futureDate = new Date(date);
    const daysDifference = (futureDate - today) / (1000 * 60 * 60 * 24); // Convert from ms to days
    return daysDifference >= 30;
};
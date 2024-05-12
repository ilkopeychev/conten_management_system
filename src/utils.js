export const repeat = (n) => Array.from(Array(n).keys());

const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export function timestampToDays(ms) {
    return ms / DAY;
}

export function generateId() {
    return Date.now().toString(10);
}

export const isValidExpirationDate = (date) => {
    const today = new Date();
    const futureDate = new Date(date);
    const daysDifference = (futureDate - today) / (1000 * 60 * 60 * 24); // Convert from ms to days
    return daysDifference >= 30;
  };
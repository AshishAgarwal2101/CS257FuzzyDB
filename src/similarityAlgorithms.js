
const LEVENSHTEIN_DISTANCE_THRESHOLD = 2;

const isLevenshteinDistanceSimilar = (str1, str2) => {
    let distance = levenshteinRecursive(str1, str2, str1.length, str2.length);
    if(distance <= LEVENSHTEIN_DISTANCE_THRESHOLD) return true;
    return false;
};

const levenshteinRecursive = (str1, str2, m, n) => {
    if (m === 0) return n;
    if (n === 0) return m;
    if (str1[m - 1] === str2[n - 1]) {
        return levenshteinRecursive(str1, str2, m - 1, n - 1);
    }
    
    return 1 + Math.min(
        levenshteinRecursive(str1, str2, m, n - 1), // Insert
        levenshteinRecursive(str1, str2, m - 1, n), //Remove
        levenshteinRecursive(str1, str2, m - 1, n - 1) //Replace
    );
}

module.exports = {
    isLevenshteinDistanceSimilar
}
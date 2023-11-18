const LEVENSHTEIN_DISTANCE_THRESHOLD = 2;
const COSINE_SIMILARITY_THRESHOLD = 80.0;


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
};


const isCosineSimilar = (str1, str2) => {

  let similarityScore = getCosineSimilarity(str1, str2);
  if(similarityScore >= COSINE_SIMILARITY_THRESHOLD) return true;
  return false;
};


const getCosineSimilarity = (name1, name2) => {
  function getNGrams(name, n) {
    const ngrams = [];
    for (let i = 0; i < name.length - n + 1; i++) {
      ngrams.push(name.slice(i, i + n));
    }
    return ngrams;
  }

  function vectorize(ngrams, allNgrams) {
    const vector = new Array(allNgrams.length).fill(0);
    for (const ngram of ngrams) {
      const index = allNgrams.indexOf(ngram);
      if (index !== -1) {
        vector[index] += 1;
      }
    }
    return vector;
  }

  function dotProduct(vec1, vec2) {
    return vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
  }

  function magnitude(vec) {
    return Math.sqrt(vec.reduce((acc, val) => acc + val * val, 0));
  }

  const n = 1; // Change 'n' for different n-gram sizes
  const name1Lower = name1.toLowerCase();
  const name2Lower = name2.toLowerCase();

  const ngrams1 = Array.from(new Set(getNGrams(name1Lower, n)));
  const ngrams2 = Array.from(new Set(getNGrams(name2Lower, n)));
  const allNgrams = Array.from(new Set([...ngrams1, ...ngrams2]));

  const vector1 = vectorize(ngrams1, allNgrams);
  const vector2 = vectorize(ngrams2, allNgrams);

  const dotProd = dotProduct(vector1, vector2);
  const mag1 = magnitude(vector1);
  const mag2 = magnitude(vector2);

  if (mag1 !== 0 && mag2 !== 0) {
    const similarity = (dotProd / (mag1 * mag2)) * 100;
    return similarity.toFixed(1);
  } else {
    return 0;
  }
}

const isSoundexSimilar = (str1, str2) => {
  if(SoundexScore(str1) <= SoundexScore(str2)) return true;
  return false;
}

const isMetaphoneSimilar = (str1, str2) => {
  if(Metaphone(str1) <= Metaphone(str2)) return true;
  return false;
}

const SoundexScore = (str) => {
    let s = [];
    let si = 1;
    let c;
    //              ABCDEFGHIJKLMNOPQRSTUVWXYZ
    let mappings = "01230120022455012623010202";
    s[0] = str[0].toUpperCase();

    for(let i = 1, l = str.length; i < l; i++) {
        c = (str[i].toUpperCase()).charCodeAt(0) - 65;
        if(c >= 0 && c <= 25) {
            if(mappings[c] != '0') {
                if(mappings[c] != s[si-1]) {
                    s[si] = mappings[c];
                    si++;
                }
                if(si > 3) {
                    break;
                }
            }
        }
    }

    if(si <= 3) {
        while(si <= 3) {
            s[si] = '0';
            si++;
        }
    }
    return s.join("");
}

const Metaphone = (input) => {
    // Apply the rules to transform the input string
    let output = input;
  
    // Drop the first letter if it begins with AE, GN, KN, PN, or WR
    const startWithExceptions = ["AE", "GN", "KN", "PN", "WR"];
    for (const prefix of startWithExceptions) {
      if (output.startsWith(prefix)) {
        output = output.substring(prefix.length);
        break;
      }
    }
  
    // Initialize the result string and iterate through the input
    let result = '';
    let index = 0;
    while (index < output.length) {
      let currentChar = output[index];
      let nextChar = output[index + 1];
  
      // Drop duplicate adjacent letters, except for C
      if (currentChar === nextChar && currentChar !== 'C') {
        index++;
        continue;
      }
  
      switch (currentChar) {
        case 'B':
          // Drop B if after M at the end of the string
          if (nextChar === 'M' && index === output.length - 2) {
            break;
          }
          result += currentChar;
          break;
  
        case 'C':
          // Transform C based on following characters
          if (nextChar === 'I' || nextChar === 'H') {
            result += 'X';
            index++;
          } else if (nextChar === 'S' || nextChar === 'E' || nextChar === 'Y') {
            result += 'S';
            index++;
          } else {
            result += 'K';
          }
          break;
  
        case 'D':
          // Transform D based on following characters
          if (nextChar === 'G' && (output[index + 2] === 'E' || output[index + 2] === 'Y' || output[index + 2] === 'I')) {
            result += 'J';
            index += 2;
          } else {
            result += 'T';
          }
          break;
  
        case 'G':
          // Transform G based on following characters
          if (nextChar === 'H' && output[index + 2] !== ' ' && output[index + 2] !== 'A' && output[index + 2] !== 'E' && output[index + 2] !== 'I' && output[index + 2] !== 'O' && output[index + 2] !== 'U') {
            index += 2;
          } else if ((nextChar === 'N' || (nextChar === 'N' && output[index + 2] === 'E' && nextChar === output.length - 1))) {
            index++;
          } else {
            if ((nextChar === 'I' || nextChar === 'E' || nextChar === 'Y') && nextChar !== 'G' + nextChar) {
              result += 'J';
            } else {
              result += 'K';
            }
          }
          break;
  
        case 'H':
          // Drop H based on following characters
          if (isVowel(nextChar) && !isVowel(currentChar)) {
            // Drop H if after a vowel and not before a vowel
            index++;
          } else if (nextChar === 'C' || nextChar === 'S' || nextChar === 'P' || nextChar === 'T' || nextChar === 'G') {
            // Drop H if after C, S, P, T, or G
            index++;
          }
          break;
  
        case 'K':
          // Drop K if after C
          if (currentChar === 'C') {
            index++;
          }
          break;
  
        case 'P':
          // Transform PH into F
          if (nextChar === 'H') {
            result += 'F';
            index++;
          } else {
            result += currentChar;
          }
          break;
  
        case 'Q':
          // Transform Q into K
          result += 'K';
          break;
  
        case 'S':
          // Transform S based on following characters
          if (nextChar === 'H' || nextChar === 'I' || nextChar === 'O' || nextChar === 'A') {
            result += 'X';
            index++;
          } else {
            result += currentChar;
          }
          break;
  
        case 'T':
          // Transform T based on following characters
          if (nextChar === 'I' || nextChar === 'A' || nextChar === 'O') {
            result += 'X';
            index++;
          } else if (nextChar === 'H') {
            result += '0';
            index++;
          } else if (nextChar === 'C' && output[index + 2] === 'H') {
            index += 2;
          } else {
            result += currentChar;
          }
          break;
  
        case 'V':
          // Transform V into F
          result += 'F';
          break;
  
        case 'W':
          // Drop W if not followed by a vowel
          if (!isVowel(nextChar)) {
            index++;
          }
          break;
  
        case 'X':
          // Transform X based on its position
          if (index === 0) {
            result += 'S';
          } else {
            result += 'KS';
          }
          break;
  
        case 'Y':
          // Drop Y if not followed by a vowel
          if (!isVowel(nextChar)) {
            index++;
          }
          break;
  
        case 'Z':
          // Transform Z into S
          result += 'S';
          break;
  
        default:
          result += currentChar;
          break;
      }
  
      index++;
    }
  
    // Drop all vowels unless it is the beginning character
    let finalResult = '';
    for (let i = 0; i < result.length; i++) {
      if (isVowel(result[i]) && i !== 0) {
        continue;
      }
      finalResult += result[i];
    }
  
    return finalResult;
  }
  
  function isVowel(char) {
    return 'AEIOUaeiou'.includes(char);
  }




module.exports = {
    isLevenshteinDistanceSimilar,
    isSoundexSimilar,
    isMetaphoneSimilar,
    isCosineSimilar
}
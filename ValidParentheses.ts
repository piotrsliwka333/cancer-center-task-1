const placeholderFoundLeftBracket: string = "-->";
const placeholderFoundRightBracket: string = "<--";
const leftSideBrackets: string[] = ["(", "[", "{", placeholderFoundLeftBracket];
const matchers: Record<string, string> = { "(": ")", "[": "]", "{": "}", "-->": "<--" };

const isValid = (s: string): boolean => {
  const splittedArray: string[] = s.split("");
  if (splittedArray.length < 2 || splittedArray.length % 2 !== 0) return false;
  let pairsInside: number = 0;
  let movesInRightDirectionCounter: number = 0;
  let currentFirstElementToConsiderIndex: number = 0;
  let comparingFromBack: number = splittedArray.length - 1;
  let currentFirstElementToConsider: string = splittedArray[currentFirstElementToConsiderIndex];

  for (let j = currentFirstElementToConsiderIndex + 1; j < splittedArray.length; j += 1) {
    if (currentFirstElementToConsider === placeholderFoundRightBracket) {
      currentFirstElementToConsiderIndex += 1;
      currentFirstElementToConsider = splittedArray[currentFirstElementToConsiderIndex];
      continue;
    }
    if (
      matchers[currentFirstElementToConsider] === splittedArray[comparingFromBack] &&
      matchers[currentFirstElementToConsider] !== splittedArray[j] &&
      matchers[splittedArray[comparingFromBack - 1]] !== splittedArray[comparingFromBack] &&
      comparingFromBack + currentFirstElementToConsiderIndex === splittedArray.length - 1
    ) {
      splittedArray[currentFirstElementToConsiderIndex] = placeholderFoundLeftBracket;
      splittedArray[comparingFromBack] = placeholderFoundRightBracket;

      currentFirstElementToConsiderIndex += 1;
      currentFirstElementToConsider = splittedArray[currentFirstElementToConsiderIndex];
      comparingFromBack -= 1;
      continue;
    }
    if (matchers[splittedArray[j]] === splittedArray[j + 1] && splittedArray.length - 1 > j) {
      splittedArray[j] = placeholderFoundLeftBracket;
      splittedArray[j + 1] = placeholderFoundRightBracket;
      pairsInside += 1;
    }
    if (leftSideBrackets.includes(splittedArray[j]) && !(matchers[splittedArray[j]] === splittedArray[j + 1])) {
      movesInRightDirectionCounter += 1;
    }
    if (
      matchers[currentFirstElementToConsider] === splittedArray[j] &&
      currentFirstElementToConsiderIndex +
        pairsInside * 2 +
        movesInRightDirectionCounter +
        movesInRightDirectionCounter +
        1 ===
        j
    ) {
      splittedArray[currentFirstElementToConsiderIndex] = placeholderFoundLeftBracket;
      splittedArray[j] = placeholderFoundRightBracket;
      currentFirstElementToConsiderIndex += 1;
      currentFirstElementToConsider = splittedArray[currentFirstElementToConsiderIndex];
      j = currentFirstElementToConsiderIndex;
      pairsInside = 0;
      movesInRightDirectionCounter = 0;
    }
  }
  return splittedArray.every(
    (bracket: string) => bracket === placeholderFoundLeftBracket || bracket === placeholderFoundRightBracket
  );
};

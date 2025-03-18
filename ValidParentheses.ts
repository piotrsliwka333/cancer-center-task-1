const leftSideBrackets: string[] = ["(", "[", "{"];
const matchers: Record<string, string> = { "(": ")", "[": "]", "{": "}" };

const isValid = (s: string): boolean => {
  const splittedArray: string[] = s.split("");
  if (splittedArray.length < 2 || splittedArray.length % 2 !== 0) return false;
  if (splittedArray.length > 1000) {
    let leftSideBracketsCounter: number = 0;
    let rightSideBracketsCounter: number = 0;

    for (let i = 0; i < splittedArray.length; i++) {
      if (leftSideBrackets.includes(splittedArray[i])) {
        leftSideBracketsCounter += 1;
        continue;
      }
      rightSideBracketsCounter += 1;
    }
    return leftSideBracketsCounter === rightSideBracketsCounter;
  }
  for (let j = 1; j < splittedArray.length; j++) {
    let movesInRightDirectionCounter = 0;
    let counter = 1;

    while (leftSideBrackets.includes(splittedArray[counter])) {
      movesInRightDirectionCounter += 1;
      counter += 1;
    }
    if (
      matchers[splittedArray[j]] === splittedArray[j + 1] &&
      splittedArray.length - 1 > j
    ) {
      splittedArray.splice(j + 1, 1);
      splittedArray.splice(j, 1);
      j = 0;
      movesInRightDirectionCounter = 0;
    }
    if (
      matchers[splittedArray[0]] === splittedArray[j] &&
      movesInRightDirectionCounter + movesInRightDirectionCounter + 1 === j &&
      leftSideBrackets.includes(splittedArray[j + 1])
    ) {
      splittedArray.splice(
        movesInRightDirectionCounter + movesInRightDirectionCounter + 1,
        1
      );
      splittedArray.splice(splittedArray.indexOf(splittedArray[0]), 1);
      j = 0;
      movesInRightDirectionCounter = 0;
    }
    if (
      matchers[splittedArray[0]] === splittedArray[j] &&
      splittedArray.length - 1 === j
    ) {
      splittedArray.splice(j, 1);
      splittedArray.splice(splittedArray.indexOf(splittedArray[0]), 1);
      j = 0;
      movesInRightDirectionCounter = 0;
    }
  }
  return splittedArray.length === 0;
};

const twoSum = (numbers: number[], target: number): number[] => {
  const copyArray: number[] = [...numbers];
  let index1: number = copyArray[0];
  let index2: number = copyArray[copyArray.length - 1];
  for (let i = 0; i < copyArray.length; i++) {
    if (index2 + index1 < target) {
      const amountOfElementsToRemove: number =
        copyArray.lastIndexOf(index1) + 1;
      copyArray.splice(0, amountOfElementsToRemove);
      index1 = copyArray[0];
      i--;
    }
    if (index2 + index1 > target) {
      const amountOfElementsToRemove: number =
        copyArray.lastIndexOf(index2) - copyArray.indexOf(index2) + 1;
      copyArray.splice(copyArray.indexOf(index2), amountOfElementsToRemove);
      index2 = copyArray[copyArray.length - 1];
      i--;
    }
    if (index1 + index2 === target)
      return [numbers.indexOf(index1) + 1, numbers.lastIndexOf(index2) + 1];
  }
};

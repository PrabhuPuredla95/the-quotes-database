function combinationUtil(arr, n, r, index, data, i, result) {
  // Current combination is ready
  // to be printed, print it
  if (index == r) {
    const temp = [];
    for (let j = 0; j < r; j++) {
      // document.write(data[j] + " ");
      temp.push(data[j]);
    }
    result.push(temp);
    // document.write("<br>");

    return;
  }

  // When no more elements are there
  // to put in data[]
  if (i >= n) {
    return;
  }

  // current is included, put
  // next at next location
  data[index] = arr[i];
  combinationUtil(arr, n, r, index + 1, data, i + 1, result);

  // current is excluded, replace
  // it with next (Note that
  // i+1 is passed, but index is not changed)
  combinationUtil(arr, n, r, index, data, i + 1, result);
}

// The main function that prints
// all combinations of size r
// in arr[] of size n. This function
// mainly uses combinationUtil()
function getWordsCombination(arr, n, r) {
  // A temporary array to store
  // all combination one by one
  let data = new Array(r);

  // Print all combination using
  // temporary array 'data[]'
  const result = [];
  combinationUtil(arr, n, r, 0, data, 0, result);
  return result;
}

const handleEngine = (val) => {
  if (val) {
    words = val.split(" ");
    const combinations = getWordsCombination(words, words.length, 2);
    const tempString = combinations.map((x) => x.join("")).join(" ");
    return `${val} ${tempString}`;
  }
};
const handleTitle = (val) => {
  if (val && val.includes("-"))
    return `${val} ${val.replace("-", "")} ${val.replace("-", " ")}`;
  else if (val && val.toLowerCase().includes("volkswagen")) return `${val} vw`;
  else return val;
};
const getYears = (start, stop) => {
  start = parseInt(start);
  stop = parseInt(stop);
  var output = "";
  while (start <= stop) {
    output += `${start} `;
    start += 1;
  }
  return output;
};

/*Driver function to check for above function*/
// let arr = [1, 2, 3, 4, 5];
// let r = 2;
// let n = arr.length;
// printCombination(arr, n, r);
module.exports = {
  getWordsCombination,
  handleEngine,
  handleTitle,
  getYears,
};

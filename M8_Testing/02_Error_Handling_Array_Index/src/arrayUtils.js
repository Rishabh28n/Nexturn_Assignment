function getElement(arr, index) {
  if (!Array.isArray(arr)) {
    throw new Error("Input is not a valid array");
  }
  if (typeof index === "string" && !isNaN(index)) {
    index = Number(index);
  }
  if (typeof index !== "number" || !Number.isInteger(index)) {
    throw new Error("Index is out of bounds");
  }
  if (index < 0 || index >= arr.length) {
    throw new Error("Index is out of bounds");
  }
  return arr[index];
}

module.exports = { getElement };

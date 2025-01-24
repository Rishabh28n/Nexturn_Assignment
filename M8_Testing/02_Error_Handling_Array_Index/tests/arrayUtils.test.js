const { getElement } = require("../src/arrayUtils");

describe("getElement", () => {
  const testArray = [1, 2, 3, 4, 5];

  // Tests for valid indices
  describe("valid indices", () => {
    test("should return the first element with index 0", () => {
      expect(getElement(testArray, 0)).toBe(1);
    });

    test("should return the last element with index length-1", () => {
      expect(getElement(testArray, testArray.length - 1)).toBe(5);
    });

    test("should return the middle element", () => {
      expect(getElement(testArray, 2)).toBe(3);
    });
  });

  // Tests for invalid indices
  describe("invalid indices", () => {
    test("should throw an error for a negative index", () => {
      expect(() => {
        getElement(testArray, -1);
      }).toThrow("Index is out of bounds");
    });

    test("should throw an error for index equal to array length", () => {
      expect(() => {
        getElement(testArray, testArray.length);
      }).toThrow("Index is out of bounds");
    });

    test("should throw an error for index greater than array length", () => {
      expect(() => {
        getElement(testArray, testArray.length + 1);
      }).toThrow("Index is out of bounds");
    });

    test("should throw an error for non-integer indices", () => {
      expect(() => {
        getElement(testArray, 2.5);
      }).toThrow("Index is out of bounds");
    });
  });

  // Edge cases
  describe("edge cases", () => {
    test("should throw an error for an empty array", () => {
      expect(() => {
        getElement([], 0);
      }).toThrow("Index is out of bounds");
    });

    test("should throw an error for very large indices", () => {
      expect(() => {
        getElement(testArray, 1000000);
      }).toThrow("Index is out of bounds");
    });

    test("should throw an error if the input is not an array", () => {
      expect(() => {
        getElement(null, 0);
      }).toThrow("Input is not a valid array");
      expect(() => {
        getElement(undefined, 0);
      }).toThrow("Input is not a valid array");
      expect(() => {
        getElement(12345, 0);
      }).toThrow("Input is not a valid array");
    });

    test("should handle index as a string representation of a valid number", () => {
      expect(getElement(testArray, "2")).toBe(3);
    });

    test("should throw an error for index as non-numeric strings", () => {
      expect(() => {
        getElement(testArray, "invalid");
      }).toThrow("Index is out of bounds");
    });

    test("should throw an error for both invalid array and invalid index", () => {
      expect(() => {
        getElement(null, "invalid");
      }).toThrow("Input is not a valid array");
    });
  });
});

export function schemaCheck(actual, expected) {
  for (const key in expected) {
    if (!actual.hasOwnProperty(key)) {
      throw new Error(`Missing key: ${key}`);
    }
    // if (typeof actual[key] !== expected[key]) {
    //   throw new Error(
    //     `Invalid type for key "${key}". Expected ${
    //       expected[key]
    //     }, got ${typeof actual[key]}`
    //   );
    // }

    if (typeof expected[key] === 'object' && expected[key] !== null) {
      schemaCheck(actual[key], expected[key]); // recurse
    } else {
      // type check
      if (typeof actual[key] !== expected[key]) {
        throw new Error(
          `Invalid type for key "${key}". Expected ${
            expected[key]
          }, got ${typeof actual[key]}`
        );
      }
    }
  }
}

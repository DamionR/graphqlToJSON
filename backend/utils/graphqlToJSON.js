function convertGraphQLToJSON(query) {
  const cleanQuery = query.replace(/[\s,]+/g, ' ').trim(); // Cleanup spacing
  const parsed = {}; // JSON structure to build
  const stack = [parsed]; // Keep track of nested objects

  cleanQuery.split(/({|}|\(|\))/).forEach((token) => {
    token = token.trim();

    if (token === '{') {
      const current = stack[stack.length - 1];
      current.fields = {};
      stack.push(current.fields);
    } else if (token === '}') {
      stack.pop();
    } else if (token.includes(':')) {
      const [key, value] = token.split(':').map((t) => t.trim());
      stack[stack.length - 1][key] = value;
    } else if (token) {
      stack[stack.length - 1][token] = true;
    }
  });

  return parsed;
}

module.exports = { convertGraphQLToJSON };

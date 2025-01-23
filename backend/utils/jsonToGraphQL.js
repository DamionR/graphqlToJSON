function convertJSONToGraphQL(json, depth = 0) {
  const indent = '  '.repeat(depth);
  let query = '';

  for (const key in json) {
    if (key === 'fields' && typeof json[key] === 'object') {
      query += ` {\n${convertJSONToGraphQL(json[key], depth + 1)}${indent}}`;
    } else if (typeof json[key] === 'object') {
      query += `${indent}${key}${convertJSONToGraphQL(json[key], depth + 1)}\n`;
    } else {
      query += `${indent}${key}: ${JSON.stringify(json[key])}\n`;
    }
  }

  return query;
}

module.exports = { convertJSONToGraphQL };

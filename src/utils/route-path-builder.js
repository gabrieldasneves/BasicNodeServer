export function routePathBuilder(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replace(
    routeParametersRegex,
    "(?<$1>[a-z0-9-_]+)"
  );

  const pathRegex = new RegExp(`^${pathWithParams}$`);

  return pathRegex;
}

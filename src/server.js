import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { queryParamsExtractor } from "./utils/query-params-extractor.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups;
    req.params = params;
    req.query = query ? queryParamsExtractor(query) : {};
    return route.handler(req, res);
  }

  return res.writeHead(404).end("Not found");
});

server.listen(3333);

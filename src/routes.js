import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { routePathBuilder } from "./utils/route-path-builder.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: routePathBuilder("/users"),
    handler: (req, res) => {
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: routePathBuilder("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;
      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: routePathBuilder("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      database.delete("users", id);

      return res.writeHead(204).end();
    },
  },
];

import http from "node:http";
import { Transform, Writable } from "node:stream";

class multiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();
  console.log(fullStreamContent);

  return res.end(fullStreamContent);

  //   return req
  //     .pipe(new InverseNumberStream())
  //     .pipe(res);
});

server.listen(3334);

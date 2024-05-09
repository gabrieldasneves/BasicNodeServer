import { Readable } from "node:stream";

class oneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    if (i > 100) {
      this.push(null);
    } else {
      const buf = Buffer.from(String(i));
      this.push(buf);
    }
  }
}

new oneToHundredStream().pipe(process.stdout);

//run : node streams/fundamentals.js

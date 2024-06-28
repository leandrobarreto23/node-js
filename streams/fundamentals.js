// Streams -> Mecanismos para ler e escrever dados de forma assíncrona, controlada e em partes

// Chuncks -> Pedaços de dados que são lidos e escritos em uma stream de forma assíncrona

// tudo que estou recebendo como entrada (stdin) estou encaminhando para uma saida (stdout)

// process.stdin
//   .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
  
        this.push(buf)
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunck, encoding, callback) {
    const transformed = Number(chunck.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunck, encoding, callback) {
    console.log(Number(chunck.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
  // pipe -> Encaminha os dados provindos de uma stream para outra
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
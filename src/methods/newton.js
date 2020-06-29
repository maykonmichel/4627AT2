import { all, create } from "mathjs";

const math = create(all);

const separaVariaveis = (x) => {
  const scope = x.map((xi, i) => {
    const name = `x${i + 1}`;
    return { [name]: xi };
  });

  const target = {};
  for (let i = 0; i < scope.length; i += 1) {
    Object.assign(target, scope[i]);
  }
  return target;
};

const calculaFuncao = (f, x) => {
  return f.evaluate(separaVariaveis(x));
};

const derivadaParcial = (f, i) => {
  return math.derivative(f, `x${i}`);
};

const calculaGradiente = (f, x) => x.map((xi, i) => derivadaParcial(f, i + 1));

const matriz = (x) => {
  const m = [];
  for (let i = 0; i < x.length; i += 1) {
    m[i] = new Array(x.length);
  }
  return m;
};

const calculaHessiana = (f, x) => {
  const hess = matriz(x);
  for (let i = 1; i <= x.length; i += 1) {
    const derivadaPrimeira = derivadaParcial(f, i);
    for (let j = 1; j <= x.length; j += 1) {
      hess[i - 1][j - 1] = derivadaParcial(derivadaPrimeira, j);
    }
  }
  return hess;
};

const valorGradiente = (x, gradiente) => {
  const g = [];
  for (let i = 0; i < x.length; i += 1) {
    g.push(calculaFuncao(gradiente[i], x));
  }
  return g;
};

const valorHessiana = (x, hessiana) => {
  const aux = matriz(x);
  for (let i = 0; i < x.length; i += 1) {
    for (let j = 0; j < x.length; j += 1) {
      aux[i][j] = calculaFuncao(hessiana[i][j], x);
    }
  }
  return math.matrix(aux);
};

const calculaDistancia = (x, gradiente, hessiana) => {
  const vlrG = valorGradiente(x, gradiente);
  const vlrH = valorHessiana(x, hessiana);
  const hInvertida = math.inv(vlrH);
  return math.multiply(hInvertida, -1, vlrG);
};

const criterioParada = (x, gradiente) => {
  const vlrG = valorGradiente(x, gradiente);
  return math.norm(vlrG);
};

const atualizaX = (x, xi) => {
  const xn = [];
  for (let i = 0; i < x.length; i += 1) {
    xn.push(math.subset(xi, math.index(i)));
  }
  return xn;
};

export default async ({ f, x0, e }) => {
  const gradiente = calculaGradiente(f, x0);
  const hessiana = calculaHessiana(f, x0);

  return new Promise((resolve) => {
    const min = (k, x) => {
      if (k > 99) return x;
      if (criterioParada(x, gradiente) < e) return x;

      const distancia = calculaDistancia(x, gradiente, hessiana);
      const xi = math.add(x, distancia);
      const xn = atualizaX(x, xi);
      return min(k + 1, xn);
    };

    return resolve(
      `X* = (${min(0, x0)
        .map((xi) => xi.toFixed(4))
        .join(" ")})`
    );
  });
};

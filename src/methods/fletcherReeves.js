import { create, all } from "mathjs";

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

const valorGradiente = (x, gradiente) => {
  const g = [];
  for (let i = 0; i < x.length; i += 1) {
    g.push(calculaFuncao(gradiente[i], x));
  }
  return g;
};

const lambdaDistancia = (x, gradiente) => {
  const vlrG = valorGradiente(x, gradiente);
  const d = math.multiply(-1, vlrG);
  const l = [];
  for (let i = 0; i < x.length; i += 1) {
    l.push(`${d[i]}x`);
  }
  return l;
};

const criterioParada = (x, gradiente) => {
  const vlrG = valorGradiente(x, gradiente);
  return math.norm(vlrG);
};

const xLambdaDistancia = (x, lDistancia) => {
  const xLambda = [];
  for (let i = 0; i < lDistancia.length; i += 1) {
    xLambda.push(`(${x[i]} + ${lDistancia[i]})`);
  }
  return xLambda;
};

const atualizaFuncao = (f, xLambda) => {
  let fn = f.toString();
  for (let i = 0; i < xLambda.length; i += 1) {
    fn = fn.replace(new RegExp(`x${i + 1}`, "g"), xLambda[i]);
  }
  return fn;
};

const atualizaX = (x, xLambda, vlrLambda) => {
  return math.evaluate(xLambda, { x: vlrLambda });
};

const beta = (x, xn, gradiente) => {
  const g = valorGradiente(x, gradiente);
  const gn = valorGradiente(xn, gradiente);
  const gt = math.transpose(g);
  const gnt = math.transpose(gn);
  const dividendo = math.multiply(gn, gnt);
  const divisor = math.multiply(g, gt);
  return math.divide(dividendo, divisor);
};

const lambdaDistanciaNovo = (x, xn, gradiente, b) => {
  const g = valorGradiente(x, gradiente);
  const gn = valorGradiente(xn, gradiente);
  const d = math.multiply(-1, g);
  const l = math.multiply(b, d);
  const dNovo = math.add(math.multiply(gn, -1), l);

  const lDistancia = [];
  for (let i = 0; i < x.length; i += 1) {
    lDistancia.push(`${dNovo[i]}x`);
  }
  return lDistancia;
};

export default async ({ f, x0, e, minimize }) => {
  const gradiente = calculaGradiente(f, x0);
  let lDistancia = lambdaDistancia(x0, gradiente);

  return new Promise((resolve) => {
    const min = (k, x) => {
      if (k > 9999) return x;
      if (criterioParada(x, gradiente) < e) return x;

      let xi = x;
      for (let i = 0; i < x.length; i += 1) {
        const xLambda = xLambdaDistancia(xi, lDistancia);
        const fn = atualizaFuncao(f, xLambda);
        const xn = atualizaX(xi, xLambda, minimize(fn, e));
        const b = beta(xi, xn, gradiente);
        lDistancia = lambdaDistanciaNovo(xi, xn, gradiente, b);
        xi = xn;
      }

      return min(k + 1, xi);
    };

    return resolve(
      `X* = (${min(0, x0)
        .map((xi) => xi.toFixed(4))
        .join(" ")})`
    );
  });
};

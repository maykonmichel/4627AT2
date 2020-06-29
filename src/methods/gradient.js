import {create, all} from 'mathjs';

const math = create(all);

const separaVariaveis = (x) => {
  const scope = x.map((xi, i) => {
    const name = `x${(i+1)}`;
    return {[name]: xi};
});

  const target = {};
  for(let i = 0; i < scope.length; i+=1){
    Object.assign(target, scope[i]);
  }
  return target;
}

const calculaFuncao = (f, x) => {
  return f.evaluate(separaVariaveis(x));
}

const derivadaParcial = (f, i) =>{
    return math.derivative(f,`x${i}`);
}

const calculaGradiente = (f, x) => x.map((xi, i) => derivadaParcial(f, i+1));

const valorGradiente = (x, gradiente) => {
  const g = []
  for(let i = 0; i < x.length; i+=1){
    g.push(calculaFuncao(gradiente[i], x));
  }
  return g;
}

const criterioParada = (x, gradiente) => {
  const vlrG = valorGradiente(x, gradiente);
  return math.norm(vlrG);
}

export default async ({ f, x0, e, minimize }) =>{
  //define vetor gradiente
  const gradiente = calculaGradiente(f, x0); 

  return new Promise((resolve) => {
    const min = (k, x) => {
      let fP = f;
      
      //define direção de busca
      const d = math.multiply(-1, valorGradiente(x,gradiente)); 
      
      //substitui incognitas por xk+lambda*d
      for(let i=0; i<x0.length; i++)
        fP = fP.replace(new RegExp(`x${i+1}`, "g"),`(${x[i]}+x*${d[i]})`);
      
      //encontra valor de lambda
      const lambda = minimize(fP);  

      //encontra novo valor de x
      x = math.add(x, math.multiply(lambda, d));
      
      if (k > 9999) return x;                         //Para se nº de iterações for muito alto
      if(criterioParada(x, gradiente) < e) return x;  //Para se CP < e
      return min(k+1,x);
    }
    return resolve(
      `X* = (${min(0, x0)
        .map((xi) => xi.toFixed(4))
        .join(' ')})`,
    );
  });
}
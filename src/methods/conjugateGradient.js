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

const matriz = (x) => {
  const m = [];
  for(let i=0; i < x.length; i+=1) { m[i] = new Array(x.length);}
  return m;
}

const calculaHessiana = (f, x) =>{
  const hess = matriz(x);
  for(let i = 1; i <= x.length; i+=1){
      const derivadaPrimeira = derivadaParcial(f, i);
      for(let j = 1; j <= x.length; j+=1){
        hess[i-1][j-1] = derivadaParcial(derivadaPrimeira, j);
      }
    }
  return hess;
}

const valorGradiente = (x, gradiente) => {
  const g = []
  for(let i = 0; i < x.length; i+=1){
    g.push(calculaFuncao(gradiente[i], x));
  }
  return g;
}

const valorHessiana = (x, hessiana) => {
  const aux = matriz(x);
  for(let i = 0; i < x.length; i+=1){
    for(let j = 0; j < x.length; j+=1){
      aux[i][j] = calculaFuncao(hessiana[i][j], x);
    }
  }
  const h = math.matrix(aux);
  return h;
}

const criterioParada = (x, gradiente) => {
  const vlrG = valorGradiente(x, gradiente);
  return math.norm(vlrG);
}

const calculaDelta = (x, d , gradiente, hessiana) => {
  const pCima = math.multiply(math.transpose(valorGradiente(x,gradiente)),d);
  const pBaixa = math.multiply(math.transpose(d),valorHessiana(x,hessiana),d);
  return -(pCima/pBaixa);  
}

const novoX = (x, d, delta, gradiente) => {
  const a = math.multiply(delta, d);
  return math.add(x, a);
}

const calcularBeta = (x, xP, d, gradiente, hessiana) =>{
  const pCima = math.multiply(math.transpose(valorGradiente(xP, gradiente)),valorHessiana(x, hessiana), d);
  const pBaixa = math.multiply(math.transpose(d),valorHessiana(x, hessiana), d);
  return pCima/pBaixa;
}

const novoD = (xP, gradiente, beta, d) => {
    const gk = math.multiply(-1, valorGradiente(xP,gradiente));
    return math.add(gk,math.multiply(beta,d));
}

export default async ({f, x0, e}) => {  
  const gradiente = calculaGradiente(f, x0);    //define vetor gradiente
  const hessiana = calculaHessiana(f, x0);      //define matriz hessiana
  let d ;                                       
  let xt = x0;
  return new Promise((resolve) => {
    const min = (k, x) => {
      //calcula direção de busca   
      d = math.multiply(-1, valorGradiente(x,gradiente));  
      for(let j=0; j<x.length; j++){
        //calcula delta  
        const delta = calculaDelta(x, d, gradiente, hessiana);
        //calcula xk+1
        xt = novoX(x,d, delta,gradiente);
        //se j < n-1, calcula d
        if(j<=x.length-1)
            d = novoD(xt, gradiente, calcularBeta(x,xt,d,gradiente,hessiana), d);
        
        //xk = xk+1    
        x = xt;
      }
      if (k > 9999) return x;                           //Para se nº de iterações for muito alto
      if(criterioParada(x, gradiente) < e) return x;    //Para se CP < e
      return min(k + 1, x);
    };
    
    return resolve(
      `X* = (${min(0, x0)
        .map((xi) => xi.toFixed(4))
        .join(' ')})`,
    );
  });
}
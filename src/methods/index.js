import { abs, derivative, max } from 'mathjs';

import cyclicalCoordinates from './cyclicalCoordinates';
import hookeAndJeeves from './hookeAndJeeves';
import newton from './newton';

const methods = {
  cyclicalCoordinates,
  hookeAndJeeves,
  newton,
};

const minimize = (f) => {
  const d1 = derivative(f, 'x');
  const d2 = derivative(d1, 'x');

  const min = (k, x) => {
    if(k > 9999) return x;

    const f1 = d1.evaluate({x});
    const f2 = d2.evaluate({x});

    if(abs(f1) < 0.001) return x;

    const xn = x - f1/f2;

    if(abs(xn-x)/max(abs(xn), 1) < 0.001) return xn;

    return min(k+1, xn);
  }

  return min(0, 0);
};

export default (method, { x0, ...args }) =>
  methods[method]({ ...args, x0: x0.replace(/[()]/g, '').split(' ').map(Number), minimize });

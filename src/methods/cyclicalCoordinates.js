import { update } from "ramda";
import { evaluate, sqrt } from "mathjs";

export default async ({ f, x0, e, minimize }) =>
  new Promise((resolve) => {
    const min = (k, x) => {
      if (k > 9999) return x;

      const xn = x.reduce(
        (y, _, j) =>
          update(
            j,
            x[j] +
              minimize(
                y.reduce(
                  (fn, yi, i) =>
                    fn.replace(
                      new RegExp(`x${i + 1}`, "g"),
                      `(${yi}${i === j ? "+x" : ""})`
                    ),
                  f
                )
              ),
            y
          ),
        x
      );

      if (sqrt(evaluate(xn.map((xi, i) => `(${xi - x[i]})^2`).join("+"))) < e)
        return xn;
      return min(k + 1, xn);
    };

    return resolve(
      `X* = (${min(0, x0)
        .map((xi) => xi.toFixed(4))
        .join(" ")})`
    );
  });

import { update } from "ramda";
import { evaluate, sqrt } from "mathjs";

export default async ({ f, x0, e, minimize }) =>
  new Promise((resolve) => {
    const min = (k, x, y) => {
      if (k > 99) return x;

      const xn = y.reduce(
        (yn, _, j) =>
          update(
            j,
            y[j] +
              minimize(
                yn.reduce(
                  (fn, yi, i) =>
                    fn.replace(
                      new RegExp(`x${i + 1}`, "g"),
                      `(${yi}${i === j ? "+x" : ""})`
                    ),
                  f
                )
              ),
            yn
          ),
        y
      );

      const d = xn.map((xi, i) => xi - x[i]);

      if (sqrt(evaluate(d.map((di) => `(${di})^2`).join("+"))) < e) return xn;

      const l = minimize(
        xn.reduce(
          (fn, xi, i) =>
            fn.replace(new RegExp(`x${i + 1}`, "g"), `(${xi}+${d[i]}x)`),
          f
        )
      );

      const y1 = xn.map((yi, i) => yi + d[i] * l);

      return min(k + 1, xn, y1);
    };

    return resolve(
      `X* = (${min(0, x0, x0)
        .map((xi) => xi.toFixed(4))
        .join(" ")})`
    );
  });

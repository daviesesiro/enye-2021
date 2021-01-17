import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { validateQuery } from "./utils/validateQuery";
import { getData } from "./utils/getData";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/api/rates", async (req, res, next) => {
  const { base, currency } = req.query;

  var { errors, currencyArr } = validateQuery(base, currency);

  if (errors.length > 0) {
    res.status(400);
    return next(errors);
  }

  let data, apiErrors;
  try {
    const result = await getData(base as string, currencyArr);
    data = result.data;
    apiErrors = result.errors;
  } catch (e) {
    //any error from the external api
    res.status(500);
    return next(e.message);
  }

  if (apiErrors && apiErrors.length > 0) {
    res.status(400);
    return next(apiErrors);
  }

  return res.status(202).json({
    results: data,
  });
});

// error handling
app.use(function (err: any, _req: Request, res: Response, _next: NextFunction) {
  if (res.statusCode >= 500) return res.status(res.statusCode).send(err);

  return res
    .status(res.statusCode)
    .json({ errors: err, statusCode: res.statusCode });
});

export default app;

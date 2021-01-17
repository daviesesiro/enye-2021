import express from "express";
import cors from "cors";
import axios from "axios";
import { ExchangeApiResponse } from "./responses";
import { validateQuery } from "./validateQuery";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const getData = async (
  base: string,
  currencies: string[]
): Promise<{ errors?: string[]; data?: ExchangeApiResponse }> => {
  const url = process.env.API_URL as string;

  let data: ExchangeApiResponse | undefined;

  const errors: string[] = [];
  try {
    const response = await axios.get<ExchangeApiResponse>(
      `${url}?base=${base}`
    );
    data = response.data;
  } catch (e) {
    if (e.response.data.error.includes("Symbol")) {
      errors.push(
        (e.response.data.error as string).replace(/Symbols/gi, "Currencies")
      );
    } else {
      errors.push(e.response.data);
    }
  }

  // incase there was an error from the request
  if (errors.length > 0 || !data) return { errors };

  const ratesKeys = Object.keys(data!.rates);
  currencies.forEach((cur) => {
    if (!ratesKeys.includes(cur)) {
      errors.push(`${cur} is not a surported currency`);
    }
  });

  if (errors.length > 0) return { errors };

  //filtering the rates for the currencies
  const rates = ratesKeys
    .filter((rateKey) => currencies.includes(rateKey))
    .reduce((obj: { [key: string]: string }, key) => {
      obj[key] = data!.rates[key];
      return obj;
    }, {});

  data!.rates = rates;

  return { data };
};

app.get("/api/rates", async (req, res) => {
  const { base, currency } = req.query;

  var { errors, currencyArr } = validateQuery(base, currency);

  if (errors.length > 0) {
    return res.status(400).json({ errors, statusCode: 400, status: "Failed" });
  }

  const { data: apiData, errors: apiErrors } = await getData(
    base as string,
    currencyArr
  );

  if (apiErrors && apiErrors.length > 0)
    return res
      .status(400)
      .json({ errors: apiErrors, statusCode: 400, status: "Failed" });

  return res.status(202).json({
    results: {
      data: apiData,
    },
  });
});

export default app;

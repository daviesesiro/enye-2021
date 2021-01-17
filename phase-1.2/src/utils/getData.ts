import axios from "axios";
import { ExchangeApiResponse } from "../types";

export const getData = async (
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
    const err = e.response.data.error;

    if (e.response.status >= 500) {
      throw new Error("Something went wrong");
    }
    errors.push(err);
  }

  // incase there was an error from the request
  if (errors.length > 0 || !data || !data.rates) return { errors };

  const ratesKeys = Object.keys(data.rates);

  //if the client sent an unsupported currency
  currencies.forEach((cur) => {
    if (!ratesKeys.includes(cur)) {
      errors.push(`${cur} is not a surported currency`);
    }
  });

  if (errors.length > 0) return { errors };

  //filtering the rates for the currencies and rebuilding rates
  const rates = ratesKeys
    .filter((rateKey) => currencies.includes(rateKey))
    .reduce((obj: { [key: string]: string }, key) => {
      obj[key] = data!.rates[key];
      return obj;
    }, {});

  data.rates = rates;

  return { data };
};

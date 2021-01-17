export type ErrorResponse = {
  errors: string[];
  statusCode: number;
  status: "Failed";
};

export type ExchangeApiResponse = {
  rates: { [key: string]: string };
  date: string;
  base: string;
};

export type SuccessResponse = {
  results: {
    base: string;
    date: string;
    rates: { [key: string]: number }[];
  };
};

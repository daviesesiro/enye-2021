import { response } from "../types";

export const paginate = (res: response, cursor: number = 0) => {
  cursor = Math.min(cursor, res.size);
  const take = Math.min(cursor + 20 + 1, res.size);

  const dataPlusOne = res.records.profiles.slice(cursor, take);
  const data = dataPlusOne.slice(0, 20);
  const hasMore = dataPlusOne.length === 21;

  return { data, hasMore };
};

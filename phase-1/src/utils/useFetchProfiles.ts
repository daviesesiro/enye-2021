import axios from "axios";
import { useEffect, useState } from "react";
import { response } from "../types";

type state = {
  isFetching: boolean;
  data?: response;
  error?: any;
};

export const useFetchProfiles = () => {
  const [state, setState] = useState<state>({
    isFetching: true,
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get<response>(
          "https://api.enye.tech/v1/challenge/records"
        );

        setState((old) => ({ ...old, data: res.data, isFetching: false }));
      } catch (error) {
        console.log(error);
        setState((old) => ({ ...old, error, isFetching: false }));
      }
    };

    fetchProfiles();
  }, [setState]);

  return { ...state };
};

import React, { useState } from "react";
import { useEffect } from "react";
import { useFetchProfiles } from "./utils/useFetchProfiles";
import { RiLoader4Fill } from "react-icons/ri";
import { Filter, PaginatedData, Profile, response } from "./types";
import { Layout } from "./components/Layout";
import SearchBar from "./components/SearchBar";
import { CheckBoxes } from "./components/CheckBox";
import { PaginationButtons } from "./components/PaginationButtons";
import { paginate } from "./utils/paginate";
import { Dropdown } from "./components/Dropdown";
import { filterProfiles } from "./utils/filterProfiles";
import { CardList } from "./components/CardList";

const App = () => {
  const { data, isFetching, error } = useFetchProfiles();
  const [searchQuery, setSearchQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [pageNumber, setpageNumber] = useState(1);
  const [filter, setFilter] = useState<Filter>({
    genders: [],
    paymentMethod: "",
  });

  const [paginated, setPaginated] = useState<PaginatedData>({
    data: [],
    hasMore: false,
  });

  const prevPage = () => {
    setpageNumber((old) => old - 1);
    setCursor((old) => old - 20);
  };
  const nextPage = () => {
    setpageNumber((old) => old + 1);
    setCursor((old) => old + 20);
  };

  useEffect(() => {
    //reset cursor and pageNumber during a search or filter
    setCursor(0);
    setpageNumber(1);
  }, [searchQuery, filter, setCursor]);

  useEffect(() => {
    if (!data) return;

    let profiles: Profile[] = filterProfiles(searchQuery, data, filter);
    setPaginated(
      paginate({ ...data, records: { profiles } } as response, cursor)
    );
  }, [data, cursor, setPaginated, searchQuery, filter]);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setFilter((old) => {
      let genders = old.genders;

      if (genders.includes(value))
        genders = genders.filter((gender) => gender !== value);
      else genders.push(value);

      return {
        ...old,
        genders,
      };
    });
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((old) => ({ ...old, paymentMethod: e.target.value }));
  };

  return (
    <Layout>
      <SearchBar onChange={(e) => setSearchQuery(e.target.value)} />

      <div className="max-w-md px-3 py-5 mx-auto my-5 bg-white border-2 border-purple-700 border-opacity-50 rounded-md shadow-md">
        <p className="text-lg">Filters</p>
        <div className=" flex flex-col mt-2">
          <span className="block mr-5 text-gray-600">Gender:</span>
          <CheckBoxes handleCheckBoxChange={handleCheckBoxChange} />
        </div>

        <div className="flex flex-col mt-2">
          <span className="mr-2 text-gray-600">Payment Method:</span>
          <Dropdown handleChange={handleDropdownChange} />
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-center h-64">
          <h1 className="text-4xl font-bold text-red-600">{error?.message}</h1>
        </div>
      )}
      {isFetching ? (
        <div className="flex items-center justify-center min-h-.8screen text-white">
          <RiLoader4Fill color="black" size={50} className="animate-spin" />
        </div>
      ) : (
        <>
          <PaginationButtons
            cursor={cursor}
            setCursor={setCursor}
            data={paginated}
            nextPage={nextPage}
            prevPage={prevPage}
            pageNumber={pageNumber}
          />
          <CardList paginatedProfiles={paginated} />
          <PaginationButtons
            cursor={cursor}
            setCursor={setCursor}
            data={paginated}
            nextPage={nextPage}
            prevPage={prevPage}
            scroll
            pageNumber={pageNumber}
          />
        </>
      )}
    </Layout>
  );
};

export default App;

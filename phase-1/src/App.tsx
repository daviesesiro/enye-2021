import React, { useState } from "react";
import { useEffect } from "react";
import Card from "./components/Card";
import { useFetchProfiles } from "./utils/useFetchProfiles";
import { RiLoader4Fill } from "react-icons/ri";
import { Profile, response } from "./types";
import { Layout } from "./components/Layout";
import SearchBar from "./components/SearchBar";
import { CheckBoxes } from "./components/CheckBox";
import { PaginationButtons } from "./components/PaginationButtons";
import { paginate } from "./utils/paginate";
import { Dropdown } from "./components/Dropdown";
import { filterProfiles } from "./utils/filterProfiles";

const App = () => {
  const { data, isFetching, error } = useFetchProfiles();
  const [searchQuery, setSearchQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [filter, setFilter] = useState<{
    genders: string[];
    paymentMethod: string;
  }>({
    genders: [],
    paymentMethod: "",
  });

  const [paginated, setPaginated] = useState<{
    hasMore: boolean;
    data: Profile[];
  }>({ data: [], hasMore: false });

  const nextPage = () => setCursor((old) => old - 20);
  const prevPage = () => setCursor((old) => old + 20);

  useEffect(() => {
    //reset cursor during a search or filter
    setCursor(0);
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
      <div className="max-w-md mx-auto">
        <div className="sm:flex-row flex flex-col items-center mt-2">
          <span className="md:inline block mr-5 text-gray-600">Gender:</span>
          <CheckBoxes handleCheckBoxChange={handleCheckBoxChange} />
        </div>
        <div className="sm:flex-row flex flex-col items-center mt-2">
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
          <div className="2xl:grid-cols-flexible-xl md:px-10 grid-cols-flexible place-content-center gap-x-16 gap-y-14 grid items-start mx-auto mt-10">
            {paginated.data.map((profile) => (
              <Card key={profile.Email} profile={profile} />
            ))}
          </div>
          <PaginationButtons
            cursor={cursor}
            setCursor={setCursor}
            data={paginated}
            icr={nextPage}
            dcr={prevPage}
          />
        </>
      )}
    </Layout>
  );
};

export default App;

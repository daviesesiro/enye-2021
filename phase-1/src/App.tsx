import Fuse from "fuse.js";
import React, { useState } from "react";
import { useEffect } from "react";
import Card from "./components/Card";
import { useFetchProfiles } from "./utils/useFetchProfiles";
import { RiLoader4Fill } from "react-icons/ri";
import { Profile, response } from "./types";
import { Layout } from "./components/Layout";
import SearchBar from "./components/SearchBar";
import { CheckBox } from "./components/CheckBox";
import { PaginationButtons } from "./components/PaginationButtons";
import { paginate } from "./utils/paginate";

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

    let searchedProfiles: Profile[] = [];

    if (searchQuery === "") {
      searchedProfiles = data.records.profiles;
    } else {
      searchedProfiles = new Fuse<Profile>([...data.records.profiles], {
        keys: ["FirstName", "LastName"],
        threshold: 0,
      })
        .search(searchQuery)
        .map((p) => p.item); //get only the items
    }

    //filter with gender
    if (filter.genders.length > 0)
      searchedProfiles = searchedProfiles.filter((d) =>
        filter.genders.includes(d.Gender.toLowerCase())
      );

    //filter with payment method
    if (!["Choose an Option", ""].includes(filter.paymentMethod)) {
      searchedProfiles = searchedProfiles.filter(
        (d) => d.PaymentMethod === filter.paymentMethod
      );
    }
    setPaginated(
      paginate(
        { ...data, records: { profiles: searchedProfiles } } as response,
        cursor
      )
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
        <div className="mt-2">
          <span className="md:inline block mr-5 text-gray-600">Gender:</span>
          <CheckBox
            value="Male"
            id="male"
            onChange={handleCheckBoxChange}
            label="Male"
            className="mr-3"
          />
          <CheckBox
            value="Female"
            id="female"
            onChange={handleCheckBoxChange}
            label="Female"
            className="mr-3"
          />
          <CheckBox
            value="Prefer to Skip"
            id="prefer-to-skip"
            onChange={handleCheckBoxChange}
            label="Prefer to Skip"
            className="mr-3"
          />
        </div>

        <div className="flex items-center mt-2">
          <span className="mr-2 text-gray-600">Payment Method:</span>
          <select
            defaultValue="Choose an Option"
            defaultChecked={true}
            onChange={handleDropdownChange}
            name="payment-method"
            className="px-3 py-1"
            id="payment-method"
          >
            <option>Choose an Option</option>
            <option value="cc">Credit Card </option>
            <option value="money order">Money Order</option>
            <option value="paypal">Paypal</option>
            <option value="check">Check</option>
          </select>
        </div>
      </div>
      {isFetching ? (
        <div className="flex items-center justify-center min-h-.8screen text-white">
          <RiLoader4Fill color="black" size={50} className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="2xl:grid-cols-flexible-xl md:px-10 grid-cols-flexible place-content-center gap-x-16 gap-y-14 grid items-start mx-auto mt-10">
            {paginated.data.map((profile) => (
              <Card key={profile.CreditCardNumber} profile={profile} />
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

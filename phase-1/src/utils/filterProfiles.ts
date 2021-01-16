import Fuse from "fuse.js";
import { Profile, response } from "../types";

export function filterProfiles(
  searchQuery: string,
  data: response,
  filter: { genders: string[]; paymentMethod: string }
) {
  let searchedProfiles: Profile[] = [];

  if (searchQuery === "") {
    searchedProfiles = data.records.profiles;
  } else {
    searchedProfiles = new Fuse<Profile>(data.records.profiles, {
      keys: ["FirstName", "LastName"],
      threshold: 0.3,
      shouldSort: true,
    })
      .search({ $or: [{ FirstName: searchQuery }, { LastName: searchQuery }] })
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
  return searchedProfiles;
}

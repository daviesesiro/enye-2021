export interface response {
  records: { profiles: Profile[] };
  status: string;
  size: number;
}

export type Profile = {
  FirstName: string;
  LastName: string;
  Gender: string;
  Latitude: number;
  Longitude: number;
  CreditCardNumber: string;
  CreditCardType: string;
  Email: string;
  DomainName: string;
  PhoneNumber: string;
  MacAddress: string;
  URL: string;
  UserName: string;
  LastLogin: string;
  PaymentMethod: string;
};

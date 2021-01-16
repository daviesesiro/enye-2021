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

export type Filter = {
  genders: string[];
  paymentMethod: string;
};

export const PaymentMethodMap: { [key: string]: string } = {
  cc: "Credit Card",
  "money order": "Money Order",
  paypal: "Paypay",
  check: "Check",
};

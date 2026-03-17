export type Restaurant = {
  _id: string;
  name: string;
  cuisine: string;
  borough: string;
  address: {
    building: string;
    street: string;
    zipcode: string;
    coord: number[];
  };
};

import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Nishtha",
    lastName: "Thakkar",
    email: "nishtha@gmail.com",
    password: "nishtha",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    address: [
      {
        _id: uuid(),
        name: "Nishtha thakkar",
        street: "83, purshottam nagar",
        city: "Ahmedabad",
        state: "Gujarat",
        zipcode: '318005',
        country: 'India',
        mobile: '3524652340',
    },
    ]
  },
];

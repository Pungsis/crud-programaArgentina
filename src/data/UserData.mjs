import { getDate } from "../utils/DateFormatter.mjs";

const currentId = 3;

export const UserData = [
  {
    id: 1,
    name: "John",
    lastname: "Doe",
    email: "fakeemail123@gmail.com",
    member: true,
    join: getDate(),
  },
  {
    id: 2,
    name: "Marie",
    lastname: "Terry",
    email: "fake2email123@gmail.com",
    member: false,
    join: getDate(),
  },
  {
    id: 3,
    name: "Don",
    lastname: "Marcus",
    email: "fake3email123@gmail.com",
    member: true,
    join: getDate(),
  },
  {
    id: 4,
    name: "Don",
    lastname: "Marcus",
    email: "fake3email123@gmail.com",
    member: true,
    join: getDate(),
  },
  {
    id: 5,
    name: "Don",
    lastname: "Marcus",
    email: "fake3email123@gmail.com",
    member: true,
    join: getDate(),
  },
];

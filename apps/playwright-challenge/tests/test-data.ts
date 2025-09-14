export const johnDoe = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "johndoe@example.com",
  address: {
    street: "Main St",
    suite: "Apt 123",
    city: "New York",
    zipcode: "10001",
    geo: {
      lat: "40.7128",
      lng: "-74.0060",
    },
  },
  phone: "555-123-4567",
  website: "johndoe.com",
  company: {
    name: "ABC Corp",
    catchPhrase: "Making things happen",
    bs: "innovative solutions",
  },
};

export const janeDoe = {
  ...johnDoe,
  id: 2,
  name: "Jane Doe",
  username: "janedoe",
  email: "janedoe@example.com",
  phone: "555-123-4568",
  website: "janedoe.com",

};

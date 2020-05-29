
exports.seed = function (knex) {
  // Deletes ALL existing entries
  // return knex('users').truncate()
  //   .then(function () {
  // Inserts seed entries
  return knex('users').insert([
    {
      username: "jackson5",
      password: "abc123",
      phoneNumber: "8675309"
    },
    {
      username: "billiejean",
      password: "notmylover",
      phoneNumber: "2813308004"
    },
    {
      username: "iloveplants",
      password: "123abc",
      phoneNumber: "5555555"
    }

  ]);
  //});
};

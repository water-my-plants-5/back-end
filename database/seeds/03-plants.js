
exports.seed = function (knex) {
  // Deletes ALL existing entries
  // return knex('plants').truncate()
  //   .then(function () {
  // Inserts seed entries
  return knex('plants').insert([

    {
      nickname: "Almond",
      species: "Prunus dulcis",
      h2oFrequency: "Everyday",
      user_id: 1
    },
    {
      nickname: "Bamboo",
      species: "Bambuseae",
      h2oFrequency: "Every other day",
      user_id: 1
    },
    {
      nickname: "Chrysanthemum",
      species: "Chrysanthemum morifolium",
      h2oFrequency: "Everyday",
      user_id: 1
    },
    {
      nickname: "Daisy",
      species: "Rudbeckia hirta",
      h2oFrequency: "Every other day",
      user_id: 1
    },
    {
      nickname: "Eucalyptus",
      species: "Eucalyptus spp",
      h2oFrequency: "Everyday",
      user_id: 1
    },

  ]);
  // }
  // );
};

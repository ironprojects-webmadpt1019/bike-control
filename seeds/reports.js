const { withDbConnection, dropIfExists } = require("../lib/withDbConnection");
const Reports = require("../models/Reports");

const getRandomInRange = function(fromLon, toLon, fromLat, toLat, fixed) {
  return [
    (Math.random() * (toLon - fromLon) + fromLon).toFixed(fixed) * 1,
    (Math.random() * (toLat - fromLat) + fromLat).toFixed(fixed) * 1
  ];
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
};

withDbConnection(async () => {
  await dropIfExists(Reports);
  const reports = new Array(50).fill(0).map(e => {
    return {
      location: {
        type: "Point",
        coordinates: getRandomInRange(-3.58, -3.8, 40.35, 40.51, 3)
      }
    };
  });
  await Reports.create(reports);
});

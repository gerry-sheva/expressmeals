import { Client } from "@googlemaps/google-maps-services-js";

export const calculateDistance = () => {
  const client = new Client({});

  const secret = "AIzaSyCvRopYpGqGe8qozVWsQKkBwNVuE0pc5FM";

  client
    .distancematrix({
      params: {
        key: secret,
        origins: [{ lat: 38.907192, lng: -77.036873 }],
        destinations: [{ lat: 42.360081, lng: -71.058884 }],
      },
    })
    .then((r) => {
      const distance = r.data.rows[0].elements[0].distance
      console.log(distance)
      return distance
    })
    .catch((e) => {
      return e.response.data.error_message;
    });
};


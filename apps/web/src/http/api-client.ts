import kt from "ky";

export const api = kt.create({
  prefixUrl: "http://localhost:3333",
});

import kt from "ky";
import { getCookie, type CookiesFn } from "cookies-next";

export const api = kt.create({
  prefixUrl: "http://localhost:3333",
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined;

        if (typeof window === "undefined") {
          const { cookies: serverCookies } = await import("next/headers");

          // CORREÇÃO: Passa a função, não o resultado
          cookieStore = serverCookies;
        }

        const token = await getCookie("token", { cookies: cookieStore });

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});

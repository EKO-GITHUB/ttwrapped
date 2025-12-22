import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const EEA_UK_COUNTRIES = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IS",
  "IE",
  "IT",
  "LV",
  "LI",
  "LT",
  "LU",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "GB",
];

export default clerkMiddleware(async (auth, request) => {
  const country = request.headers.get("x-vercel-ip-country") || "";
  const is_eea_uk = EEA_UK_COUNTRIES.includes(country);

  const response = NextResponse.next();
  response.cookies.set("is_eea_uk", is_eea_uk ? "1" : "0", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

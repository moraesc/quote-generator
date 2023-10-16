"use client";

import React, { useState } from "react";
import { CATEGORIES } from "./constants";

const API_KEY = "iLfF0bPXjwB9wmWzPN2Oeg==tXdWDKvN3PqAkqC2";

export default function Home() {
  const [quote, setQuote] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("");

  const fetchQuote = async ({ category }: { category: string }) => {
    const responsePromise = await fetch(
      `https://api.api-ninjas.com/v1/quotes?category=${category}`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }
    );
    const responseParsed = await responsePromise.json();
    setQuote(responseParsed[0].quote);
  };

  return (
    <div className="wrapper">
      <p className="text-[24px] font-medium mt-24">
        Inspirational Quote Generator
      </p>
      <p className="text-[18px] mt-12">Select a category</p>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {CATEGORIES.map((category) => {
          return (
            <div
              key={category.key}
              className="text-[12px] rounded-xl bg-[#e4f5e98c] text-[#848484] py-2 px-4 items-center text-center cursor-pointer hover:bg-[#c6d9cc8c]"
              onClick={() => {
                setCategory(category.key);
                fetchQuote({ category: category.key });
              }}
            >
              {category.name}
            </div>
          );
        })}
      </div>
      <div className="w-[770px] h-[220px] mt-24">
        {/* <p>{category.toLocaleUpperCase()}</p> */}
        <p className="mt-8 typewriter">{quote}</p>
      </div>
      {quote !== null && (
        <button
          onClick={() => fetchQuote({ category })}
          className="bg-[#e4f5e98c] hover:bg-blue text-[#848484] py-4 px-4 rounded-lg"
        >
          Regenerate
        </button>
      )}
    </div>
  );
}

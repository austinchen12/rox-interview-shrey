"use client";

import { useEffect } from "react";

async function setKeyValue(key: string, value: string) {
  const response = await fetch("http://localhost:3000/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, value }),
  });
  return await response.json();
}

async function getValue(key: string) {
  const response = await fetch(
    `http://localhost:3000/api?key=${encodeURIComponent(key)}`
  );
  return await response.json();
}

export default async function Home() {
  useEffect(() => {
    const fn = async () => {
      const setResult = await setKeyValue("myKey", "myValue");
      const getResult = await getValue("myKey");
      const notFoundResult = await getValue("nonExistentKey");
    };
    fn();
  }, []);

  return <div>Hello Shrey!</div>;
}

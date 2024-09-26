import { NextResponse } from "next/server";

// This is a simple in-memory store. In a real application, you'd use a database.
let store: Record<string, string> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key) {
    return new Response(JSON.stringify({ error: "Key is required" }), {
      status: 400,
    });
  }

  const value = store[key];

  if (value === undefined) {
    return new Response(JSON.stringify({ error: "Key not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ [key]: value }), { status: 200 });
}

export async function POST(request: Request) {
  const { key, value } = await request.json();

  if (!key || !value) {
    return new Response(
      JSON.stringify({ error: "Both key and value are required" }),
      { status: 401 }
    );
  }

  store[key] = value;
  return new Response(JSON.stringify({ error: "Value stored successfully" }), {
    status: 201,
  });
}

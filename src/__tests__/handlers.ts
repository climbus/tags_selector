import { http, HttpResponse } from "msw";

export default [
  http.get("http://api.example.com/tags", ({ request }) => {
    const url = new URL(request.url);

    const phrase = url.searchParams.get("phrase");
    if (phrase === "500") {
      return HttpResponse.error();
    }

    if (phrase === "slow") {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(HttpResponse.json(data));
        }, 1000);
      });
    }
    const response_data = phrase
      ? data.filter((tag) =>
        tag.name.toLowerCase().includes(phrase.toLowerCase()),
      )
      : [];

    return HttpResponse.json(response_data);
  }),
];

const data = [
  { id: 1, name: "test1" },
  { id: 2, name: "test2" },
  { id: 3, name: "hello" },
  { id: 4, name: "world" },
  { id: 5, name: "hello world" },
  { id: 6, name: "ala ma kota" },
  { id: 7, name: "react rulez" },
  { id: 8, name: "makubma" },
  { id: 9, name: "retro" },
];

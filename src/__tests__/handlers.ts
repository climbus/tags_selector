import { http, HttpResponse } from "msw";

export default [
  http.get("http://api.example.com/tags", ({ request }) => {
    const url = new URL(request.url);
    const phrase = url.searchParams.get("phrase");

    if (phrase !== "test") {
      return HttpResponse.json([]);
    }

    return HttpResponse.json([
      { id: 1, name: "test1" },
      { id: 2, name: "test2" },
    ]);
  }),
];

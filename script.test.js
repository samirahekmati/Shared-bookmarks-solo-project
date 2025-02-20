import { sortBookmarks } from "./utils"


test("sortBookmarks sorts bookmarks in descending order by createdAt", () => {
  const bookmarks = [
    { title: "Older", createdAt: "2024-01-01T12:00:00Z" },
    { title: "Newest", createdAt: "2024-03-01T12:00:00Z" },
    { title: "Middle", createdAt: "2024-02-01T12:00:00Z" },
  ];

  const sorted = sortBookmarks(bookmarks);

  expect(sorted[0].title).toBe("Newest");
  expect(sorted[1].title).toBe("Middle");
  expect(sorted[2].title).toBe("Older");
});


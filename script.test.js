import { sortBookmarks } from "./utils"

// Test case 1: Sorting bookmarks in descending order by createdAt
test("sortBookmarks sorts bookmarks in descending order by createdAt", () => {
  const bookmarks = [
    { title: "Older", createdAt: "2024-01-01T12:00:00Z" },
    { title: "Newest", createdAt: "2024-03-01T12:00:00Z" },
    { title: "Middle", createdAt: "2024-02-01T12:00:00Z" },
  ];

  const sorted = sortBookmarks(bookmarks);

  // The newest bookmark should come first, followed by middle, then oldest.
  expect(sorted[0].title).toBe("Newest");
  expect(sorted[1].title).toBe("Middle");
  expect(sorted[2].title).toBe("Older");
});

// Test case 2: Handling an empty array
test("sortBookmarks handles an empty array", () => {
  const bookmarks = [];
  const sorted = sortBookmarks(bookmarks);

  // The sorted result should still be an empty array
  expect(sorted).toEqual([]);
});


// Test case 3: Handling a single bookmark without errors
test("sortBookmarks handles a single bookmark without errors", () => {
  const bookmarks = [{ title: "Only One", createdAt: "2024-02-17T12:00:00Z" }];
  const sorted = sortBookmarks(bookmarks);

  // The single bookmark should remain unchanged
  expect(sorted).toEqual(bookmarks); // Should return the same single bookmark
});

//Test case 4: Ensuring order is maintained when already sorted
test("sortBookmarks does not change order if already sorted", () => {
  const bookmarks = [
    { title: "Newest", createdAt: "2024-03-01T12:00:00Z" },
    { title: "Middle", createdAt: "2024-02-01T12:00:00Z" },
    { title: "Older", createdAt: "2024-01-01T12:00:00Z" },
  ];

  const sorted = sortBookmarks(bookmarks);

  // The order should remain the same since it's already sorted
  expect(sorted).toEqual(bookmarks); 
});


// Test case 5: Handling identical timestamps
test("sortBookmarks preserves order when timestamps are identical", () => {
  const bookmarks = [
    { title: "First", createdAt: "2024-02-01T12:00:00Z" },
    { title: "Second", createdAt: "2024-02-01T12:00:00Z" },
  ];

  const sorted = sortBookmarks(bookmarks);

  // Since timestamps are identical, the order should not change
  expect(sorted).toEqual(bookmarks); // Should maintain original order
});




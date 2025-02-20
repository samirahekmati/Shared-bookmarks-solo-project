/**
 * Sorts an array of bookmark objects in reverse chronological order.
 *
 * This function ensures that bookmarks are displayed from newest to oldest
 * based on their `createdAt` timestamp. It is used to maintain a consistent order whenever bookmarks are retrieved and displayed.
 *
 * @param {Array} bookmarks - An array of bookmark objects, each containing a `createdAt` property.
 * @returns {Array} - A new array of bookmarks sorted from newest to oldest.
 *
 * Example:
 * const bookmarks = [
 *   { title: "Google", createdAt: "2024-02-16T12:00:00Z" },
 *   { title: "YouTube", createdAt: "2024-02-17T08:30:00Z" }
 * ];
 * const sorted = sortBookmarks(bookmarks);
 * console.log(sorted); // [{title: "YouTube", createdAt: ...}, {title: "Google", createdAt: ...}]
 */

export function sortBookmarks(bookmarks){
    return bookmarks.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)); //Uses new Date() to compare the createdAt timestamps.
   }


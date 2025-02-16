/**
 * @jest-environment jsdom
 */

import { createDropdown } from "./script.js"

describe("createDropdown", () => {
    beforeEach(() => {
      //set up the document body with a select element before each test
      document.body.innerHTML = '<select id="dropdown"></select>';
    });
  
    test("should create dropdown options based on user array", () => {
      const users = ["Samira", "Bob", "Charlie"];
      createDropdown(users);
  
      const selectElement = document.getElementById("dropdown");
      const options = selectElement.getElementsByTagName("option");
  
      expect(options.length).toBe(3);
      expect(options[0].textContent).toBe("User Samira");
      expect(options[1].textContent).toBe("User Bob");
      expect(options[2].textContent).toBe("User Charlie");
    });
  
    test("should assign correct option ids", () => {
      const users = ["Samira", "Bob"];
      createDropdown(users);
  
      const selectElement = document.getElementById("dropdown");
      const options = selectElement.getElementsByTagName("option");
  
      expect(options[0].id).toBe("1");
      expect(options[1].id).toBe("2");
    });
  });

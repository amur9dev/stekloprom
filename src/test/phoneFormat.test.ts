import { describe, expect, it } from "vitest";

import { formatPhone, isValidPhone } from "@/utils/phoneFormat";

describe("formatPhone", () => {
  it("formats an 11-digit russian number", () => {
    expect(formatPhone("79991234567")).toBe("+7 (999) 123-45-67");
  });

  it("normalizes numbers that start with 8", () => {
    expect(formatPhone("8 (999) 123-45-67")).toBe("+7 (999) 123-45-67");
  });

  it("adds country code when user starts with local digits", () => {
    expect(formatPhone("9991234567")).toBe("+7 (999) 123-45-67");
  });

  it("keeps partial formatting while user types", () => {
    expect(formatPhone("99")).toBe("+7 (99");
  });

  it("returns empty string when there are no digits", () => {
    expect(formatPhone("+")).toBe("");
  });
});

describe("isValidPhone", () => {
  it("returns true for complete valid russian number", () => {
    expect(isValidPhone("+7 (999) 123-45-67")).toBe(true);
  });

  it("returns false for incomplete number", () => {
    expect(isValidPhone("+7 (999) 123-45")).toBe(false);
  });

  it("returns false when country code is not 7", () => {
    expect(isValidPhone("+1 (999) 123-45-67")).toBe(false);
  });
});

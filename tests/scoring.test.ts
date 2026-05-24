import { describe, expect, it } from "vitest";
import { POINTS_PER_STAR, collectStar, formatScore, initialScore } from "../src/game/scoring";

describe("scoring", () => {
  it("starts at zero", () => {
    expect(initialScore().score).toBe(0);
  });

  it("adds POINTS_PER_STAR per collected star", () => {
    const after = collectStar(collectStar(collectStar(initialScore())));
    expect(after.score).toBe(POINTS_PER_STAR * 3);
  });

  it("does not mutate the input state", () => {
    const before = initialScore();
    collectStar(before);
    expect(before.score).toBe(0);
  });

  it("formats the score for display", () => {
    expect(formatScore({ score: 0 })).toBe("Score: 0");
    expect(formatScore({ score: 120 })).toBe("Score: 120");
  });
});

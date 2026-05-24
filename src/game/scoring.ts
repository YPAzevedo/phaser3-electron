export const POINTS_PER_STAR = 10

export type ScoreState = {
  readonly score: number
}

export function initialScore(): ScoreState {
  return { score: 0 }
}

export function collectStar(state: ScoreState): ScoreState {
  return { score: state.score + POINTS_PER_STAR }
}

export function formatScore(state: ScoreState): string {
  return `Score: ${state.score}`
}

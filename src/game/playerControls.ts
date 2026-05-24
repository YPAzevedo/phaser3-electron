export const MOVE_VELOCITY = 160
export const JUMP_VELOCITY = -330

export type PlayerInput = {
  left: boolean
  right: boolean
  up: boolean
}

export type PlayerAnimation = 'left' | 'right' | 'turn'

export type PlayerIntent = {
  velocityX: number
  jumpVelocity: number | null
  animation: PlayerAnimation
}

export function computePlayerIntent(
  input: PlayerInput,
  grounded: boolean,
): PlayerIntent {
  let velocityX = 0
  let animation: PlayerAnimation = 'turn'

  if (input.left) {
    velocityX = -MOVE_VELOCITY
    animation = 'left'
  } else if (input.right) {
    velocityX = MOVE_VELOCITY
    animation = 'right'
  }

  const jumpVelocity = input.up && grounded ? JUMP_VELOCITY : null

  return { velocityX, jumpVelocity, animation }
}

import { describe, expect, it } from 'vitest'
import {
  JUMP_VELOCITY,
  MOVE_VELOCITY,
  computePlayerIntent,
} from '../src/game/playerControls'

const NO_INPUT = { left: false, right: false, up: false } as const

describe('computePlayerIntent', () => {
  it('is idle when no keys are pressed', () => {
    expect(computePlayerIntent(NO_INPUT, true)).toEqual({
      velocityX: 0,
      jumpVelocity: null,
      animation: 'turn',
    })
  })

  it('moves left and plays the left animation when left is held', () => {
    expect(computePlayerIntent({ ...NO_INPUT, left: true }, true)).toEqual({
      velocityX: -MOVE_VELOCITY,
      jumpVelocity: null,
      animation: 'left',
    })
  })

  it('moves right and plays the right animation when right is held', () => {
    expect(computePlayerIntent({ ...NO_INPUT, right: true }, true)).toEqual({
      velocityX: MOVE_VELOCITY,
      jumpVelocity: null,
      animation: 'right',
    })
  })

  it('gives left priority when left and right are both held', () => {
    expect(
      computePlayerIntent({ left: true, right: true, up: false }, true),
    ).toMatchObject({ velocityX: -MOVE_VELOCITY, animation: 'left' })
  })

  it('jumps when up is pressed and grounded', () => {
    expect(
      computePlayerIntent({ ...NO_INPUT, up: true }, true).jumpVelocity,
    ).toBe(JUMP_VELOCITY)
  })

  it('does not jump while airborne even if up is pressed', () => {
    expect(
      computePlayerIntent({ ...NO_INPUT, up: true }, false).jumpVelocity,
    ).toBeNull()
  })

  it('preserves horizontal movement while jumping', () => {
    const intent = computePlayerIntent(
      { left: false, right: true, up: true },
      true,
    )
    expect(intent.velocityX).toBe(MOVE_VELOCITY)
    expect(intent.jumpVelocity).toBe(JUMP_VELOCITY)
    expect(intent.animation).toBe('right')
  })

  it('jump velocity is negative (upward in Phaser coordinates)', () => {
    expect(JUMP_VELOCITY).toBeLessThan(0)
  })
})

import Phaser from 'phaser'

type ArcadePhysicsCallback = Phaser.Types.Physics.Arcade.ArcadePhysicsCallback

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private score = 0
  private scoreText!: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'GameScene', active: true })
  }

  preload(): void {
    this.load.image('sky', 'assets/sky.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('star', 'assets/star.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
  }

  create(): void {
    this.add.image(400, 300, 'sky')

    const platforms = this.physics.add.staticGroup()
    platforms.create(400, 575, 'ground').setScale(2).refreshBody()
    platforms.create(600, 400, 'ground')
    platforms.create(50, 250, 'ground')
    platforms.create(750, 220, 'ground')
    platforms.create(400, 300, 'ground')

    this.player = this.physics.add.sprite(100, 450, 'dude')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })

    this.cursors = this.input.keyboard!.createCursorKeys()

    const stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    })

    stars.children.forEach((child) => {
      ;(child as Phaser.Physics.Arcade.Sprite).setBounceY(
        Phaser.Math.FloatBetween(0.4, 0.8),
      )
    })

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      color: '#000',
    })

    this.physics.add.collider(this.player, platforms)
    this.physics.add.collider(stars, platforms)
    this.physics.add.overlap(this.player, stars, this.collectStar, undefined, this)
  }

  update(): void {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn')
    }

    if (this.cursors.up.isDown && this.player.body!.touching.down) {
      this.player.setVelocityY(-330)
    }
  }

  private collectStar: ArcadePhysicsCallback = (_player, star) => {
    ;(star as Phaser.Physics.Arcade.Sprite).disableBody(true, true)
    this.score += 10
    this.scoreText.setText('Score: ' + this.score)
  }
}

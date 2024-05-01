function Ammo_cooldown_p1 () {
    pause(2000)
    ammo_P1 = 5
}
controller.player2.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    P2_move_history.push("B")
    if (Ammo_P2 > 0) {
        Basic_range_P2 = sprites.createProjectileFromSprite(assets.image`range attack P2`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), -150, 0)
        if (Comboscan(P2_move_history, Combo_1)) {
            combo_range_P2 = sprites.createProjectileFromSprite(assets.image`combo attack P1`, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), -200, 0)
        }
    }
    Ammo_P2 = Ammo_P2 - 1
    if (Ammo_P2 <= 0) {
        Ammo_cooldown_P2()
    }
})
controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    P1_history.push("Up")
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vy == 0) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setVelocity(0, -85)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).ay = 50
        pause(1000)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setVelocity(0, 50)
    }
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    P2_move_history.push("A")
    melee_P2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . f f f f f f f f f f f f f f f 
        . . . . . . f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        . . . f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        . . f f f f f f f f f f f f f f f f f f f f f f 
        . . . f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        . . . . . . f f f 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        . . . . . . . . . f f f f f f f f f f f f f f f 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        `, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)), 300, 0)
    sprites.destroy(melee_P2)
})
controller.player2.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
    P1_history.push("Down")
})
function Comboscan (move_list: any[], combo_list: any[]) {
    if (move_list.length >= 4) {
        history_index = move_list.length - 1
        store_index = 0
        for (let index = 0; index < combo_list.length; index++) {
            if (move_list[history_index] != combo_list[store_index]) {
                return false
            }
            history_index += -1
            store_index += 1
        }
        return true
    }
    return false
}
function Ammo_cooldown_P2 () {
    pause(2000)
    Ammo_P2 = 5
}
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    P2_move_history.push("Up")
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vy == 0) {
        speed = -50
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setVelocity(0, -50)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (otherSprite == Basic_range_P1 && sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))) {
        sprites.destroy(otherSprite)
        info.player2.changeLifeBy(randint(-8, -15))
        if (info.player2.life() <= 0) {
            mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.One))
        }
    }
    if (otherSprite == melee_P1 && sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))) {
        sprites.destroy(otherSprite)
        info.player2.changeLifeBy(randint(-10, -17))
        Ammo_P2 = 0
        pause(1000)
        Ammo_P2 = 5
        if (info.player2.life() <= 0) {
            mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.One))
        }
    }
    if (otherSprite == Combo_range_P1 && sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two))) {
        sprites.destroy(otherSprite)
        info.player2.changeLifeBy(randint(-10, -17))
        if (info.player2.life() <= 0) {
            mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.One))
        }
    }
    if (otherSprite == Basic_range_P2 && sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One))) {
        sprites.destroy(otherSprite)
        info.player1.changeLifeBy(randint(-8, -15))
        if (info.player1.life() <= 0) {
            mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.Two))
        }
    }
    if (otherSprite == melee_P2 && sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One))) {
        sprites.destroy(otherSprite)
        info.player1.changeLifeBy(randint(-10, -17))
        ammo_P1 = 0
        pause(1000)
        ammo_P1 = 5
        if (info.player1.life() <= 0) {
            mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.Two))
        }
    }
    if (otherSprite == combo_range_P2 && sprite == mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One))) {
        sprites.destroy(otherSprite)
        info.player1.changeLifeBy(randint(-10, -17))
        if (info.player1.life() <= 0) {
            mp.gameOverPlayerWin(mp.playerSelector(mp.PlayerNumber.Two))
        }
    }
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    P2_move_history.push("Right")
})
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    P2_move_history.push("Left")
})
controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    P1_history.push("Right")
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    P1_history.push("A")
    melee_P1 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . . . . . . . . . 
        f f f f f f f f f f f f f f f . . . . . . . . . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f f f . . . . . . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f f f . . . 
        f f f f f f f f f f f f f f f f f f f f f f . . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f f f . . . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 f f f . . . . . . 
        f f f f f f f f f f f f f f f . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . . . . . 
        `, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), 1, 0)
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    P1_history.push("B")
    Basic_range_P1 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . . 2 2 1 1 1 1 2 . . 
        . . . . 2 2 3 3 1 1 1 1 1 1 . . 
        . . 3 3 3 3 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 3 3 2 2 3 1 1 1 1 1 1 1 . . 
        . . . . . . 2 2 3 1 1 1 1 2 . . 
        . . . . . . . . . 2 2 2 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), 150, 0)
    ammo_P12 = ammo_P12 - 1
    if (Comboscan(P1_history, Combo_1)) {
        Combo_range_P1 = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 4 4 4 4 4 . . . . . . 
            . . . 4 4 4 5 5 5 d 4 4 4 4 . . 
            . . 4 d 5 d 5 5 5 d d d 4 4 . . 
            . . 4 5 5 1 1 1 d d 5 5 5 4 . . 
            . 4 5 5 5 1 1 1 5 1 1 5 5 4 4 . 
            . 4 d d 1 1 5 5 5 1 1 5 5 d 4 . 
            . 4 5 5 1 1 5 1 1 5 5 d d d 4 . 
            . 2 5 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . 2 d 5 5 d 1 1 1 5 1 1 5 5 2 . 
            . . 2 4 d d 5 5 5 5 d d 5 4 . . 
            . . . 2 2 4 d 5 5 d d 4 4 . . . 
            . . 2 2 2 2 2 4 4 4 2 2 2 . . . 
            . . . 2 2 4 4 4 4 4 4 2 2 . . . 
            . . . . . 2 2 2 2 2 2 . . . . . 
            `, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)), 200, 0)
    }
    if (ammo_P12 <= 0) {
        Ammo_cooldown_p1()
    }
})
controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    P1_history.push("Left")
})
controller.player1.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
    P1_history.push("Down")
})
let ammo_P12 = 0
let Combo_range_P1: Sprite = null
let melee_P1: Sprite = null
let Basic_range_P1: Sprite = null
let store_index = 0
let history_index = 0
let melee_P2: Sprite = null
let P1_history: string[] = []
let combo_range_P2: Sprite = null
let Basic_range_P2: Sprite = null
let P2_move_history: string[] = []
let speed = 0
let Combo_1: string[] = []
let Ammo_P2 = 0
let ammo_P1 = 0
ammo_P1 = 5
Ammo_P2 = 5
let Jump_var = 50
Combo_1 = [
"B",
"Left",
"Down",
"Down"
]
speed = 35
tiles.setCurrentTilemap(tilemap`level2`)
scene.setBackgroundImage(assets.image`background`)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(img`
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f f f c c f f f c . 
    f f f c f f f f f f f c . 
    c c c f f f e e f f c c . 
    f f f f f e e f f c c f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 7 7 7 7 b f e f . 
    e 4 f 7 7 7 7 7 7 f 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `, SpriteKind.Player))
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f e e 2 2 2 2 2 2 e f f . . 
    . f f e 2 f f f f f f 2 e f f . 
    . f f f f f e e e e f f f f f . 
    . . f e f b f 4 4 f b f e f . . 
    . . f e 4 1 f d d f 1 4 e f . . 
    . . e f f f f d d d 4 e f . . . 
    . . f d d d d f 2 2 2 f e f . . 
    . . f b b b b f 2 2 2 f 4 e . . 
    . . f b b b b f 5 4 4 f . . . . 
    . . . f c c f f f f f f . . . . 
    . . . . f f . . . f f f . . . . 
    `, SpriteKind.Player))
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setPosition(40, 40)
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setPosition(120, 40)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 100, 0)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two), 100, 0)
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).ay = speed
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).ay = speed
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setStayInScreen(false)
mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setStayInScreen(false)
splitScreen.cameraFollowSprite(splitScreen.Camera.Camera1, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
splitScreen.cameraFollowSprite(splitScreen.Camera.Camera2, mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))
info.player1.setLife(100)
info.player2.setLife(100)
forever(function () {
    if (P1_history.length > 4) {
        P1_history.shift()
    }
    if (P2_move_history.length > 4) {
        P2_move_history.shift()
    }
})

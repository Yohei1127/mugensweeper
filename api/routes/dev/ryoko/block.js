const router = require('express').Router();
const { getField, initField, addBlock } = require('../../../models/dev/ryoko/fieldStore.js');

const directions = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

router
  .route('/')
  .post(async (req, res) => {
    // async: promiseを返す関数に関数を変化させる

    // 開いた場所の周囲
    const field = await getField();

    for (let i = 0; i < field.length; i += 1) {
      for (let t = 0; t < directions.length; t += 1) {
        const u = field[i].x + directions[t][0]; // 隣接するx座標
        const k = field[i].y + directions[t][1]; // 隣接するy座標
        const bodyX = +req.body.x;
        const bodyY = +req.body.y;

        if (field[i].x === bodyX && field[i].y === bodyY) {
          break;
        } else if (i === field.length - 1 && (u === bodyX && k === bodyY)) {
          await addBlock({ x: bodyX, y: bodyY });
        }
      }
    }

    res.json(await getField());
  })
  .delete(async (req, res) => {
    await initField();
    res.json(await getField());
  });

module.exports = router;

import { where } from "sequelize";
import Fruit from "./../models/fruitModel.js";

class FruitService {
  async getAllFruit() {
    return await Fruit.findAll({
      limit: 30,
      offset: 0,
    });
  }

  async getAll(userId) {
    return await Fruit.findAll({
      where: { userId },
      limit: 20,
      offset: 0,
    });
  }

  async add(fruit) {
    const { userId, name } = fruit;
    const res = await Fruit.create({ name, userId });
    return res;
  }

  async update(fruit) {
    const { id, name } = fruit;
    const fruitdb = await Fruit.findByPk(id);
    const res = await fruitdb?.update({ name: name });
    return res;
  }

  async delete(id) {
    const res = await Fruit.destroy({ where: { id } });
    return res > 0;
  }
}

export default new FruitService();

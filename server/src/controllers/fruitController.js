import fruitService from "../services/fruitService.js";

export const getFruits = async (req, res) => {
  try {
    const { userId } = req.params;
    const fruits = await fruitService.getAll(userId);

    return res.status(200).json({
      success: true,
      fruits,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

export const addFruit = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name } = req.body;
    const fruit = await fruitService.add({ userId, name });

    return res.status(201).json({
      success: true,
      fruit,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

export const updateFruit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const fruit = await fruitService.update({ id, name });

    return res.status(201).json({
      success: true,
      fruit,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

export const deleteFruit = async (req, res) => {
  try {
    const { id } = req.params;
    const fruit = await fruitService.delete(id);
    return res.status(200).json({
      success: fruit,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

import userService from "../services/userService.js";
import JwtService from "../services/jwtService.js";

export const check = async (req, res) => {
  return res.status(201).json({
    success: true,
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Проверка существующего пользователя
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Пользователь с таким email уже зарегистрирован",
      });
    }

    // Создание пользователя
    const user = await userService.createUser({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Регистрация успешна",
      user: user.toSafeJSON(),
    });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "Пользователь с таким email уже существует",
      });
    }

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        errors: error.errors.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Внутренняя ошибка сервера",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await userService.findByEmail(req.body.email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден",
      });
    }

    const isValidPassword = await userService.comparePassword(req.body.password, user.password);

    if (!isValidPassword) {
      return res.status(404).json({
        success: false,
        message: "Неверный логин или пароль",
      });
    }

    const token = JwtService.generateToken(user);

    res.status(201).json({
      success: true,
      message: "Вход успешен",
      user: user.toSafeJSON(),
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Внутренняя ошибка сервера",
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = await userService.findById(req.UserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Пользователь не найден",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Token true",
      user: user.toSafeJSON(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Нет доступа",
    });
  }
};

//
export const uploadImage = async (req, res) => {
  try {
    res.status(201).json({
      success: true,
      message: "Image save",
      url: `/uploads/${req.file.originalname}`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Ошибка uploadImage:",
      error: err,
    });
  }
};

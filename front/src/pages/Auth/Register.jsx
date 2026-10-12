import { useForm } from "react-hook-form";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../../redux/slices/auth";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(fetchRegister(data));
      navigate("/login");
    } catch (error) {
      const serverErrors = error.response?.data?.errors;

      if (serverErrors) {
        Object.entries(serverErrors).forEach(([field, message]) => {
          setError(field, { type: "server", message });
        });
      } else {
        setError("root", {
          type: "server",
          message: error.response?.data?.message || "Что-то пошло не так",
        });
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="mb-4 text-center">Регистрация</h3>

              <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* Имя */}
                <Form.Group className="mb-3">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите имя"
                    isInvalid={isSubmitted && !!errors.name}
                    {...register("name", {
                      required: "Имя обязательно",
                      minLength: { value: 2, message: "Минимум 2 символа" },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    isInvalid={isSubmitted && !!errors.email}
                    {...register("email", {
                      required: "Email обязателен",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Некорректный email",
                      },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Пароль */}
                <Form.Group className="mb-3">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Минимум 6 символов"
                    isInvalid={isSubmitted && !!errors.password}
                    {...register("password", {
                      required: "Пароль обязателен",
                      minLength: { value: 6, message: "Минимум 6 символов" },
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Подтверждение */}
                <Form.Group className="mb-3">
                  <Form.Label>Повторите пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Повторите пароль"
                    isInvalid={isSubmitted && !!errors.confirm}
                    {...register("confirm", {
                      required: "Подтвердите пароль",
                      validate: (value) => value === getValues("password") || "Пароли не совпадают",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirm?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {errors.root && (
                  <div className="alert alert-danger py-2">{errors.root.message}</div>
                )}

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Отправка…" : "Зарегистрироваться"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

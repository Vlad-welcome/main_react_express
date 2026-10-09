import { useForm } from "react-hook-form";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { fetchLogin, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(fetchLogin(data));
    } catch (error) {
      const serverErrors = error.response?.data?.errors;

      if (serverErrors) {
        // Сервер вернул ошибки по полям — показываем их под нужными инпутами
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

  if (isAuth) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="mb-4 text-center">Вход</h3>

              <Form noValidate onSubmit={handleSubmit(onSubmit)}>
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

                {errors.root && (
                  <div className="alert alert-danger py-2">{errors.root.message}</div>
                )}

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Отправка…" : "Войти"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

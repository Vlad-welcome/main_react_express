import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

export const First = () =>
{
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const password = watch('password');

    const onSubmit = async (data) =>
    {
        console.log('Отправка:', data);
        // await fetch(...)
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
                                        isInvalid={!!errors.name}
                                        {...register('name', {
                                            required: 'Имя обязательно',
                                            minLength: { value: 2, message: 'Минимум 2 символа' },
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
                                        isInvalid={!!errors.email}
                                        {...register('email', {
                                            required: 'Email обязателен',
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: 'Некорректный email',
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
                                        isInvalid={!!errors.password}
                                        {...register('password', {
                                            required: 'Пароль обязателен',
                                            minLength: { value: 6, message: 'Минимум 6 символов' },
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
                                        isInvalid={!!errors.confirm}
                                        {...register('confirm', {
                                            required: 'Подтвердите пароль',
                                            validate: (value) =>
                                                value === password || 'Пароли не совпадают',
                                        })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirm?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Чекбокс */}
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Согласен с условиями"
                                        isInvalid={!!errors.agree}
                                        feedback={errors.agree?.message}
                                        feedbackType="invalid"
                                        {...register('agree', { required: 'Нужно согласиться' })}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Отправка…' : 'Зарегистрироваться'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
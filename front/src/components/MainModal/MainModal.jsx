import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const MainModal = ({ show, onHide, onAdd, initialData = null }) => {
  const isEdit = Boolean(initialData);
  const [fruit, setFruit] = useState({ id: null, name: "" });

  useEffect(() => {
    if (show) {
      setFruit(initialData || { id: null, name: "" });
    }
  }, [show, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFruit((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(fruit);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Обновить фрукт" : "Добавить фрукт"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="fruitName">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={fruit.name}
              onChange={handleChange}
              placeholder="Введите название фрукта"
              required
              autoFocus
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Отмена
          </Button>
          <Button variant="primary" type="submit">
            {isEdit ? "Обновить" : "Добавить"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

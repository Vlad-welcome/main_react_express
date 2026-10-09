import { useState, useEffect } from "react";
import axios from "../../axios";
import { MainModal } from "../../components/MainModal/MainModal";
import { Button, Table, Container, Card } from "react-bootstrap";

export const Main = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingFruit, setEditingFruit] = useState(null);

  useEffect(() => {
    axios
      .get("/fruit")
      .then((res) => setFruits(res.data.fruits))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddFruit = (newFruit) => {
    if (!!!newFruit.id) {
      // Добавление
      setLoading(true);
      axios
        .post("/fruit", newFruit)
        .then((res) => setFruits((prev) => [...prev, res.data.fruit]))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    } else {
      // Обновление
      setLoading(true);
      axios
        .put(`/fruit/${newFruit.id}`, newFruit)
        .then((res) => setFruits((prev) => prev.map((f) => (f.id === newFruit.id ? newFruit : f))))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
    setEditingFruit(null);
  };

  const deleteFruit = (id) => {
    setLoading(true);
    axios
      .delete(`/fruit/${id}`)
      .then((res) => setFruits((prev) => prev.filter((fruit) => fruit.id !== id)))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const openAdd = () => {
    setEditingFruit(null);
    setShowModal(true);
  };

  const openEdit = (fruit) => {
    setEditingFruit(fruit);
    setShowModal(true);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="d-flex justify-content-center align-items-center bg-light">
      <div className="p-4 bg-white rounded shadow" style={{ minWidth: "300px" }}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Фрукты</h4>
            <Button variant="primary" size="sm" onClick={openAdd}>
              + Добавить
            </Button>
          </Card.Header>

          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="text-center">Название</th>
                  <th className="text-center">Действие</th>
                </tr>
              </thead>
              <tbody>
                {fruits.map((fruit) => (
                  <tr key={fruit.id}>
                    <td>{fruit.name}</td>
                    <td className="align-middle">
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="outline-primary" onClick={() => openEdit(fruit)}>
                          Изменить
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => deleteFruit(fruit.id)}
                        >
                          Удалить
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <MainModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onAdd={handleAddFruit}
          initialData={editingFruit}
        />
      </div>
    </div>
  );
};

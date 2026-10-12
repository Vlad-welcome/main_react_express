import { useState, useEffect } from "react";
import axios from "../../axios";
import { Button, Table, Container, Card } from "react-bootstrap";

export const AllFruit = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("fruit/allFruit")
      .then((res) => setFruits(res.data.fruits))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="d-flex justify-content-center align-items-center bg-light">
      <div className="p-4 bg-white rounded shadow" style={{ minWidth: "300px" }}>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Фрукты</h4>
          </Card.Header>

          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="text-center">Название</th>
                </tr>
              </thead>
              <tbody>
                {fruits.map((fruit) => (
                  <tr key={fruit.id}>
                    <td>{fruit.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

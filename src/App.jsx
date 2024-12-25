import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [editId, setEditId] = useState(null); 
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const savedToDos = localStorage.getItem('toDos');
    if (savedToDos) {
      setToDos(JSON.parse(savedToDos));
    }
  }, []);

 
  useEffect(() => {
    if (toDos.length > 0) {
      localStorage.setItem('toDos', JSON.stringify(toDos));
    }
  }, [toDos]);


  const addToDo = () => {
    if (toDo.trim() !== '') {
      const newToDo = { id: Date.now(), text: toDo, status: false };
      setToDos((prevToDos) => [...prevToDos, newToDo]);
      setToDo('');
    }
  };

  
  const editToDo = (id) => {
    const todoToEdit = toDos.find((item) => item.id === id);
    if (todoToEdit) {
      setEditId(id);
      setEditText(todoToEdit.text);
    }
  };


  const saveEdit = () => {
    if (editText.trim() !== '') {
      setToDos((prevToDos) =>
        prevToDos.map((item) =>
          item.id === editId ? { ...item, text: editText } : item
        )
      );
      setEditId(null);
      setEditText('');
    }
  };


  const toggleStatus = (id) => {
    setToDos((prevToDos) =>
      prevToDos.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };


  const deleteToDo = (id) => {
    setToDos((prevToDos) => prevToDos.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕</h2>
      </div>
      <div className="input">
        {editId ? (
          <>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              type="text"
              placeholder="🖊️ Edit item..."
            />
            <i
              onClick={saveEdit}
              className="fas fa-check"
            ></i>
          </>
        ) : (
          <>
            <input
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
              type="text"
              placeholder="🖊️ Add item..."
            />
            <i
              onClick={addToDo}
              className="fas fa-plus"
            ></i>
          </>
        )}
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div key={obj.id} className={`todo ${obj.status ? 'completed' : ''}`}>
              <div className="left">
                <input
                  type="checkbox"
                  checked={obj.status}
                  onChange={() => toggleStatus(obj.id)}
                />
                <p>{obj.text}</p>
              </div>
              <div className="right">
                <i
                  onClick={() => editToDo(obj.id)}
                  className="fas fa-edit"
                ></i>
                <i
                  onClick={() => deleteToDo(obj.id)}
                  className="fas fa-times"
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

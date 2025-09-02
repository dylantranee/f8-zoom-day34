// Counter App

function CounterApp() {
  const [count, setCount] = React.useState(0);

  return (
    <main>
      <div className="container">
        <h1 className="site-title">Counter App</h1>
        <p
          className={`
					count
					${count > 0 ? "positive" : count < 0 ? "negative" : "zero"}
				`}
        >
          {count}
        </p>
        <p
          className={`
					status
					${count > 0 ? "positive" : count < 0 ? "negative" : "zero"}
				`}
        >
          {count > 0 ? "Positive" : count < 0 ? "Negative" : "Zero"}
        </p>
        <button
          className="btn btn--increase"
          onClick={() => setCount(count + 1)}
        >
          Increase
        </button>
        <button
          className="btn btn--decrease"
          onClick={() => setCount(count - 1)}
        >
          Decrease
        </button>
        <button className="btn btn--reset" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </main>
  );
}

// Todo List App

let uniqId = 0;

function TodoApp() {
  const [inputValue, setInputValue] = React.useState("");
  const [todos, setTodos] = React.useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: ++uniqId, text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id != id));
  };

  const handleChecked = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const { completedTasks, remainingTasks } = React.useMemo(() => {
    return todos.reduce(
      (count, todo) => {
        if (todo.completed) {
          count.completedTasks += 1;
        } else {
          count.remainingTasks += 1;
        }
        return count;
      },
      { completedTasks: 0, remainingTasks: 0 }
    );
  }, [todos]);

  const renderStatistics = () => {
    if (todos.length === 0) {
      return null;
    }
    return (
      <>
        <p>
          <span className="accent-text">Total:</span> {todos.length}
        </p>
        <p>
          <span className="accent-text">Completed:</span> {completedTasks}
        </p>
        <p>
          <span className="accent-text">Remaining:</span> {remainingTasks}
        </p>
      </>
    );
  };

  const renderTodo = () => {
    if (todos.length === 0) {
      return <li className="no-tasks">No tasks yet. Add your first task</li>;
    } else {
      return todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleChecked(todo.id)}
          />
          <p className={`todo-text ${todo.completed ? "line-through" : ""}`}>
            {todo.text}
          </p>
          <button
            className="btn btn--delete"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </li>
      ));
    }
  };

  return (
    <main>
      <div className="container">
        <h1>Todo List App</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Input new task..."
            className="input-text"
          />
          <button type="submit" className="btn btn--add">
            Add
          </button>
        </form>
        <ul className="todo-list">{renderTodo()}</ul>
        <div className="statistics">{renderStatistics()}</div>
      </div>
    </main>
  );
}

// Profile Card App

function ProfileCard() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      <div className="container">
        <h1>Profile Card</h1>
        {!user ? (
          <div className="card">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="card">
            <p className="card-detail">
              <span className="accent-text">Name:</span> {user.name}
            </p>
            <p className="card-detail">
              <span className="accent-text">Username:</span> {user.username}
            </p>
            <p className="card-detail">
              <span className="accent-text">Email:</span> {user.email}
            </p>
            <p className="card-detail">
              <span className="accent-text">Phone:</span> {user.phone}
            </p>
            <p className="card-detail">
              <span className="accent-text">Website: </span> {user.website}
            </p>
            <p className="card-detail">
              <span className="accent-text">Address (street, city):</span>{" "}
              {`${user.address.street}, ${user.address.city}`}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

// Render

const rootElement = document.querySelector("#root");

if (rootElement) {
  const appName = rootElement.getAttribute("data-app");

  let app = null;
  switch (appName) {
    case "counter":
      app = <CounterApp />;
      break;
    case "todo":
      app = <TodoApp />;
      break;
    case "profile":
      app = <ProfileCard />;
      break;
    default:
      app = null;
  }

  if (app) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(app);
  }
}

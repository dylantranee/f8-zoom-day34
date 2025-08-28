function Counter() {
	const [count, setCount] = React.useState(0)

	return (
		<>
			<main>
				<div class="container">
					<h1 className="site-title">Counter App</h1>
					<p className={`
						count
						${count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero'}
					`}>
						{count}
					</p>
					<p className={`
						status
						${count > 0 ? 'positive' : count < 0 ? 'negative' : 'zero'}
					`}>
						{count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero'}
					</p>
					<button
						className="btn btn--increase"
						onClick={() => setCount(count + 1)}
					>
						Increase
					</button >
					<button
						className="btn btn--decrease"
						onClick={() => setCount(count - 1)}
					>
						Decrease
					</button>
					<button
						className="btn btn--reset"
						onClick={() => setCount(0)}
					>
						Reset
					</button>
				</div>
			</main>
		</>
	)
}

const app = (
	<Counter />
)

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(app)

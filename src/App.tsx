import { useState } from "react"

interface PostProps {
  title: string
  content: string[]
  onItemSelected: (index: number) => void
}

function PostList({ title, content, onItemSelected }: PostProps) {
  console.log('Post')
  const [clickedIndex, setClickedIndex] = useState(-1)

  const onClick = (index: number, item: string): void => {
    console.log('clicked on item ', index, item)
    setClickedIndex(index)
    onItemSelected(index)
  }
  return (
    <>
      <h1>{title}</h1>
      {(content.length == 0) && <p>No Items</p>}
      <ul className="list-group">
        {
          content.map(
            (item, index) => {
              return (
                <li
                  className={(clickedIndex == index) ? "list-group-item active" : "list-group-item"}
                  key={index}
                  onClick={() => onClick(index, item)}
                >An item: {item} index {index}</li>
              )
            }
          )
        }
      </ul>
    </>
  )
}

function App() {
  const [displayAlert, setDisplayAlert] = useState(false)
  console.log('App')
  const array = ['An item', 'A second item', 'A third item', 'A fourth item', 'And a fifth one']
  const array2 = ['black', 'white', 'red', 'blue', 'green']
  return (
    <div>
      {(displayAlert) &&
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Holy guacamole!</strong> You should check in on some of those fields below.
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setDisplayAlert(false)}></button>
        </div>
      }
      <PostList title="This My Title" content={array} onItemSelected={(index) => { console.log("item selected iun first list" + index) }} />
      <PostList title="This My Colors" content={array2} onItemSelected={(index) => { console.log("color selected " + array2[index]) }} />
      <button type="button" className="btn btn-primary" onClick={() => { setDisplayAlert(true) }}>Display Alert</button>
    </div>

  )
}

export default App

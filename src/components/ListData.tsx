import { Button, Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { IState } from "../models/recipe.model"

const ListData: React.FC<IState> = ({ recipe }): JSX.Element => {

    const renderList = (list: string[]):JSX.Element => {
      return(
        <ol>
          {list.map((item, index) => {
            return<li key={index}>
              {item}
            </li>
          })}
        </ol>
      )
    }


    return<Container className="d-flex flex-wrap pt-2">
    {
      recipe.map(res => {
        return(<div key={res.id} >
            <Card  className='mb-2 mt-2 me-2'>
            <Card.Body>
              <Card.Title> {res.title} </Card.Title>
              <Card.Text>
              Cooking time: {res.cookingTime} 
              </Card.Text>
              <Link to={`/recipe-book/list/${res.id}`} key={res.id}>
              <Button variant="primary">Recipe</Button>
              </Link>
            </Card.Body>
          </Card>
          </div>)
      })
    }
    </Container>
  }

  export default ListData;
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom"
import { projectFirestore } from "../firebase/config";
import Loader from "../loader/Loader";
import { IState } from "../models/recipe.model";

const Recipe = () => {

    const { recipeId } = useParams();
    const [data, setData] = useState<IState['recipe'][0] | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | boolean>(false);
 
    useEffect(() => {
        setIsPending(true)

        projectFirestore.collection('cooking')
        .doc(recipeId)
        .get()
        .then(doc => {
            if(doc.exists){
                setIsPending(false)
                setData({
                    id: doc.id,
                    title: doc.data()!.title,
                    cookingTime: doc.data()!.cookingTime,
                    ingredients: doc.data()!.ingredients,
                    method: doc.data()!.method,
                });
            }else{
                setError("Recipe does not exist in database")
                setIsPending(false)
            }
        }).catch(err => {
            setError(err.message)
            setIsPending(false)
        })

    }, [recipeId])

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


    return<>
        {error && <p> {error} </p>}
        {isPending &&  <Loader /> }
        {data && 
            <Card>
                <Card.Header className="sticky"><Container > 
                    <blockquote  className="blockquote mb-0">
                      { data.title.toUpperCase() } 
                    </blockquote>
                            </Container>
                </Card.Header>
                <Container> 
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <Card.Title>
                            Cooking time: {data.cookingTime}
                        </Card.Title>
                        <Card.Text>
                            Ingredients
                        </Card.Text>
                        <div className="ms-2">
                            {renderList(data.ingredients)}
                        </div>
                        <Card.Text>
                            Method
                        </Card.Text>
                        <div className="ms-2">
                            {renderList(data.method)}
                        </div>
                        </blockquote>
                    </Card.Body>
                </Container>
            </Card>}
    </>
}

export default Recipe;
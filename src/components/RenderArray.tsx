import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IList } from "../models/recipe.model";



const RenderArray: React.FC<IList> = ({ title, sub }) => {
    const [totalIngredients, setTotalIngredients] = useState<string[]>([sub]);
    
    return(
        <>
            <Form.Label> {title} </Form.Label>
            {
                totalIngredients.map((element, index) => {
                    const holder = `${sub} ${index + 1}`
                    return <Form.Control size="sm" key={index} className="mt-2" type="text" placeholder={holder} />
                })
            }
            <Button size="sm" className="mt-2" variant="primary" onClick={() => setTotalIngredients([...totalIngredients, sub])} >
               Add
            </Button> 
            <Button size="sm" className="mt-2 ms-2" variant="primary" 
                onClick={() => setTotalIngredients(totalIngredients.slice(0, -1))}
                disabled={totalIngredients.length >= 2 ? false : true}
                >
               Remove
            </Button>
            
        </>
    )
}

export default RenderArray;
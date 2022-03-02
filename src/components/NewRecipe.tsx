import React, { useRef, useState } from "react";
import { Alert, Button, Container, Form, InputGroup } from "react-bootstrap";
import { projectFirestore } from "../firebase/config";
import { IState } from "../models/recipe.model";
import { useNavigate } from 'react-router-dom'
import RenderArray from "./RenderArray";


const NewRecipe: React.FC = () => {

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const titleRef = useRef<HTMLInputElement | null>(null)
    const timeRef = useRef<HTMLInputElement | null>(null)
    const ingredientRef = useRef<HTMLInputElement | null>(null)
    const methodRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if(titleRef.current?.value === "" || timeRef.current?.value === ""){
            return setError("All fields are required");
        }
        const ingredientsArray = createArr([].slice.call( ingredientRef.current?.children ).slice(1,-2) as HTMLInputElement[]);  
        const methodArray = createArr([].slice.call( methodRef.current?.children ).slice(1,-2) as HTMLInputElement[]);

        if(ingredientsArray.includes("") || methodArray.includes("")){
            return setError("Either fill all fields or remove them");
        }

        const createObject: IState['recipe'][0] = {
            title: titleRef.current!.value,
            cookingTime: `${timeRef.current!.value} minutes`,
            ingredients: ingredientsArray,
            method: methodArray,
        }

        Submit(createObject)
        
    }

    const Submit = async (doc: IState['recipe'][0]) => {
    
        setSuccess(true)
        try{
           await projectFirestore.collection('cooking').add(doc)
           window.location.reload();
        } catch(err){
            console.log(err)
        }
    }

    const createArr = (ingredientsArray: HTMLInputElement[]) => {
        const valueArray = ingredientsArray.map(x => {
            return x.value;
        })
        
        return valueArray
    }

    return <Container>
    <h2>New recipe</h2>
    <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formbasicRecipe">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Recipe name" ref={titleRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cooking Time</Form.Label>
            <InputGroup>
            <Form.Control type="text" placeholder="Time to cook" ref={timeRef} />
            <InputGroup.Text id="basic-addon2">minutes</InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-muted">
            Cooking time in minutes i.e 5
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" ref={ingredientRef} >
            <RenderArray title="Ingredients" sub="ingredient"  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" ref={methodRef} >
            <RenderArray title="Method" sub="step"  />
        </Form.Group>
        { error && <Alert variant='danger'  onClose={() => setError("")} dismissible>{ error }</Alert>}
        { success && <Alert variant='success'> Recipe added successfully, redirecting... </Alert>}
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
    </Container>
}




export default NewRecipe;

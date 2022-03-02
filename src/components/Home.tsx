

import React, { useEffect, useState, Suspense } from 'react';
import { projectFirestore } from '../firebase/config';
import Loader from '../loader/Loader';
import { IState } from '../models/recipe.model'
import Footer from './Footer';
const NewRecipe = React.lazy(() => import('./NewRecipe'));
const ListData = React.lazy(() => import('../components/ListData'));


function Home() { 

  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<IState["recipe"] | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);

  useEffect(() => {
    // we are starting fetching data, so
    setIsPending(true);

    projectFirestore.collection('cooking')
    .get()
    .then((snapshot) => {
      if(snapshot.empty){
        setError('No recipes to load');
        setIsPending(false);
      }else{
        let results: IState["recipe"] | null  = []
        snapshot.docs.forEach(doc => {
          results!.push({ id: doc.id, 
                          title: doc.data().title, 
                          cookingTime: doc.data().cookingTime,
                          ingredients: doc.data().ingredients,
                          method: doc.data().method,
                         })
        })
        setData(results)
        setIsPending(false)
      }
    }).catch(err => {
        setError(err.message)
        setIsPending(false)
    })

  }, [])

  return (<>
    {open ?
     <Suspense fallback={<Loader />}>
       <NewRecipe /> 
     </Suspense>
     : 
    <>
        {error && <p> {error} </p>}
        {isPending && <Loader />}
        {data && <Suspense fallback={<Loader />} >
        <ListData recipe={data} />
        </Suspense>}
    </>}
        <Footer setOpen={setOpen} open={open}  />
    </>);
}

export default Home;

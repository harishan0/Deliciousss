import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    let params = useParams();

    const getSearchedRecipes = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=243523baee43496abeb8f2be40385b75&query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results); 
    };
    useEffect(()=>{
        getSearchedRecipes(params.search); 
    }, [params.search])
    return(
        <Grid>
      {searchedRecipes.map((item) => {
        return(
            <Card key={item.id}>
                <Link to={'/recipe/'+item.id}>
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
                
                </Link>
            </Card>
        );
      })}
    </Grid>
)
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    grid-gap: 3rem;
`;
const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem; 
    }
    a{
        text-decoration: none; 
    }
    h4{ 
        text-align: center;
        padding: 1rem; 
    }
`;

export default Searched;

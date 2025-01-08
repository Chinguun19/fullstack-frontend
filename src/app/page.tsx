"use client"
import { error } from "console";
import Error from "next/error";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  name: string
}

export default function Home() {
  const [movieData, setMovieData] = useState<Movie[]>([])

async function fetchData() {
const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies`)
const data = await res.json();
const movies = data.movies
console.log(movies)
setMovieData(movies)
}



async function editMovie (id: number, name) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/update/${id}`  
  await fetch (url, {
     method: 'Put',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(name),
   })
}

async function deleteMovie(id: number) {

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/delete/${id}`  
 await fetch (url, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response)=> {
    if(!response.ok) {
    }
  })


}

  useEffect(() => {
    fetchData();
  }, [])

// async function deleteMovie() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies/delete`)

// }


  return (
<div>
  {movieData.map((movie) => (
    <div className="text-black text-[20px]" key={movie.id}>{movie.name} {movie.id}
    
    <button onClick={() => deleteMovie(movie.id)} className="ml-2">x</button>
    <button onClick={() => editMovie(movie.id)} className="ml-2">edit</button>
 
    </div>
  ))
    
  }

</div>
  );
}

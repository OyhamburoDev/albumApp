interface ImageTestI {
  descripcion: string;
  url: string;
  id: number;
}

enum categories {
  MOVIES = "movies",
  OUTDOOR = "outdoor",
  FOOD = "food",
}

interface UserI {
  nombre: string;
  id: number;
  edad: number;
  telefono: number;
  direccion: {
    calle: string;
    ciudad: string;
    numero: number;
    pais: string;
  };
}

interface MoviesI {
  anio: number;
  director: string;
  id: number;
  posterUrl: string;
  titulo: string;
}

interface addMovieI {
  titulo: string;
  director: string;
  anio: number;
}

export { ImageTestI, categories, UserI, MoviesI, addMovieI };

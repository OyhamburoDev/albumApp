import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseURL from "./realtimeDataBase";
import {
  ImageTestI,
  UserI,
  MoviesI,
  addMovieI,
} from "../components/TestHome/interface";

export const testApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    // Traer datos del usuario
    getUsuario: builder.query<UserI, void>({
      query: () => "user.json",
    }),
    // Trear lista de imagenes
    getImagenes: builder.query<Record<string, ImageTestI>, void>({
      query: () => "images.json",
    }),
    // Traer lista de peliculas
    getMovies: builder.query<Record<string, MoviesI>, void>({
      query: () => "movies.json",
    }),
    addPelicula: builder.mutation<void, addMovieI>({
      query: (nuevaPelicula) => ({
        url: "favoriteMovies.json",
        method: "POST",
        body: nuevaPelicula,
      }),
    }),
  }),
});

export const {
  useGetUsuarioQuery,
  useGetImagenesQuery,
  useGetMoviesQuery,
  useAddPeliculaMutation,
} = testApi;

// class UserService {
//   getUser = async () => {
//     try {
//       const response = await fetch(
//         "https://dp4vqfns-3030.brs.devtunnels.ms/usuario"
//       );
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   getFavoriteMovies = async () => {
//     try {
//       const response = await fetch("http://192.168.100.94:3000/peliculas");
//       console.log("Status de respuesta:", response.status);
//       if (!response.ok) {
//         throw new Error("Error trayendo película favoritas");
//       }
//       const data = await response.json();
//       console.log("Datos de movies", data);
//       return data;
//     } catch (error) {
//       console.error("Error en getFavoriteMovies:", error);
//     }
//   };
//   getImages = async () => {
//     try {
//       const response = await fetch(
//         "https://dp4vqfns-3030.brs.devtunnels.ms/imagenes"
//       );
//       const data = await response.json(); // <- transformamos la respuesta en datos
//       return data; // <- retornamos los datos procesados
//     } catch (error) {
//       console.error(error);
//     }
//   };
// }

// const NewUserService = new UserService();

// export default NewUserService;

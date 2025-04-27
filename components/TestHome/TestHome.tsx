import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import {
  useGetUsuarioQuery,
  useGetImagenesQuery,
  useGetMoviesQuery,
  useAddPeliculaMutation,
} from "../../api/test.service";
import { useState } from "react";

export default function TestHome() {
  // Hooks
  const { data, error, isLoading } = useGetUsuarioQuery();
  const { data: imagenesData } = useGetImagenesQuery();
  const { data: moviesData } = useGetMoviesQuery();
  const [titulo, setTitulo] = useState("");
  const [director, setDirector] = useState("");
  const [anio, setAnio] = useState("");
  const [msjInput, setMsjInput] = useState(false);
  const [addPelicula] = useAddPeliculaMutation();

  // Chequeos iniciales
  if (isLoading) return <Text>Cargando usuario...</Text>;
  if (error) return <Text>Error al cargar usuario</Text>;

  // Procesar data
  const imagenesArray = Object.values(imagenesData ?? {});
  const moviesArray = Object.values(moviesData ?? {});

  const handleAgregarPelicula = async () => {
    if (titulo && director && anio) {
      try {
        await addPelicula({
          titulo,
          director,
          anio: parseInt(anio),
        }).unwrap();

        setTitulo("");
        setDirector("");
        setAnio("");
        setMsjInput(false);
        console.log("Película agregada correctamente");
      } catch (error) {
        console.error("Error al agregar película", error);
      }
    } else {
      setMsjInput(true);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {/* DATOS DEL USUARIO */}
      <View
        style={{
          alignItems: "center",
          padding: 20,
          backgroundColor: "#FFC0CB",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Datos del Usuario
        </Text>
        <Text>Nombre: {data?.nombre}</Text>
        <Text>Edad: {data?.edad}</Text>
        <Text>Teléfono: {data?.telefono}</Text>
        <Text style={{ marginTop: 10, fontWeight: "bold" }}>Dirección:</Text>
        <Text>- Calle: {data?.direccion.calle}</Text>
        <Text>- Ciudad: {data?.direccion.ciudad}</Text>
        <Text>- Número: {data?.direccion.numero}</Text>
        <Text>- País: {data?.direccion.pais}</Text>
      </View>

      {/* FOTOS FAVORITAS */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 10 }}>
          Fotos favoritas
        </Text>

        {imagenesArray.map((item) => (
          <View
            key={item.id}
            style={{ marginBottom: 20, alignItems: "center" }}
          >
            <Image
              source={{ uri: item.url }}
              style={{
                width: 250,
                height: 250,
                borderRadius: 20,
                marginBottom: 10,
                backgroundColor: "#eee",
              }}
            />
            <Text style={{ fontSize: 16 }}>{item.descripcion}</Text>
          </View>
        ))}
      </View>

      {/* PELÍCULAS FAVORITAS */}
      <View
        style={{ alignItems: "center", backgroundColor: "pink", padding: 20 }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Películas Favoritas
        </Text>

        {moviesArray.map((item) => (
          <View
            key={item.id}
            style={{ marginBottom: 20, alignItems: "center" }}
          >
            <Image
              source={{ uri: item.posterUrl }}
              style={{
                width: 250,
                height: 250,
                borderRadius: 20,
                marginBottom: 10,
                backgroundColor: "#eee",
              }}
            />
            <Text style={{ fontSize: 16 }}>{item.titulo}</Text>
            <Text style={{ fontSize: 16 }}>{item.anio}</Text>
          </View>
        ))}
      </View>

      {/* FORMULARIO PARA AGREGAR PELÍCULA */}
      <View
        style={{ backgroundColor: "black", paddingBottom: 30, paddingTop: 20 }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginBottom: 10,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Agregar nueva película
        </Text>

        <TextInput
          placeholder="Agregar título"
          value={titulo}
          onChangeText={setTitulo}
          style={{
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
            width: "80%",
            alignSelf: "center",
          }}
        />
        <TextInput
          placeholder="Agregar director"
          value={director}
          onChangeText={setDirector}
          style={{
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
            width: "80%",
            alignSelf: "center",
          }}
        />
        <TextInput
          placeholder="Agregar año"
          value={anio}
          onChangeText={setAnio}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: "white",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
            width: "80%",
            alignSelf: "center",
          }}
        />

        {msjInput && (
          <Text
            style={{ color: "white", textAlign: "center", marginBottom: 10 }}
          >
            Debes completar todos los campos
          </Text>
        )}

        <TouchableOpacity
          onPress={handleAgregarPelicula}
          style={{
            backgroundColor: "red",
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 10,
            width: "80%",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Agregar Película</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

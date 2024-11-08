const apiUrl = "https://672bdcc21600dda5a9f697d0.mockapi.io/users";



    // Función para obtener todos los registros
async function fetchAllRecords() {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Error al obtener la lista de registros");
    return response.json();
    console.log(response);
}

  // Función para obtener un registro por ID
  async function fetchRecordById(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) throw new Error("Registro no encontrado");
    return response.json();
}

// Función para agregar un nuevo registro
async function createRecord(data) {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("No se pudo agregar el registro");
    return response.json();
}

// Función para modificar un registro por ID
async function updateRecord(id, data) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("No se pudo modificar el registro");
    return response.json();
}

// Función para eliminar un registro por ID
async function deleteRecord(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("No se pudo eliminar el registro");
    return response.json();
}
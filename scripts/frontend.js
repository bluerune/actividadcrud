const registros =[];

const btnGet1 = document.getElementById ("btnGet1");


    const results = document.getElementById("results");
    const alertError = document.getElementById("alert-error");

  
  
  
// Mostrar resultados en la lista
    function displayResults(data) {
        results.innerHTML = "";
        data.forEach((item) => {
            results.innerHTML += `<li class="list-group-item">${item.id} - ${item.name} ${item.lastname}</li>`;
        });
    };

// Mostrar mensajes de error
function showError(message) {
    alertError.textContent = message;
    alertError.classList.add("show");
    setTimeout(() => alertError.classList.remove("show"), 3000);
}


// Evento para el botón "Buscar"
btnGet1.addEventListener("click", async () => {
    const id = document.getElementById("inputGet1Id").value;
    try {
        const data = id ? await fetchRecordById(id) : await fetchAllRecords();
        displayResults(Array.isArray(data) ? data : [data]);
    } catch (error) {
        showError(error.message);
    }
});

//funcion para agregar registros
document.getElementById("btnPost").addEventListener("click", () => {

    const name = document.getElementById("inputPostNombre").value;
    const lastname = document.getElementById("InputPostApellido").value;
    
    if(name && lastname){
        const id = registros.length ? registros[registros.length -1].id + 1 : 1; 
        registros.push({ id, name, lastname});
        document.getElementById("inputPostNombre").value = '';
        document.getElementById("InputPostApellido").value = '';
        displayResults(registros)
    } 
    else{
        mostrarError('Debe completar todos los campos');
    }
}
)

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
    mostrarRegistros();
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
    mostrarRegistros();
    if (!response.ok) throw new Error("No se pudo modificar el registro");
    return response.json();
}

// Función para eliminar un registro por ID
async function deleteRecord(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("No se pudo eliminar el registro");
    mostrarRegistros();
    return response.json();
}
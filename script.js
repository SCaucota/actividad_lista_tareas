let nuevaTareaInput = document.getElementById("inputIngreso");
let listaTareas = document.getElementById("listaTareas");
let botonBorrarLista = document.getElementById("eliminarLista");
let botonCambiarLista = document.getElementById("cambiarLista");
let arrayTareas = [];
let arrayFinalizadas = [];

actualizarLista();

function agregarTarea() {
    if(nuevaTareaInput.value.trim() !== ""){
        let tarea = {
            texto: nuevaTareaInput.value,
            completada: false
        };
        arrayTareas.push(tarea);
        nuevaTareaInput.value = "";
        actualizarLista();
    }
}

function actualizarLista() {
    listaTareas.innerHTML = "";

    if(arrayTareas.length === 0){
        mensajeListaVacia();
        botonBorrarLista.style.display = "none";
        botonCambiarLista.style.display = "none";
        if(arrayFinalizadas.length !== 0){
            botonCambiarLista.style.display = "flex";
            botonBorrarLista.style.display = "flex";

        }
    } else {
        botonBorrarLista.style.display = "flex";

        for(let i = 0; i < arrayTareas.length; i++) {
            let tarea = arrayTareas[i];
            let nuevaTarea = document.createElement("li");
            nuevaTarea.className = "tareas";
            nuevaTarea.textContent = tarea.texto;
            let divIcon = document.createElement("div");
            divIcon.className = "divIcon";
            let divContainerTarea = document.createElement("div");
            divContainerTarea.className = "divContainerTarea";

            let completada = document.createElement("input");
            completada.type = "checkbox";
            completada.checked = tarea.completada;

            completada.addEventListener("change", function() {
                if(completada.checked){
                    tarea.completada = true;
                    arrayFinalizadas.push(tarea);
                    arrayTareas.splice(i, 1);
                    botonCambiarLista.style.display = "flex";
                    botonCambiarLista.textContent = "Mostrar Completadas";
                }
                actualizarLista();
            });

            let botonEliminar = document.createElement("div");
            botonEliminar.innerHTML = '<img src="basurero.png" alt="eliminar">';
            botonEliminar.className = "eliminar";
            botonEliminar.onclick = function() {
                arrayTareas.splice(i, 1);
                actualizarLista();
            };

            listaTareas.appendChild(divContainerTarea);
            divContainerTarea.appendChild(nuevaTarea);
            divContainerTarea.appendChild(divIcon);
            divIcon.appendChild(completada);
            divIcon.appendChild(botonEliminar);
        }
    }
};

function cambiarLista() {
    if(botonCambiarLista.textContent === "Mostrar Completadas"){
        listaTareas.innerHTML = "";
        for(let i = 0; i < arrayFinalizadas.length; i++){
            let tarea = arrayFinalizadas[i];
            let tareaCompletada = document.createElement("li");
            tareaCompletada.classList.add("tareas")
            tareaCompletada.textContent = tarea.texto;
    
            listaTareas.appendChild(tareaCompletada);
        };
        botonCambiarLista.textContent = "Mostrar Pendientes";
    }else if(botonCambiarLista.textContent === "Mostrar Pendientes"){
        actualizarLista();botonCambiarLista.textContent = "Mostrar Completadas";
    }
};

function mensajeListaVacia(){
    let mensaje = document.createElement('p');
    mensaje.textContent = "Sin tareas pendientes";

    listaTareas.appendChild(mensaje);
};


function borrarLista() {
    if(arrayTareas.length > 0 && arrayFinalizadas.length === 0){
        arrayTareas = [];
        mensajeListaVacia();
        actualizarLista();
    }else if(botonCambiarLista.textContent === "Mostrar Completadas"){
        arrayTareas = [];
        mensajeListaVacia();
        actualizarLista();
    }else if(botonCambiarLista.textContent === "Mostrar Pendientes"){
        arrayFinalizadas = [];
        botonCambiarLista.style.display = "none";
        actualizarLista();
    }
};

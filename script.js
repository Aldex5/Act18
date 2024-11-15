$(document).ready(function () {
    let taskId = 0;

    // Inicializar DataTable
    const table = $("#tablaTareas").DataTable({
        language: {
            url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
        }
    });

    // Agregar tarea
    $("#formTarea").on("submit", function (e) {
        e.preventDefault();
        const tarea = $("#nombreTarea").val();
        const prioridad = $("#prioridadTarea").val();

        // Incrementar ID
        taskId++;

        // Agregar fila a la tabla
        table.row.add([
            taskId,
            tarea,
            prioridad,
            `<button class="editar">Editar</button>
             <button class="eliminar">Eliminar</button>`
        ]).draw();

        // Limpiar formulario
        $(this)[0].reset();
    });

    // Editar tarea
    $("#tablaTareas").on("click", ".editar", function () {
        const row = table.row($(this).closest("tr"));
        const data = row.data();

        const nuevaTarea = prompt("Editar tarea:", data[1]);
        const nuevaPrioridad = prompt("Editar prioridad (Alta, Media, Baja):", data[2]);

        if (nuevaTarea && nuevaPrioridad) {
            row.data([data[0], nuevaTarea, nuevaPrioridad, data[3]]).draw();
        }
    });

    // Eliminar tarea
    $("#tablaTareas").on("click", ".eliminar", function () {
        const row = table.row($(this).closest("tr"));
        row.remove().draw();
    });
});

const bindButtons = () => {
    const getExercise = (exerciseElement) => {
        let selectedExercise = exerciseElement.parentElement.parentElement;
        let exercise = {
            'id': selectedExercise.querySelector(".exerciseId").value,
            'name': selectedExercise.querySelector(".exerciseName").value,
            'reps': selectedExercise.querySelector(".exerciseReps").value,
            'weight': selectedExercise.querySelector(".exerciseWeight").value,
            'date': selectedExercise.querySelector(".exerciseDate").value,
            'lbs': selectedExercise.querySelector(".exerciseLbs").value,
        }
        return exercise;
    }

    Array.from(document.getElementsByClassName('editExercise')).forEach((element) => {
        element.addEventListener('click', function (event) {
            const exercise = getExercise(this);
            toggleExerciseEdit(true, exercise);
        });
    });

    Array.from(document.getElementsByClassName('deleteExercise')).forEach((element) => {
        element.addEventListener('click', function (event) {
            const exercise = getExercise(this);
            toggleExerciseDelete(true, exercise);
        });
    });
}

const showStatusMessage = (show, message) => {
    const statusElement = document.getElementById('statusMessage');
    if (!show) {
        statusElement.innerHTML = '';
    }
    else {
        if (message.success) {
            statusElement.innerHTML = `<div class="alert alert-secondary" role="alert">
            ` + message.message + `</div>`
        }
        else {
            statusElement.innerHTML = `<div class="alert alert-danger" role="alert">
                ` + message.message + `</div>`
        }
    }
}

const loadExercises = () => {
    const exerciseElement = document.getElementById('exercises');
    exerciseElement.innerHTML = `<div class="alert alert-secondary" role="alert">
        Loading...
    </div>`
    var template = Handlebars.templates['exercises'];
    var context = { results: [] };

    context.results = [];
    let req = new XMLHttpRequest();
    req.open('GET', './exercises', true);
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            context = JSON.parse(req.responseText)
            var exerciseTable = template(context);
            exerciseElement.innerHTML = exerciseTable;
            bindButtons();
        } else {
            console.log('failed');
        }
    });

    req.send(null);
}

//Delete Exercises
const toggleExerciseDelete = (show, exercise) => {
    showStatusMessage(false);
    if (show) {
        document.getElementById('modalDeleteId').value = exercise.id;
        document.getElementById('modalDeleteExerciseBody').innerHTML = "Are you sure you would like to delete " + exercise.name;
        $('#modalDeleteExercise').modal('show');
    }
    else {
        document.getElementById('modalDeleteId').value = '';
        document.getElementById('modalDeleteExerciseBody').innerHTML = "";
        $('#modalDeleteExercise').modal('hide');
    }
}

const deleteExercise = (exercise) => {
    //Send Exercise Detail To Server
    let req = new XMLHttpRequest();
    req.open('DELETE', './exercise', true);
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            showStatusMessage(true, JSON.parse(req.responseText));
        } else {
            showStatusMessage(true, { success: false, message: "An unknown error occurred, detail not saved." });
            console.log('failed');
        }
        loadExercises();
    });
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(exercise));
}

//Update/Edit Exercises
const toggleExerciseEdit = (show, exercise) => {
    showStatusMessage(false);
    document.getElementById('modalEditExerciseForm').classList.remove('needs-validation');
    if (show) {
        document.getElementById('modalEditId').value = exercise.id;
        document.getElementById('modalEditName').value = exercise.name;
        document.getElementById('modalEditReps').value = exercise.reps;
        document.getElementById('modalEditWeight').value = exercise.weight;
        document.getElementById('modalEditDate').value = exercise.date;
        document.getElementById('modalEditLbs').selectedIndex = exercise.lbs;
        $('#modalUpdateExercise').modal('show');
    }
    else {
        document.getElementById('modalEditLbs').selectedIndex = 0;
        $('#modalUpdateExercise').modal('hide');
    }
}

const saveExercise = (exercise) => {
    //Send Exercise Detail To Server
    let req = new XMLHttpRequest();
    req.open('POST', './exercise', true);
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            showStatusMessage(true, JSON.parse(req.responseText));
        } else {
            showStatusMessage(true, { success: false, message: "An unknown error occurred, detail not saved." });
            console.log('failed');
        }
        loadExercises();
    });
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(exercise));
}

const handleForms = (form) => {
    let exercise = {};
    let formAction;
    let lbsField;
    switch (form.id) {
        case "newExerciseForm":
            lbsField = document.getElementById('newExerciseLbs');
            exercise = {
                'id': 0,
                'name': document.getElementById('newExerciseName').value,
                'reps': document.getElementById('newExerciseReps').value,
                'weight': document.getElementById('newExerciseWeight').value,
                'date': document.getElementById('newExerciseDate').value,
                'lbs': lbsField.options[lbsField.selectedIndex].value
            }
            formAction = saveExercise;
            break;

        case "modalEditExerciseForm":
            lbsField = document.getElementById('modalEditLbs');
            exercise = {
                'id': document.getElementById('modalEditId').value,
                'name': document.getElementById('modalEditName').value,
                'reps': document.getElementById('modalEditReps').value,
                'weight': document.getElementById('modalEditWeight').value,
                'date': document.getElementById('modalEditDate').value,
                'lbs': lbsField.options[lbsField.selectedIndex].value
            }
            toggleExerciseEdit(false);
            formAction = saveExercise;
            break;

        case "modalDeleteExerciseForm":
            exercise = {
                'id': document.getElementById('modalDeleteId').value
            }
            toggleExerciseDelete(false);
            formAction = deleteExercise;
            break;
    }

    formAction(exercise);

    //Reset Form
    const inputs = form.getElementsByClassName('clear-control');
    Array.from(inputs).forEach((input) => {
        input.value = '';
    });
    form.classList.remove("was-validated");
}

//Adapted from bootstrap API docs. 
window.addEventListener('load', function () {
    loadExercises();
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
                form.classList.add('was-validated');
                showStatusMessage(false);
            }
            else {
                handleForms(form);
            }
        }, false);
    });

    $('.datepicker').datepicker({
        format: 'mm-dd-yyyy'
    });
}, false);
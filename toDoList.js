//No Task Found row create
function noTask() {
    let tb = document.getElementById('tbody');
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerText = "No Task Found";
    td.setAttribute('colspan', '5');
    tr.appendChild(td);
    tb.appendChild(tr);
}
noTask();

//Main array to store the data
var mainData = [];
var id = 100;

//Get data from input
function getData() {
    let taskItem = document.getElementById('taskInput').value;
    let taskDate = document.getElementById('dateInput').value;

    if (taskDate == '' || taskInput == '') {
        alert('Enter Required Details')
        return;
    }

    var data = {
        taskItem,
        taskDate,
        status: "In progress",
        id,
    }

    mainData.push(data);
    id++;
    table(mainData);
}

document.getElementById('addTask').addEventListener('click', getData);


//Function to create table after add data
function table(array, toggle = true) {

    document.getElementById('tbody').innerHTML = "";

    if (array.length != 0) {

        array.forEach((elem, i) => {

            let row = document.createElement('tr');

            let sNoTd = document.createElement('td');
            sNoTd.innerText = i + 1;
            row.appendChild(sNoTd);

            for (let i in elem) {
                if (elem[i] != elem.id) {
                    let td = document.createElement('td');
                    td.innerText = elem[i];
                    row.appendChild(td);
                }
            }

            //Create td for action button
            let tdForAction = document.createElement('td');

            //Create del button
            let delBtn = document.createElement('button');
            delBtn.innerText = "Delete";
            delBtn.setAttribute('class', "btn btn-danger");
            delBtn.setAttribute('type', "button");
            delBtn.setAttribute('id', elem.id);

            //Del button functionality
            delBtn.onclick = () => {
                array = array.filter((ob) => ob.id != elem.id);
                mainData = mainData.filter((ob) => ob.id != elem.id);
                table(array);
            }

            tdForAction.appendChild(delBtn);

            //Create finish button
            if (elem.status == 'In progress') {
                let finishBtn = document.createElement('button');
                finishBtn.innerText = "Finished";
                finishBtn.setAttribute('class', 'btn btn-success ms-1');
                finishBtn.setAttribute('type', "button");
                finishBtn.setAttribute('id', 'finish' + elem.id);

                //Finish button functionality
                finishBtn.onclick = () => {
                    array[i].status = "Completed";
                    table(array);
                }
                tdForAction.appendChild(finishBtn);
            }

            if (elem.status == 'Completed') {
                let finishBtn = document.createElement('button');
                finishBtn.innerText = "Unfinished";
                finishBtn.setAttribute('class', 'btn btn-success ms-1');
                finishBtn.setAttribute('type', "button");
                finishBtn.setAttribute('id', 'finish' + elem.id);

                //Finish button functionality
                finishBtn.onclick = () => {
                    array[i].status = "In progress";
                    table(array);
                }

                tdForAction.appendChild(finishBtn);
            }


            //create edit button
            let editBtn = document.createElement('button');
            editBtn.innerText = 'Edit';
            editBtn.setAttribute('class', 'btn btn-primary ms-1');
            editBtn.type = 'button';
            editBtn.setAttribute('id', elem.id);

            //edit button functionality
            editBtn.onclick = () => {
                //Create Input field
                let editInput = document.createElement('input');
                editInput.value = elem.taskItem;
                editInput.setAttribute('class', 'ms-1');
                editInput.setAttribute('id', 'input' + elem.id);
                editBtn.remove();

                //create done button
                let doneBtn = document.createElement('button');
                doneBtn.innerText = 'Done';
                doneBtn.type = 'button';
                doneBtn.setAttribute('class', 'ms-1');

                doneBtn.onclick = () => {
                    let editedInput = document.getElementById('input' + elem.id).value;
                    array[i].taskItem = editedInput;
                    table(array);
                }

                tdForAction.appendChild(editInput);
                tdForAction.appendChild(doneBtn);
            }

            tdForAction.appendChild(editBtn);
            row.appendChild(tdForAction)
            document.getElementById('tbody').appendChild(row);
        })

        sort(array, toggle);
    }
    
    else {
        noTask();
    }
}

//Sort by date and status
function sort(sortArray, toggle) {

    if (toggle == true) {
        document.getElementById('sortDate').onclick = () => {
            sortArray.sort((a, b) => {
                if (a.taskDate < b.taskDate) return -1;
                if (a.taskDate > b.taskDate) return 1;
                if (a.taskDate == b.taskDate) return 0;
            });
            table(sortArray, false);
        }
        document.getElementById('sortStatus').onclick = () => {
            sortArray.sort((a, b) => {
                if (a.status < b.status) return -1;
                if (a.status > b.status) return 1;
                if (a.status == b.status) return 0;
            })
            table(sortArray, false);
        }
    }

    if (toggle == false) {
        document.getElementById('sortDate').onclick = () => {
            sortArray.sort((a, b) => {
                if (a.taskDate > b.taskDate) return -1;
                if (a.taskDate < b.taskDate) return 1;
                if (a.taskDate == b.taskDate) return 0;
            });
            table(sortArray, true);
        }
        document.getElementById('sortStatus').onclick = () => {
            sortArray.sort((a, b) => {
                if (a.status > b.status) return -1;
                if (a.status < b.status) return 1;
                if (a.status == b.status) return 0;
            })
            table(sortArray, true);
        }
    }
}

//Search functionality
document.getElementById('searchInput').addEventListener('input', () => {
    if (mainData.length != 0) {
        let searchInput = document.getElementById('searchInput').value;
        if (searchInput == '') {
            table(mainData);
        }
        let searchArr = [];
        mainData.forEach((elem) => {
            if (elem.taskItem.includes(searchInput) || elem.status.includes(searchInput) || elem.taskDate.includes(searchInput)) {
                searchArr.push(elem);
            }
        })
        table(searchArr);
    }
});
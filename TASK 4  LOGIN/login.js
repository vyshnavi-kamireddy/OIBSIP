// localStorage.removeItem('pendinglists');
let pendinglists=JSON.parse(localStorage.getItem('pendinglists')) || [{
    task:"Linked List",
    duedate:"25-08-2025",
}];

let completedlists=JSON.parse(localStorage.getItem('completedlists')) || [{
    task:"Linked List",
    duedate:"25-08-2025",
}];


penddis();
compdis();

let defaultdate=datetimedis();

setInterval(datetimedis,1000);

function datetimedis()
{
    let datetime=new Date();

    let date=datetime.getDate();

    let yearmonths=['January','February','March','April','May','June','July','August','September','October','November','December'];
    let month=yearmonths[datetime.getMonth()];

    let year=datetime.getFullYear();

    let weekdays=['Sunday','Monday','Tuesday','Thursday','Friday','Saturday'];
    let day=weekdays[datetime.getDay()];

    let hoursnormal=datetime.getHours();
    let hours= hoursnormal>12?hoursnormal-12:hoursnormal;
    let noon=hoursnormal>12?'PM':'AM';
    
    let min=datetime.getMinutes();
    min=min<10?'0'+min:min;
    date=date<10?'0'+date:date;

    let sec=datetime.getSeconds();


    let datetimedisplay=`<div class="date"><span>${date}</span> ${month}, ${year}</div><div class="time">${hours}:${min} <span>${noon}</span></div>`;

    document.querySelector('.timedatedisplay').innerHTML=datetimedisplay;

    let dismon=datetime.getMonth()<9?`0${datetime.getMonth()+1}`:`${datetime.getMonth()}`;

    let defaultdate=`${year}-${dismon}-${date}`;
    console.log(date);
    return defaultdate;

}
document.querySelector('.input-date-js').value=defaultdate;



function addfun(){
    let tasktextEle=document.querySelector('.input-text-js');
    let tasktext=tasktextEle.value;
    let taskdateEle=document.querySelector('.input-date-js');
    let taskdate=taskdateEle.value;
    pendinglists.push({
        task:tasktext,
        duedate:taskdate,
    });
    console.log(pendinglists);
    penddis();
    tasktextEle.value="";
    taskdateEle.value=defaultdate;
}


function penddis()
{
    let pentaskslist="";
    pendinglists.forEach((value,index) => {
        let html=`<div class="list-p">
                        <div class="list-left">
                            <button class="list-check" onclick="comfun(${index})"><i class='fa fa-check-square check-round'></i></button>
                            <input class="edit-${index} list-task-p" placeholder="${value.task}">
                        </div>
                        <div class="list-right">
                            <p class="list-date">${value.duedate}</p>
                            <button class="list-edit" onclick="edit(${index})"><i class='fa fa-edit' ></i></button>
                            <button class="list-delete" onclick="
                            pendinglists.splice(${index},1); penddis();"><i class='fa fa-trash' ></i></button>
                        </div>
                    </div>`;
        console.log(html);
        pentaskslist+=html;
    });
    localStorage.setItem('pendinglists',JSON.stringify(pendinglists));
    document.querySelector('.lists-pending').innerHTML=pentaskslist;
}


function comfun(index)
{
    let tasktext=pendinglists[index].task;
    let taskdate=pendinglists[index].duedate;
    completedlists.push({
        task:tasktext,
        duedate:taskdate,
    });
    pendinglists.splice(index,1);
    penddis();
    compdis();
}



function compdis()
{
    let comptaskslist="";
    completedlists.forEach((value,index) => {
        let html=`<div class="list-c">
                        <div class="list-left">
                            <p class="list-task list-task-c">${value.task}</p>
                        </div>
                        <div class="list-right list-right-c">
                            <p class="list-date ">${value.duedate}</p>
                            <button class="list-delete list-delete-c" onclick="completedlists.splice(${index},1); compdis();"><i class='fa fa-trash' ></i></button>
                        </div>
                    </div>`;
        comptaskslist+=html;
    });
    localStorage.setItem('completedlists',JSON.stringify(completedlists));
    document.querySelector('.lists-completed').innerHTML=comptaskslist;
}

document.querySelector('.input-text-js').addEventListener('keydown',(event)=>{
    if(event.key=='Enter'){
        addfun();
    }
});

function edit(index){
    textEditEle=document.querySelector(`.edit-${index}`);
    textEditEle.classList.add('edit-js-added');
    inputtextedit=pendinglists[index].task;
    textEditEle.value=inputtextedit;
    textEditEle.addEventListener('keydown',(event)=>{
        if(event.key=='Enter'){
            textafter=textEditEle.value;
            console.log(textafter);
            pendinglists[index].task=textafter;
            penddis();
            textEditEle.classList.remove('edit-js-added');
        }
    });
}

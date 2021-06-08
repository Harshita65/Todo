
alert('working');
function  task(){
  var a = prompt("Add a task");
var x = document.createElement("div");
var ele = document.createElement("h3");
var y = document.createElement("button");
x.classList.add("option");
x.setAttribute("onClick","escape(this)");
var i = document.createElement("i");
i.setAttribute("Class","fa fa-eraser");
y.classList.add("exercise");
ele.innerHTML = a;
x.appendChild(y);
x.appendChild(ele);
x.appendChild(i);
document.getElementById("tasks").appendChild(x);
button = document.getElementById("add");
button.style.color="red";

x.setAttribute("draggable","true");
document.addEventListener('DOMContentLoaded', (event) => {
  function handleDragStart(e){
    this.style.opacity = '0.3';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);

  }
  function handleDragEnd(e){
    this.style.opacity = '1';

    items.forEach(function (item){
      item.classList.remove('over');
    });
  }
  function handleDragOver(e){
    if(e.preventDefault){
      e.preventDefault();
    }
    return false;
  }
  function handleDragEnter(e){
    this.classList.add('over');
  }
  function handleDragLeave(e){
    this.classList.remove('over');
  }

  let items = document.querySelectorAll('.container .option');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('dragend', handleDragEnd, false);
    });
  });
  function handleDrop(e) {
    e.stopPropagation();
    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
  }
// document.body.appendChild(x);
}

function escape(el){
console.log(el);
var ele = el;
ele.remove();
}

function opennav(){
  document.getElementById("mysidenav").style.width = "200px";
}
function closenav(){
  document.getElementById("mysidenav").style.width = "0";
}

var firebaseConfig = {
    apiKey: "AIzaSyDVMW09uoI1yxwG6Y3VdiGBRioKt5dfSt8",
    authDomain: "todo-3d995.firebaseapp.com",
    databaseURL: "https://todo-3d995-default-rtdb.firebaseio.com",
    projectId: "todo-3d995",
    storageBucket: "todo-3d995.appspot.com",
    messagingSenderId: "437495066719",
    appId: "1:437495066719:web:f4888a9e23e5c25a02abea",
    measurementId: "G-HEZ0C11GPZ"
};
firebase.initializeApp(firebaseConfig);

console.log(firebase)

var tasksRef = firebase.database().ref('tasks/');

tasksRef.set({
  Exercise: {
    date: 2
  },

  draganddrop: {
    date:3
  },

  Shopping: {
    date:19
  }
});

var ExerciseRef = firebase.database().ref('tasks/Exercise');
ExerciseRef.update({
  "date": 7
})

var draganddropRef = firebase.database().ref('tasks/draganddrop');
draganddropRef.update({
  "date": 10
})

this.database = firebase.database();
let ref = this.database.ref('/todo');
var tasksRef = ref.child("tasks");
tasksRef.push({
  name: "Gardening",
  date: 12
});
tasksRef.push({
  name: "Cooking",
  date: 15
});


var GardeningDateRef = ref.child("todo").child("tasks").child("-MamZMqAVoaupFuCucns").child('date');
GardeningDateRef.transaction(function(currentDate){
  return currentDate + 1;
});

ref.on("value", function(snapshot){
  console.log(snapshot.val());
},function(error){
  console.log("Error: " + error.code);
});

tasksRef.on("child_added", function(data, prevChildKey){
  var newtask = data.val();
  console.log("name:" + newtask.name);
  console.log("date:" + newtask.date);
  console.log("Previous task:" + prevChildKey);
});


tasksRef.on("child_changed", function(data){
  var task =data.val();
  console.log("The updated task name is " + task.name);
});

tasksRef.on("child_removed", function(data){
  var deletedtask = data.val();
  console.log(deletedtask.name+ "has been deleted");
});
ref.on("value",function(data){
  console.log(data.val());
},function(error){
  console.log("Error:" + error.code);
});

tasksRef.off();

tasksRef.orderByChild("name").on("child_added", function(data){
  console.log(data.val().name);
});

tasksRef.orderByKey().on("child_added", function(data){
  console.log(data.key);
});

var dateRef = firebase.database().ref("tasks/");
dateRef.orderByValue().on("value", function(data){
  data.forEach(function(data){
    console.log("The " + data.key + " date is " + data.val());
  });
});

var firsttasksRef = firebase.database().ref("tasks/").limitToFirst(1);
var lasttasksRef = firebase.database().ref("tasks/").limitToLast(1);
firsttasksRef.on("value", function(data){
  console.log(data.val());
},function(error){
  console.log("Error:" + error.code);
});

lasttasksRef.on("value", function(data){
  console.log(data.val());
},function(error){
  console.log("Error:" + error.code);
});

tasksRef.orderByChild("name").startAt('gardening').on("child_added", function(data){
  console.log("Start at filter:" + data.val().name);
});

tasksRef.orderByChild("name").endAt('cooking').on("child_added", function(data){
  console.log("End at filter:" + data.val().name);
});

var email = "lily35608@gmail.com";
var password = "Seattle@24";

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
  console.log(error.code);
  console.log(error.message);
});

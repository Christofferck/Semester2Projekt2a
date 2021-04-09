
const todoArr = [...document.getElementById('toDoWrap').children];

const editBtns = [...document.getElementsByName("edit")];
const delBtns = [...document.getElementsByName("archive")];

console.log(delBtns)


for (var i = 0; i < delBtns.length; i++) {
  editBtns[i].addEventListener('click', editToggle(i));
  delBtns[i].addEventListener('click', archive(i))
}




function archive(i) {
  return function() {

    if (this.innerHTML == 'Archive') {
      console.log('archive')
      let toDoArr = [];

      for (var i = 0; i < todo.children.length; i++) {
        if (!todo.children[i].classList.contains("btns")) {
          for (var o = 0; o < todo.children[i].children.length; o++) {
            if (todo.children[i].children[o].classList.contains("value")) {
              toDoArr.push(todo.children[i].children[o].innerHTML)
            }
          }
        }
      }

      let toDoObj = {
        title : toDoArr[0],
        text : toDoArr[1],
        startdate : toDoArr[2],
        deadline : toDoArr[3],
        priority : toDoArr[4],
        id : toDoArr[5],
        formInstance : 'archive'
      }
      console.log(toDoObj)


      postAjax('to-do', toDoObj, function(data){ console.log(data); });

    } else if (this.innerHTML = 'Discard') {
      console.log('Discard')
    } else {

    for (var i = 0; i < todo.children.length; i++) {

      if (!todo.children[i].classList.contains("btns")) {


        for (var o = 0; o < todo.children[i].children.length; o++) {
          if (todo.children[i].children[o].classList.contains("value")) {
            todo.children[i].children[o] = values[o]
          }
        }
      }
    }



    console.log(values);
  }






  }
}




function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}



let values = [];

function editToggle(i) {
   return function() {
       ////console.log(this.id);

       //console.log(num)
       let num = this.id.match(/(\d)/);
       num = num[0]


      let todo = document.getElementById(`todo${num}`);


      // Edit/Save btn toggle
      let editBtn = document.getElementById(`editBtn${num}`)
      let delBtn = document.getElementById(`delBtn${num}`)



      let toDoArr = [];
      let inputs = []

      for (var i = 0; i < todo.children.length; i++) {

        if (!todo.children[i].classList.contains("btns")) {
          console.log(...[todo.children[i]]);


          let classList = todo.children[i].classList




          for (var o = 0; o < todo.children[i].children.length; o++) {

            if (todo.children[i].children[o].classList.contains("value")) {
              if (todo.children[i].children[o].tagName == "SPAN") {
                let input = document.createElement("INPUT");
                values.push(todo.children[i].children[o].innerHTML)

                //input.setAttribute("type", "text");
                input.classList.add("value");
                input.value = todo.children[i].children[o].innerHTML;


                todo.children[i].replaceChild(input, todo.children[i].children[o]);

              } else if (todo.children[i].children[o].tagName == "INPUT") {

                let span = document.createElement("SPAN");
                //span.setAttribute("type", "text");
                span.classList.add("value");
                span.innerHTML = todo.children[i].children[o].value;

                toDoArr.push(todo.children[i].children[o].value)

                todo.children[i].replaceChild(span, todo.children[i].children[o]);
              }



            }
          }

        }
      }



      if (editBtn.innerHTML == "Edit") {
        editBtn.innerHTML = "Save"
        delBtn.classList.add("hidden");
      } else if (editBtn.innerHTML == "Save") {
        editBtn.innerHTML = "Edit"
          delBtn.classList.remove("hidden");

        let toDoObj = {
          title : toDoArr[0],
          text : toDoArr[1],
          startdate : toDoArr[2],
          deadline : toDoArr[3],
          priority : toDoArr[4],
          id : toDoArr[5],
          formInstance : 'update'
        }
        console.log(toDoObj)
        postAjax('to-do', toDoObj, function(data){ console.log(data); });

      }


   };
}

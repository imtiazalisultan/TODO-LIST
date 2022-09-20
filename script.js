let form=document.querySelector('form');
let text=document.getElementById('text');
let todoCon=document.querySelector(".todo-con");


//Jarvis program
const button=document.getElementById('btn-jarvis');

const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;

const recognition=new SpeechRecognition();

recognition.onstart=function(){
    console.log("speech is started");
}

recognition.onresult=function(event){
 //   console.log(event);

    const todoSpeak=event.results[0][0].transcript;
   // console.log(todoSpeak);
  // text.value=todoSpeak; // feeding the input text by this line
  
   //console.log("onresult");
   computerSpeech(todoSpeak);
   
}

function computerSpeech(words){
    const speech=new SpeechSynthesisUtterance();

    speech.lang='en-US';

    speech.pitch=10;
    speech.volume=1;
    speech.rate=0.8;
    //console.log("computer speech function",words);

    determineWords(speech,words);
    
    window.speechSynthesis.speak(speech);
}
function determineWords(speech,words){

   
    if(words.includes('hello Jarvis how are you')){
        speech.text='I am good , thank you for asking me sir.'
    }else
    if(words.includes('who am I')){
        speech.text='You are awesome person, living on a earth to crack all the goals. You are good in your personality.';
    }else
    if(words.includes('how is the weather')){
        speech.text='why you care about that? you never go out';
    }else
    if(words.includes('do you love me')){
        speech.text='why should i love you? You are a loser ';
    }else
    if(words.includes('open Google')){

        speech.text="Opening Google for you sir !"
        window.open('https://www.google.com/');
    }else
    if(words.includes('open Newton school ')|| words.includes('open Newton school ')){

        speech.text="opening Newton school for you sir";
        window.open('https://www.newtonschool.co/');
    }else
    if(words.includes('take me to the dashboard')){
        speech.text='opening dashboard for you sir';
        setTimeout(()=>{
            window.open('https://my.newtonschool.co/dashboard/');
           
        },1000);
    }else
    if(words.includes('open Facebook')|| words.includes('Hey open the Facebook')){
        speech.text='Opening Facebook for you sir !'
        window.open('https://www.facebook.com/');
    }else
    
    // by using Voice command submit the Todo in the List...
    if(words.includes('submit')){
        //console.log("ok i am submitting");
        speech.text='ok i am submiting for you sir';
        addToDo();
    }else if(words.includes('clear the list')){
        clearTheList(speech);
    }else{
        text.value=words;  // this line indicate the feeding the text into the input Tag......by using Voice Assistant
    }
}

button.addEventListener('click',()=>{
    recognition.start();
})



//when we put a text and submit it . the event, call the addTodo list in the class todo-li 
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    addToDo(); 

} )

//first we are getting the data from the Local Storage
let todos=JSON.parse(localStorage.getItem("todos"));
//when todo is there then u can do anything 
if(todos){
  todos.forEach(element=>{
     addToDo(element);
  })
}


function addToDo(elem){
    //console.log(elem);
    let todoColl=document.createElement("div");
    todoColl.classList.add("todocoll");
    //todoColl will create a new Div 'todoCol' which is=~ TodoCollections......

    let todoText=text.value;
    //From the 'Form' input taken by user we get the value and store it in the todoText variable
    
    //For Resetting the app
    if(elem){
        todoText=elem.text;
        //console.log(elem.text);
    }
   if(todoText){
    //and after this we are printing on the <p>tag<p> in the inner HTML of  recently created 'div' tag
    todoColl.innerHTML=`<div class="todo-li">
    <div class="check ${elem && elem.complete?"active-check":""}"><img src="img/icon-check.svg" alt=""/></div>
    <p class="ptag ${elem && elem.complete?"complete":""}">${todoText}</p>
    <button class="close"><img src="/img/icon-cross.svg" alt=""/> </button>
    </div>
    <!-- this hr class for creating a Horizontal Line -->
    <div class="hr"></div> `;



// console.log(todoColl);
//FOR APPENDING
//then after this we are just appending the todoCollection in the todocontent=~todoCon class div...
todoCon.appendChild(todoColl);

//we are calling the updateLocalStorage when Appending
updateLocalStorage();

   }



//FOR ClOSING or DELETING the(recently created 'div') todoCollection 
let close=todoColl.querySelector('.close');
// console.log(close);
close.addEventListener('click',(e)=>{
    todoColl.remove();
    updateLocalStorage();
})




//FOR Selecting/Deselecting or Showing the Checks on the Check Button
let check=todoColl.querySelector('.check');
check.addEventListener('click',(e)=>{
    let a=check.classList;                  // this will show the Classes in the HTML dom
    check.classList.toggle("active-check");  //this will enable/disable toggle the class which is created name="check"
    //  a=check.classList.contains("active-check");
    //  console.log(a);

    //FOR Selecting the todo text and OverWrite the Horizontal Line on to the Text written, so creating a class which name is =~ "complete" and stored in variable. 
    let selectText= todoColl.children[0].children[1];
   // console.log(selectText);
    let complete =selectText.classList.add("complete");
    updateLocalStorage();
   })

   text.value="";// this will blank the written word in the input box After Hitting the Enter Button...
}



// Function for Storing and Updating the local STorage... 
function updateLocalStorage(){
//this function store the data in the local storage
    let pTag=document.querySelectorAll(".ptag");
    //taking empty array
    let arr=[];

    //we are taking the input from the user so we are storing in the array by making an object
    pTag.forEach(element =>{
        arr.push({
            text: element.innerText,
            
            complete:element.classList.contains("complete") //==>this gives False-->when it is not Not check, True-->gives when it is check...
          // key    :value
        })
    });
   // console.log(arr);
    localStorage.setItem("todos",JSON.stringify(arr));
}




//Function For Active==> Information /or Choice class---
let info=document.querySelectorAll(".choice p");
let todoli=document.querySelectorAll(".todocoll")
//console.log(info);
info.forEach(element=>{
   // console.log(element);
   element.addEventListener("click",(e)=>{
    info.forEach(item=>{
        item.classList.remove("active");
    });
    element.classList.add("active")

    if(element.innerText=="Active"){
        todoli.forEach(elem=>{
            if(!elem.children[0].children[1].classList.contains("complete")){
                elem.style.display="block";
            }else{
                elem.style.display="none";
            }
        }); 

    }else if(element.innerText=="Completed"){
        todoli.forEach(elem=>{
            if(elem.children[0].children[1].classList.contains("complete")){
                elem.style.display="block";
            }else{
                elem.style.display="none";
            }
        });
    }else{
        todoli.forEach(elem=>{
            
                elem.style.display="block";
           });
        }
   })
})

//FOR Clearing the todo by Using JARVIS Voice
function clearTheList(speech){ 
    todoli.forEach(elem=>{
        if(elem.children[0].children[1].classList.contains("complete")){
           elem.remove();
           updateLocalStorage();
        }
    });
    speech.text="ok clearing the list";
}

//Clearing the Todo W/o Voice Assisstant
//FOR Clearing the todo
let clear=document.querySelector(".clear");
clear.addEventListener("click",()=>{
   
    todoli.forEach(elem=>{
        if(elem.children[0].children[1].classList.contains("complete")){
           elem.remove();
           updateLocalStorage();
        }
    });
    
})


//FOR TODOS task which is LEFT--
let left=document.querySelector(".left");
function setNumber(){

    let activeTodo=document.querySelectorAll(".todo-li .active-check");
    //console.log(activeTodo);
    let diff=todoli.length - activeTodo.length;
    left.innerText=`${diff} items left`
} 
setNumber();

let arr=[];
let DELAY=100;
const sizeIn=document.getElementById("arraysize");
let arrSize=sizeIn.value;
const arrDisp= document.getElementById("elementeditor");
const speedChanger=document.getElementById("speed");

const reverser=document.getElementById("reverse");
const random=document.getElementById("random");

const display1 = document.getElementById("display1");
const display2 = document.getElementById("display2");
const display3 = document.getElementById("display3");
const display4 = document.getElementById("display4");

const displays=[display1,display2,display3,display4]

const graph1 = document.getElementById("graph1");
const graph2 = document.getElementById("graph2");
const graph3 = document.getElementById("graph3");
const graph4 = document.getElementById("graph4");

const graphs=[graph1,graph2,graph3,graph4]

const algobtn1= document.getElementById("algo1");
const algobtn2= document.getElementById("algo2");
const algobtn3= document.getElementById("algo3");
const algobtn4= document.getElementById("algo4");

const algobtns=[algobtn1,algobtn2,algobtn3,algobtn4]

algobtn1.addEventListener("click",()=>btn(1));
algobtn2.addEventListener("click",()=>btn(2));
algobtn3.addEventListener("click",()=>btn(3));
algobtn4.addEventListener("click",()=>btn(4));

reverser.addEventListener("click",reverseArray);
random.addEventListener("click",()=>{
  if(!sizeIn.value) sizeIn.value=Math.floor((Math.random())*200);
  generateArray();
});

speedChanger.addEventListener("change",()=>{
    DELAY=(10000-speedChanger.value)/10;
});


const Selected=[1,0,0,0];
let countSel=1;
algobtns[0].classList.add("selectedbtn");

display2.style.display="none";
display3.style.display="none";
display4.style.display="none";


sizeIn.addEventListener("change",generateArray);
arrDisp.addEventListener("change",changeArray);
const sortStarter = document.getElementById("sortStarter");

sortStarter.addEventListener("click", async () => {
  sortStarter.disabled = true;

  const promises = [];
    displaybars(arr,-1);
  if (Selected[0]) promises.push(bubbleSort([...arr], graph1));
  if (Selected[1]) promises.push(selectionSort([...arr], graph2));
  if (Selected[2]) promises.push(mergeSort([...arr], graph3));
  if (Selected[3]) promises.push(quickSort([...arr], graph4));

  await Promise.all(promises);

  sortStarter.disabled = false;
});




function generateArray() {
    const arrSize=sizeIn.value;
    arr.length=0;
    //generates and places rand vals in arr  
  for (let i = 0; i < arrSize; i++) {
    arr[i]=(Math.floor(Math.random() * 100)); 
  }
  //displays in textarea
  var str= JSON.stringify(arr);
  arrDisp.value=str;

  //displaysin visualizer
    displaybars(arr,-1);
}
function reverseArray(){
    const len=arr.length;
    for(let i=0;i<len/2;i++){
        const temp=arr[len-i-1];
        
       arr[len-i-1]=arr[i];
       arr[i]=temp;
    }
    var str= JSON.stringify(arr);
    arrDisp.value=str;
    displaybars(arr,-1);

}

function changeArray(){
    const str=arrDisp.value;
    try {
        const arra=JSON.parse(str);
        console.log(arra[0]);
        arr.length=0;
        for (let i = 0; i < arra.length; i++) {
            arr[i]=arra[i]; 
        }
        sizeIn.value=arr.length;
        displaybars(arr,-1);
    } catch (error) {
        window.alert("Please give a valid array");
    }
    
}


function drawBars(array, container) {
  container.innerHTML = "";
  array.forEach(val => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${val * 0.7}%`;
    let wid = 75 / array.length;
    bar.style.width = `${wid}%`;
    bar.style.margin = `${wid / 6}%`;
    container.appendChild(bar);
  });
}

function btn(i){
    if(countSel>=3&&!Selected[i-1]){
        window.alert("You can only select 3 algos simultaneously");
        return;
    }
    else{
        if(!Selected[i-1]){
            algobtns[i-1].classList.add("selectedbtn");
            Selected[i-1]=1;
            countSel++;
            updateStepModeAvailability();
            if(countSel==2) updateDescriptions();
            displaybars(arr, i-1);
            displays[i-1].style.display="block";                
        }
        else{
            algobtns[i-1].classList.remove("selectedbtn");
            Selected[i-1]=0;
            countSel--;
            updateStepModeAvailability();
            if(countSel==1) updateDescriptions();
            displays[i-1].style.display="none";  
        }
    }
}

function displaybars(arr, i){
    if(i==-1){
        for(let a=0;a<4;a++){
            if(Selected[a]) drawBars(arr,graphs[a]);
        }
    }
    else drawBars(arr,graphs[i]);

}

async function bubbleSort(arr, container) {
  const bars = container.children;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      
      bars[j].classList.add("selectedBar");
      bars[j+1].classList.add("selectedBar");
      if (arr[j] > arr[j + 1]) {
        bars[j].classList.add("greenBar");
      }
      else{
        bars[j+1].classList.add("greenBar");
      }
      await sleep(DELAY); // pause to show current comparison

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        bars[j].classList.remove("greenBar");
        bars[j+1].classList.add("greenBar");
        
        // visually swap heights
        let temp = bars[j].style.height;
        bars[j].style.height = bars[j+1].style.height;
        bars[j+1].style.height = temp;
      }

      bars[j].classList.remove("selectedBar");
      bars[j+1].classList.remove("selectedBar");
      bars[j+1].classList.remove("greenBar");
    }
  }
}



async function selectionSort(arr, container) {
  const bars = container.children;

  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    bars[minIdx].classList.add("selectedBar");

    for (let j = i + 1; j < arr.length; j++) {
      bars[j].classList.add("selectedBar");
      await sleep(DELAY);

      if (arr[j] < arr[minIdx]) {
        bars[minIdx].classList.remove("selectedBar");
        minIdx = j;
        bars[minIdx].classList.add("selectedBar");
      }

      bars[j].classList.remove("selectedBar");
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

      // Swap visuals
      let temp = bars[i].style.height;
      bars[i].style.height = bars[minIdx].style.height;
      bars[minIdx].style.height = temp;
    }

    bars[minIdx].classList.remove("selectedBar");
    bars[i].classList.add("sortedBar");
  }
}


async function mergeSort(arr, container, l = 0, r = arr.length - 1) {
  if (l >= r) return;

  const mid = Math.floor((l + r) / 2);

  await mergeSort(arr, container, l, mid);
  await mergeSort(arr, container, mid + 1, r);
  await merge(arr, container, l, mid, r);
}

async function merge(arr, container, l, mid, r) {
  const bars = container.children;

  const left = arr.slice(l, mid + 1);
  const right = arr.slice(mid + 1, r + 1);

  let i = 0, j = 0, k = l;

  while (i < left.length && j < right.length) {
    // Highlight comparison
    bars[k].classList.add("selectedBar");

    await sleep(DELAY); // Delay to show action

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      bars[k].style.height = `${left[i] * 0.7}%`;
      i++;
    } else {
      arr[k] = right[j];
      bars[k].style.height = `${right[j] * 0.7}%`;
      j++;
    }

    bars[k].classList.remove("selectedBar");
    k++;
  }

  while (i < left.length) {
    bars[k].classList.add("selectedBar");
    await sleep(DELAY);
    arr[k] = left[i];
    bars[k].style.height = `${left[i] * 0.7}%`;
    bars[k].classList.remove("selectedBar");
    i++;
    k++;
  }

  while (j < right.length) {
    bars[k].classList.add("selectedBar");
    await sleep(DELAY);
    arr[k] = right[j];
    bars[k].style.height = `${right[j] * 0.7}%`;
    bars[k].classList.remove("selectedBar");
    j++;
    k++;
  }
}

async function quickSort(arr, container, low = 0, high = arr.length - 1) {
  

  if (low < high) {
    let pi = await partition(arr, low, high, container);
    await quickSort(arr, container, low, pi - 1);
    await quickSort(arr, container, pi + 1, high);
  }
}



async function partition(arr, low, high, container) {
    const bars= container.children;
  let pivot = arr[high];
  bars[high].classList.add("pivotBar");

  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].classList.add("selectedBar");
    await sleep(DELAY);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      swapHeights(bars[i], bars[j]);
    }

    bars[j].classList.remove("selectedBar");
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  swapHeights(bars[i + 1], bars[high]);
  bars[high].classList.remove("pivotBar");

  return i + 1;
}

function swapHeights(bar1, bar2) {
  const temp = bar1.style.height;
  bar1.style.height = bar2.style.height;
  bar2.style.height = temp;
}


let stepMode = false;
let stepResolve;

document.getElementById("stepModeToggle").addEventListener("change", (e) => {
  stepMode = e.target.checked;
  if(stepMode) sortStarter.click();
  document.getElementById("nextStepBtn").disabled = !stepMode;
});

document.getElementById("nextStepBtn").addEventListener("click", () => {
  if (stepResolve) {
    
    stepResolve();
    stepResolve = null;
  }
});

function sleep(ms) {
  if (!stepMode) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } else {
    return new Promise(resolve => {
      stepResolve = resolve;
    });
  }
}

function updateStepModeAvailability() {
  const stepToggle = document.getElementById("stepModeToggle"); 
  if(stepToggle.checked) stepToggle.click();
  stepToggle.disabled = (countSel !== 1);
}

function updateDescriptions(){
    for(let i=0;i<4;i++){
        const desc= displays[i].getElementsByClassName("description")[0];
        if(desc.style.display==="none") {
            desc.style.display="block";
            graphs[i].style.height="65%";
        }
        else {
            desc.style.display="none";
            graphs[i].style.height="90%";
        }
    }
}

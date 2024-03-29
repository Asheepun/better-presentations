const defaultFontSize = 50;

let slideData = [
    {
        text: "",
        img: "",
        fontSize: defaultFontSize,
    },
    /*
    {
        text: "hello 1",
        //img: "https://image.shutterstock.com/image-photo/large-beautiful-drops-transparent-rain-260nw-668593321.jpg",
        img: "",
    },
    {
        text: "",
        img: "",
    },
    {
        text: "hejsan 2",
        img: "lost-dog-ads-8.webp_.jpg",
        //img: "https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg",
    },
    */
];

let saved = true;

let isFullscreen = false;

let currentSlide = 0;
let currentSlidePreviewListScroll = 0;

const slide = document.createElement("div");
const text = document.createElement("h1");
const img = document.createElement("img");
const menu = document.createElement("div");
const textInput = document.createElement("input");
const imgInput = document.createElement("input");
const fontInput = document.createElement("input");
const startBtn = document.createElement("button");
const fileMenu = document.createElement("div");
const nameInput = document.createElement("input");
const newBtn = document.createElement("button");
const openBtn = document.createElement("button");
const saveBtn = document.createElement("button");
const slidePreviewList = document.createElement("div");
const previewMenu = document.createElement("div");
const addSlideBtn = document.createElement("button");
const removeSlideBtn = document.createElement("button");
const openFileMenu = document.createElement("div");
const fileInput = document.createElement("input");

document.body.appendChild(slide);
document.body.appendChild(menu);
menu.appendChild(textInput);
menu.appendChild(imgInput);
menu.appendChild(startBtn);
menu.appendChild(document.createElement("div"));
menu.appendChild(fontInput);
document.body.appendChild(fileMenu);
fileMenu.appendChild(nameInput);
fileMenu.appendChild(document.createElement("div"));
fileMenu.appendChild(newBtn);
fileMenu.appendChild(openBtn);
fileMenu.appendChild(saveBtn);
document.body.appendChild(previewMenu);
document.body.appendChild(slidePreviewList);
previewMenu.appendChild(removeSlideBtn);
previewMenu.appendChild(addSlideBtn);
document.body.appendChild(openFileMenu);
openFileMenu.appendChild(fileInput);

slide.classList.add("slide");
text.classList.add("slide-text");
img.classList.add("slide-img");
menu.classList.add("menu");
slidePreviewList.classList.add("slide-preview-list");
previewMenu.classList.add("preview-menu");
fileMenu.classList.add("file-menu");
openFileMenu.classList.add("open-file-menu");
fileInput.classList.add("file-input");

textInput.placeholder = "Text";
imgInput.placeholder = "Image url";
fontInput.placeholder = "Font size";
startBtn.innerHTML = "Start";
nameInput.placeholder = "Name";
newBtn.innerHTML = "New";
openBtn.innerHTML = "Open";
saveBtn.innerHTML = "Save";
addSlideBtn.innerHTML = "+";
removeSlideBtn.innerHTML = "-";
openFileMenu.style.display = "none";
fileInput.type = "file";

window.onbeforeunload = () => {
    if(!saved){
        return "Unsaved work. Do you still wish to continue";
        //return prompt("Unsaved work. Do you still wish to continue?");
    }
}

const updateSlide = () => {
    slide.innerHTML = "";
    if(imgInput.value !== ""){
        img.src = imgInput.value;
        slide.appendChild(img);
    }else{
        
        let scale = 1;
        
        if(isFullscreen){
            scale = window.innerWidth / 800;
        }
        
        const fontSize = slideData[currentSlide].fontSize;
        
        text.style.fontSize = scale * fontSize + "px";
        
        const lineLength =  (800 - 200) * scale / (fontSize * scale / 2);
        const rows = Math.ceil(textInput.value.length / lineLength)
        
        let indentedText = "";
        for(let i = 0; i < textInput.value.length; i += lineLength){
            indentedText += textInput.value.slice(i, i + lineLength) + "<br>";
        }
        
        text.innerHTML = indentedText;
        
        text.style.marginTop = (slide.clientHeight / 2 - rows * 1.25 * (fontSize * scale / 2)) + "px";
        slide.appendChild(text);
    }
}

const updateMenu = () => {
    textInput.value = slideData[currentSlide].text;
    imgInput.value = slideData[currentSlide].img;
    fontInput.value = slideData[currentSlide].fontSize;
}

const nextSlide = () => {
    currentSlide++;
        
    if(currentSlide > slideData.length - 1){
        currentSlide = 0;
    }
    
}

const previousSlide = () => {
    currentSlide--;
    
    if(currentSlide < 0){
        currentSlide = slideData.length - 1;
    }
}

const updateSlidePreviewList = () => {
    
    slidePreviewList.innerHTML = "";
    
    slideData.forEach((data, i) => {
        const preview = document.createElement("div");
        const previewText = document.createElement("h2");
        const previewImg = document.createElement("img");
        
        slidePreviewList.appendChild(preview);
        if(data.img !== ""){
            preview.appendChild(previewImg);
            
            previewImg.classList.add("slide-preview-img");
            
            previewImg.src = data.img;
        }else{
            preview.appendChild(previewText);
            
            previewText.classList.add("slide-preview-text");
            
            const previewWidth = 160;
            const previewHeight = 90;
            const sideMargin = 40;
            
            const fontSize = data.fontSize;
            
            const previewFontSize = fontSize * previewWidth / slide.clientWidth;
            
            previewText.style.fontSize = previewFontSize + "px";
        
            let indentedText = "";
            const lineLength = (previewWidth - sideMargin) * 2 / previewFontSize;
            const lines = Math.ceil(data.text.length / lineLength)
            
            for(let i = 0; i < lines; i++){
                indentedText += data.text.slice(i * lineLength, i * lineLength + lineLength) + "<br>";
            }
            
            previewText.innerHTML = indentedText;
            
            previewText.style.marginTop = (previewHeight / 2 - lines * 1.25 * (previewFontSize / 2)) + "px";
            
        }
        
        
        
        preview.classList.add("slide-preview-list-item");
        if(i === currentSlide){
            preview.classList.add("selected");
        }
        
        
        preview.addEventListener("click", (e) => {
            currentSlide = i;
                
            const previewHeight = preview.clientHeight;
            const slidePreviewListHeight = slidePreviewList.clientHeight;
            
            currentSlidePreviewListScroll = i * previewHeight - slidePreviewListHeight / 2 + previewHeight * 1.5;
            
            updateMenu(slideData[currentSlide]);
            updateSlide();
            updateSlidePreviewList();
        });
        
        let held = false;
        
        
    });
    
    slidePreviewList.scrollTop = currentSlidePreviewListScroll;
} 

document.addEventListener("keydown", (e) => {
   
    if(document.activeElement !== textInput
    && document.activeElement !== imgInput
    && document.activeElement !== fileInput
    && document.activeElement !== nameInput
    && document.activeElement !== fontInput){
        if(e.keyCode === 39
        || e.keyCode === 40
        || e.keyCode === 32
        || e.keyCode === 13
        || e.keyCode === 74){
            nextSlide();
            updateMenu(slideData[currentSlide]);
        }
        if(e.keyCode === 37
        || e.keyCode === 38
        || e.keyCode === 8
        || e.keyCode === 75){
            previousSlide();
            updateMenu(slideData[currentSlide]);
        }
        if(e.keyCode === 27){
            /*
            const input = document.createElement("input");
            document.body.appendChild(input);
            input.focus();
            document.body.removeChild(input);
            */
            //slide.focus();
            //find a way to stop input typing focus 
        }
    }
                          
    updateSlide();
    updateSlidePreviewList();

});

textInput.addEventListener("input", (e) => {

    slideData[currentSlide].text = textInput.value;
    
    saved = false;
    
    updateSlide();
    updateSlidePreviewList();
    
});

imgInput.addEventListener("input", (e) => {
    
    slideData[currentSlide].img = imgInput.value;
    
    saved = false;
    
    updateSlide();
    updateSlidePreviewList();
});

fontInput.addEventListener("input", (e) => {
    
    slideData[currentSlide].fontSize = fontInput.value;
    //console.log(fontInput.value);
    
    updateSlide();
    updateSlidePreviewList();
    
    
})

startBtn.addEventListener("click", (e) => {
    slide.requestFullscreen();
});

document.addEventListener("fullscreenchange", (e) => {   
    
    isFullscreen = !isFullscreen;
    
    updateMenu();
    updateSlide();
});


newBtn.addEventListener("click", (e) => {
    
    if(!saved){
        const p = confirm("Unsaved work. Do you still wish to continue?");
        if(!p){
            return;
        }
    }
    
    slideData.splice(0, slideData.length);
    
    slideData.push({
        text: "",
        img: "",
        fontSize: defaultFontSize
    });
    
    nameInput.value = "";
    
    currentSlide = 0;
    
    saved = true;
    
    updateMenu(slideData[currentSlide]);
    updateSlide();
    updateSlidePreviewList();
});

openBtn.addEventListener("click", (e) => {
    
    if(!saved){
        const p = confirm("Unsaved work. Do you still wish to continue?");
        if(!p){
            return;
        }
    }
    
    openFileMenu.style.display = "block";
    
});

document.addEventListener("click", (e) => {
    if(e.target !== openFileMenu
    && e.target !== openBtn){
        openFileMenu.style.display = "none";
    }
})

saveBtn.addEventListener("click", (e) => {
    
    if(nameInput.value === ""){
        alert("No project name.");
        nameInput.focus();
        return;
    }
    
    const data = {
        name: nameInput.value,
        slides: slideData,
    };
    
    //save file somehow
    const string = JSON.stringify(data);
    
    const blob = new Blob([string], { type: "text/plain", });
    
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = nameInput.value + ".betpre";
    a.click();
    
    saved = true;
    
});

addSlideBtn.addEventListener("click", (e) => {

    const newSlide = {
        text: "",
        img: "",
        fontSize: defaultFontSize,
    };
    
    const tmp1 = slideData.slice(0, currentSlide + 1);
    tmp1.push(newSlide)
    slideData = tmp1.concat(slideData.slice(currentSlide + 1, slideData.length));
    
    currentSlide++;

    updateMenu(slideData[currentSlide]);
    updateSlide();
    updateSlidePreviewList();

});

removeSlideBtn.addEventListener("click", (e) => {

    slideData.splice(currentSlide, 1);
    
    previousSlide();
    
    updateMenu(slideData[currentSlide]);
    updateSlide();
    updateSlidePreviewList();        
    
});

fileInput.addEventListener("change", (e) => {
    
    const fileReader = new FileReader();
    
    fileReader.readAsText(fileInput.files[0], "utf-8");
    
    fileReader.onload = (file) => {
        let json;
        try{
            json = JSON.parse(file.target.result);
        }catch{
            if(json === undefined){
                alert("Invalid file.");
                return;
            }
        }
        
        slideData = json.slides;
        nameInput.value = json.name;
        
        currentSlide = 0;
        
        saved = true;
    
        openFileMenu.style.display = "none";
    
        updateMenu(slideData[currentSlide]);
        updateSlide();
        updateSlidePreviewList();
            
    };
});

updateMenu(slideData[currentSlide]);
updateSlide();
updateSlidePreviewList();
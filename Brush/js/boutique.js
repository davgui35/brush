// Variables
const less = document.querySelectorAll('.less');
// console.log(less);
const more = document.querySelectorAll('.more');
// console.log(more);
const quantities = document.querySelectorAll('.quantity');
const modal = document.querySelector('.modal');
const title = document.querySelectorAll('.title');
const btnSupp = document.querySelector('.delete');
const btnCheck = document.querySelector('.check');
//Articles 
const articles = document.querySelectorAll('.articles');
let tabIndex = [];

let tabArticles = [
    {
    id: 1,
    title: "Le fameux",
    price: 4.99,
    qte: 0, 
    img:"./src/img/blaireau.png",
    numberExist: 0
    },
    {
    id: 2,
    title: "Le fatal",
    price: 19.99,
    qte: 0, 
    img:"./src/img/parfum.png",
    numberExist: 0
    },
    {
    id: 3,
    title: "Le longbear",
    price: 4.99,
    qte: 0, 
    img:"./src/img/huile.png",
    numberExist: 0
    },
    {
    id: 4,
    title: "Le domptable",
    price: 18.99,
    qte: 0, 
    img:"./src/img/peigne.png",
    numberExist: 0
    },
    {
    id: 5,
    title: "shampouinou",
    price: 4.99,
    qte: 0, 
    img:"./src/img/shampoing.png",
    numberExist: 0
    },
    {
    id: 6,
    title: "Le solid",
    price: 7.99,
    qte: 0, 
    img:"./src/img/shampoing-solide.png",
    numberExist: 0
    }

];


//More
more.forEach((element, index) => {
    element.addEventListener('click', ()=>{
        tabArticles[index].qte++;
        quantities[index].innerText = tabArticles[index].qte;
        //console.log(tabArticles[index]);
    })

})


//Less
less.forEach((element, index) => {
    element.addEventListener('click', ()=>{
        if(quantities[index].innerText > 0){
            tabArticles[index].qte--;
            quantities[index].innerText = tabArticles[index].qte;
            //console.log(tabArticles[index]);
        }
    })
})


let total = 0; 
//Add Basket

articles.forEach((article, index) => {

    article.addEventListener('click', ()=>{
        if(tabArticles[index].numberExist === 0 && quantities[index].innerText > 0){
            tabArticles[index].numberExist = 1;
        // ________________________________
        const bodyModal = document.querySelector('.body-modal');
        const modalDyn = document.createElement('div');
        const contentTxt = document.createElement('div');
        const contentImg = document.createElement('div');
        const modalTitle = document.createElement('p');
        const modalPrice = document.createElement('p');
        const modalQuantity = document.createElement('p');
        const modalImgElement = document.createElement('img');
        const separator = document.createElement('hr');
        
        // style 
        modalDyn.style.margin = "30px";
        modalDyn.id = "modals"+index-1;
        modalDyn.style.display = "flex";
        modalDyn.style.alignItems = "center";
        contentTxt.style.marginLeft = "30px";
        contentImg.style.marginLeft = "30px";
        modalTitle.style.fontFamily = "Market Deco";
        modalPrice.style.fontFamily = "Market Deco";
        modalQuantity.style.fontFamily = "Market Deco";

        // inner
        modalTitle.innerText = tabArticles[index].title;
        modalPrice.innerText = tabArticles[index].price + " $";
        modalQuantity.innerText = "Quantite: " + tabArticles[index].qte;
        modalImgElement.src = tabArticles[index].img;
        modalImgElement.style.width = "50px";

        // Content DOM
        contentImg.appendChild(modalImgElement);
        contentTxt.appendChild(modalTitle);
        contentTxt.appendChild(modalQuantity);
        contentTxt.appendChild(modalPrice);
        modalDyn.appendChild(separator);
        modalDyn.appendChild(contentImg);
        modalDyn.appendChild(contentTxt);
        bodyModal.appendChild(modalDyn);
        openModal(tabArticles, index);
        
        // _________________________________
        let total = sumTotal(tabArticles, index);
        const totalHt = document.querySelector('#totalHt');
        totalHt.innerText = "Total Hors taxes : " +  total + "$";
        
        let tva = calculTva(total);
        const tvaElement = document.querySelector('#tva');
        tvaElement.innerText = "TVA : " + tva  + "$";
        
        let totalTTC = tva + total;
        totalTTC = totalTTC*100;
        totalTTC = Math.round(totalTTC);
        totalTTC = totalTTC/100;
        const sumTTC = document.querySelector('#ttc');
        sumTTC.innerText = "TTC : " + totalTTC + "$";

    }else {
            let counter = 0;
            let tabModals = [{id: counter, modalQte: tabArticles[index].qte }];
            const modals = document.querySelectorAll('#modals');
            //console.log(modals);
            //console.log(tabModals);
            modals.innerText = "Quantite " + tabModals[counter].modalQte;
            counter++;
        }
    })

});


btnSupp.addEventListener('click', () =>{
    // console.log("supprimer");
    deleteArticle();
})

btnCheck.addEventListener('click', ()=>{
    console.log("valider");
    let popUp = document.querySelector('.overlay-basket');
    //console.log(popUp);
    popUp.style.display = 'block';
})

//Close by cross
let cross = document.querySelector('.cross');
    cross.addEventListener('click',()=>{
        closeModal();
    });

//Modal
function openModal(tabArticles, index){
    if(tabArticles[index].numberExist === 1){
        modal.style.display = "block";
    }
}
function closeModal(){
    modal.style.display = "none";
}


function deleteArticle(index){
    const totalHt = document.querySelector('#totalHt');
    totalHt.innerText = "";
    const tvaElement = document.querySelector('#tva');
    tvaElement.innerText = "";
    const sumTTC = document.querySelector('#ttc');
    sumTTC.innerText = "";
    const bodyModal = document.querySelector('.body-modal');
    bodyModal.innerText = "";
    quantities.forEach((element, index) =>{
        if(element !== 0){
            element.innerText = 0;
            tabArticles[index].qte = 0;
        }
    })
    closeModal();
    document.location.reload();
}


function addId(id){
    return id;
}

function sumTotal(tab, index){
    if(tab[index].qte > 0){
        total += tab[index].price * tab[index].qte;
        total = total*100;
        total = Math.round(total);
        total = total/100;
        return total;
    }
}

function calculTva(total){
    tva = total * 0.20;
    tva = tva*100;
    tva = Math.round(tva);
    tva = tva/100;
    return tva;
}


//Formulaire CB
const inpCard = document.getElementById('num');

inpCard.addEventListener('keyup', () => {
    let val = inpCard.value;
    let newval = '';

    val = val.replace(/\s/g, '');
    
    for(let i = 0; i < val.length; i++) {
        if(i % 4 === 0 && i > 0){
            newval = newval.concat(' ');
        }

        newval = newval.concat(val[i]);
    }
    

    inpCard.value = newval;
})


//formclose
function closeOverlay(){
    let popUp = document.querySelector('.overlay-basket');
    //console.log(popUp);
    popUp.style.display = 'none';
    confirm("Votre commande a bien été effectuée!!");
}



const btnLook = document.querySelector('.btn-look');
btnLook.addEventListener('click', () =>{
    console.log("coucou");
    tabArticles.forEach((element, index)=>{
        if(quantities[index].innerText === 0){
            console.log("OK");
        }else{
            openModal(tabArticles, index);
        }
    })
})

const loadCategoryBtn = () =>{

    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then(res => res.json())
    .then(data => displayCategoryBtn(data.categories))
    .catch(err => console.log("ERROR", err))

}

const displayCategoryBtn = (categories)=>{

    // console.log(categories);

    const dynamicBtnContainer = document.getElementById("dynamic-btn");

    categories.forEach(category => {

        console.log(category)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        
        <button class="btn py-6 md:px-18 md:py-10 font-bold md:text-xl gap-1 md:gap-3">

        <img class ="w-5 md:w-10" src=${category.category_icon} alt="">
        ${category.category}
        
        </button>

        `
        dynamicBtnContainer.append(btnDiv);
    });

}

loadCategoryBtn();



// 
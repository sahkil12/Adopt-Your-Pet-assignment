
const loadCategoryBtn = () => {

    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then(data => displayCategoryBtn(data.categories))
        .catch(err => console.log("ERROR", err))

}

const displayCategoryBtn = (categories) => {

    // console.log(categories);

    const dynamicBtnContainer = document.getElementById("dynamic-btn");

    categories.forEach(category => {

        // console.log(category)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        
        <button onclick ="loadCategoryCard('${category.category}')" class="btn py-6 md:px-18 md:py-10 font-bold md:text-xl gap-1 md:gap-3">

        <img class ="w-5 md:w-10" src=${category.category_icon} alt="">
        ${category.category}
        
        </button>

        `
        dynamicBtnContainer.append(btnDiv);
    });

}

loadCategoryBtn();



// load category pet card 

const loadAllPetCard = () => {

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => displayPetCard(data.pets))
        .catch(err => console.log("ERROR", err))

}

const displayValue = (value) => {

    if (value === null || value === undefined || value === "" || value === "null" || value === "undefined") {
        return "Not Available";
    }
    else {
        return value;
    }

}

const displayPetCard = (allPets) => {

    const dynamicPetCard = document.getElementById("add-card");

      dynamicPetCard.innerHTML ="";

      if(allPets.length == 0){

        dynamicPetCard.classList.remove("grid")
        dynamicPetCard.innerHTML =`
        
        <div class="h-[500px] items-center text-center space-y-7 flex flex-col justify-center">

    <img src="images/error.webp" alt="">
    <h2 class="font-bold text-xl md:text-3xl">No Information Available</h2>
    <p class="md:w-3/5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>

</div>
        
        `;
      }
      else{
        dynamicPetCard.classList.add("grid")
      }
    
    allPets.forEach(pet => {

      
        console.log(pet);
        const petDiv = document.createElement("div");
        petDiv.classList = ("card bg-base-100  p-4 border border-gray-200");
        petDiv.innerHTML = `
        
         <figure>
    
                <img class="h-[180px] object-cover w-full rounded-md" src=${pet.image} alt="Shoes" />
         </figure>
             <div class="card-body">

             <div class="mt-4">

               <h2 class="text-3xl font-bold mb-6 "> ${displayValue(pet.pet_name)}</h2>

        <div class="flex gap-2 text-base items-center">
            <i class="fa-solid fa-border-all"></i>
            <h3 class="">Breed: ${displayValue(pet.breed)}</h3>
        </div>

        <div class="flex gap-2 text-base items-center">
             <i class="fas fa-calendar-alt"></i>
            <h3 class="">Birth: ${displayValue(pet.date_of_birth)}</h3>
        </div>

        <div class="flex gap-2 text-base items-center">
          <i class="fa-solid fa-mercury"></i>
            <h3 class="">Gender: ${displayValue(pet.gender)}</h3>
        </div>

        <div class="flex gap-2 text-base items-center">
            <i class="fa-solid fa-dollar-sign"></i>
            <h3 class=""> Price: ${displayValue(pet.price)}</h3>
        </div>
  
    </div>
    <div class="divider"></div>
    <div class="flex justify-between">
        <button class="">
        <a class="btn w-10 h-10 border border-teal-700 rounded-xl px-7">
                <i class="fa-regular fa-thumbs-up"></i>
                </a>
        </button>
        <button class="btn px-7 rounded-lg text-teal-800 font-semibold border-teal-700"> Adopt </button>
        <button class="btn px-7 rounded-lg text-teal-800 font-semibold border-teal-700"> Details </button>


    </div>
             
             </div>
              
              <div>
      
                
                </div>

        `

        dynamicPetCard.append(petDiv)


    })

}

loadAllPetCard();


const loadCategoryCard = (categoryPetName) => {

    console.log(categoryPetName);

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryPetName}`)
    .then(res => res.json())
    .then(data => displayPetCard(data.data))
    .catch(err => console.log("ERROR", err))

}

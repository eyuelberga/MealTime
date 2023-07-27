const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
const images = ["/food.jpg", "/food2.jpg", "/food3.jpg"];
const headerText = ["☕️ Breakfast", "🍴 Lunch", "🌜 Dinner"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const foods = ["Bedding Gear",
    "Cleaning Instrument",
    "Camera Machine",
    "Kitchen Tool",
    "Camera Machine",
    "Truck Machine",
    "Game Instrument",
    "Book Contraption",
    "Biking Whatchamacallit",
    "Movie Thingamajig",
    "Storage Doodad",
    "Movie Equipment",
    "Camping Gizmo",
    "Aquarium Accessory",
    "Camera Whatchamacallit",
    "Fitness Device",
    "Camping Supplies",
    "Dining Paraphernalia",
    "Womens Rig",
    "Cooking Gear",
    "Nutrition Whatchamacallit",
    "Swimming Rig",
    "Skin Care Apparatus",
    "First Aid Device",
    "Jewelry Contraption"];

const selectRandom = (list: any[]) => {
    return list[Math.floor((Math.random() * list.length))];
}

export const recipe1 = {
    id: 1,
    name: "Italian Chicken Marinade",
    image: "/food.jpg",
    description: `At preline, our mission has always been focused on bringing
                openness and transparency to the design process. We've always
                believed that by providing a space where designers can share
                ongoing work not only empowers them to make better products, it
                also helps them grow.`,
    prepTime: 5,
    cookTime: 10,
    totalTime: 15,
    lastUpdated: "10 March, 2023",
    servings: 10,
    ingredients: [
        "1 (16 ounce) bottle Italian-style salad dressing",
        "1 teaspoon garlic powder",
        "1 teaspoon salt",
        "4 skinless, boneless chicken breast halves"],
    directions: ["Whisk salad dressing, garlic powder, and salt together in a shallow baking dish; add chicken breasts and turn to coat. Cover the dish with plastic wrap and marinate in the refrigerator, 4 hours to overnight.",
        "Preheat an outdoor grill for high heat and lightly oil the grate.",
        "Remove chicken from marinade and shake off excess; discard remaining marinade.",
        "Cook chicken on the preheated grill until no longer pink in the center and the juices run clear, about 7 to 8 minutes on each side. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C)."]
}


export const fetchRecipes = (length: number) => {
    const list = [];
    while (list.length < length) {
        list.push({
            id: list.length + 1 + "",
            href: `/recipes/${list.length}`,
            image: selectRandom(images),
            name: selectRandom(foods),
            headerText: selectRandom(headerText),
            ingredientCount: selectRandom(numbers),
            cookTime: selectRandom(numbers),
            prepTime: selectRandom(numbers)
        })
    }
    return list;
}

export const fetchCollections = (length: number) => {
    const list = [];
    while (list.length < length) {
        list.push({
            href: `/collections/${list.length}`,
            name: "Collection " + Number(list.length + 1) + "-" + selectRandom(foods),

        })
    }
    return list;
}

export const fetchShoppingLists = (length: number) => {
    const list = [];
    while (list.length < length) {
        list.push({
            href: `/shopping-lists/${list.length}`,
            name: "List " + Number(list.length + 1) + "-" + selectRandom(foods),

        })
    }
    return list;
}

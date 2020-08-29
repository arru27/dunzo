const { setTimeout500 } = require("./helper");

//Machine class
class Machine {
  //Public varibales pertaining to the class
  outletCount;
  inventory = {};
  beverages;

  //Constructor function which initializes values based on the input json file
  constructor(input) {
    const { outlets, total_items_quantity, beverages } = input.machine;
    this.outletCount = outlets.count_n;

    Object.entries(total_items_quantity).forEach(
      ([ingredient, quantity]) => (this.inventory[ingredient] = quantity)
    );

    this.beverages = Object.entries(beverages);
  }

  //Wrapper function to parallely process the beverages
  process = async () => {
    return await Promise.all(this.beverages.map(this.processBeverage));
  };

  //Function called to process individual beverage, checks if inventory
  //is sufficent and deducts the required amount, waits 500ms to mimic
  //the machine processing time
  processBeverage = async ([beverage, recipe]) => {
    try {
      this.isInventorySufficient(beverage, recipe);
      this.deductInventory(recipe);
      await setTimeout500();
      return `${beverage} is prepared`;
    } catch (error) {
      return error;
    }
  };

  //Checks whether inventory is sufficient by checking if its present and
  //the amount left is sufficient for the beverage
  isInventorySufficient = (beverage, recipe) => {
    for (const ingredient in recipe) {
      if (!this.inventory[ingredient]) {
        throw `${beverage} cannot be prepared because ${ingredient} is not available`;
      }
    }

    for (const ingredient in recipe) {
      if (this.inventory[ingredient] < recipe[ingredient]) {
        throw `${beverage} cannot be prepared because item ${ingredient} is not sufficient`;
      }
    }
  };

  //Reduces the ingredient from the inventory
  deductInventory = (recipe) => {
    for (const ingredient in recipe) {
      this.inventory[ingredient] -= recipe[ingredient];
    }
  };
}

module.exports = Machine;

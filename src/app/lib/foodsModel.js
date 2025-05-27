const { default: mongoose } = require("mongoose");

const foodsModel = new mongoose.Schema({
    itemName: String,
    itemPrice: Number,
    itemImg: String,
    itemDecription: String,
    resto_id: mongoose.Schema.Types.ObjectId
})

export const foodSchema = mongoose.model.foods || mongoose.model("foods", foodsModel)
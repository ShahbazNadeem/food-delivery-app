const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD

export const connectionStr = `mongodb+srv://${username}:${password}@cluster0.obhknae.mongodb.net/foodDeliveryAppDb?retryWrites=true&w=majority&appName=Cluster0`

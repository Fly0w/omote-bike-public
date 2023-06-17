import { Schema, model, models } from 'mongoose';

const HistorySchema = new Schema({
    name:{
        type: String,
        required: [true, "Username is required"]
    },
    dateStart:{
        type: String,
        required: [true, "Date is required"]
    },
    dateEnd:{
        type: String,
    }
});

const History = models.History || model("History", HistorySchema);

export default History;
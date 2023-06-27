import { Schema, model, models } from 'mongoose';

const CurrentSchema = new Schema({
    isUsed:{
        type: Boolean,
        required: [true, "isUsed is required"]
    },
    user:{
        type: String,
    },
    passcode:{
        type: String,
    }
});

const Current = models.Current || model("Current", CurrentSchema);

export default Current;
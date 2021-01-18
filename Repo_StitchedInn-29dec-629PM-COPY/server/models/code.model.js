import mongoose from 'mongoose'
const CodeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        //expires: 600,
    }
});

export default mongoose.model('Code', CodeSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'in_progress', 'complete']
    }
});


const Task = mongoose.model('Task', newSchema);

module.exports = Task;
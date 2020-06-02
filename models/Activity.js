const   mongoose    = require('mongoose'),
        Schema = mongoose.Schema

const ActivitySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String
    },
    comments: [],
    picture: String,
    itineraryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Itinerary'
    },
})

Activity = mongoose.model('Activity', ActivitySchema)

// Activity.create({
//     title: 'Actividad de prueba del BackEnd',
//     comments: ['Lindo lugar', 'Muy mala atencion', 'Los banos estan muy sucios'],
//     itineraryId: '5dd0ad65701edc46767fa811'
// })


module.exports = Activity
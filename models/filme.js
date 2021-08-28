const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nomedobanco", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

module.exports = mongoose;
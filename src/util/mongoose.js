import mongoose from "mongoose";

export default {
    mutipleMongooseToOject:function (mongooses) {
        return mongooses.map(mongoose => mongoose.toJSON());
    },
    mongoosetoOject: function(mongoose){
        return mongoose ? mongoose.toOject() : mongoose;
    }
};

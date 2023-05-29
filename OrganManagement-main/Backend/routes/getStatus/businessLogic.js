const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var addonoristration = require('../../handler/DataBaseModel/DonorSchema');
var addseekerristration = require('../../handler/DataBaseModel/Seeker');
var addrequest = require('../../handler/DataBaseModel/Donarrequest');
var UserRegistration = require('../../handler/DataBaseModel/UserSchema');
// const mongodbutil = require('../../config/database');

const updateStatus = async function (req, res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        // var db = mongodbutil.getDb();
        var userrole=req.body.role
        var metaid=req.body.metaid
        var updatedStatus=req.body.status
        if(!req.body.matchid){
        if(userrole==="Donar")
        {
            addonoristration.findOneAndUpdate({metamaskid:metaid},{status:updatedStatus},function (err,data)
            {
                if(err) {
                    res.status(203).send({message:"Problem occured in database"});
                    throw err;
                }
                else {
                    res.status(200).json(data)
                }
            })
        }else
        {
            addseekerristration.findOneAndUpdate({metamaskid:metaid},{status:updatedStatus},function (err,data)
            {
                if(err) {
                    res.status(203).send({message:"Problem occured in database"});
                    throw err;
                }
                else {
                    res.status(200).json(data)
                }
            })
        }}else{
            if(userrole==="Donar")
        {
            addonoristration.findOneAndUpdate({metamaskid:metaid},{status:updatedStatus,matchid:req.body.matchid},function (err,data)
            {
                if(err) {
                    res.status(203).send({message:"Problem occured in database"});
                    throw err;
                }
                else {
                    res.status(200).json(data)
                }
            })
        }else
        {
            addseekerristration.findOneAndUpdate({metamaskid:metaid},{status:updatedStatus,matchid:req.body.matchid},function (err,data)
            {
                if(err) {
                    res.status(203).send({message:"Problem occured in database"});
                    throw err;
                }
                else {
                    res.status(200).json(data)
                }
            })
        }
        }
    })
}
            

            

module.exports.updateStatus = updateStatus;
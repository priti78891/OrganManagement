const MicroServiceResponse = require('../../handler/ResponseModels/MicroServiceResponse');
var Donarrequest = require('../../handler/DataBaseModel/DonorSchema')
var SeekerRequest = require('../../handler/DataBaseModel/Seeker')
var user = require('../../handler/DataBaseModel/UserSchema')
const getRequest = async function (req, res) {
    return await new Promise((resolve, reject) => {
        // var MicroServiceResponse = new MicroServiceResponse();
        try {
            var whichHospital = req.query.hid;
            var whichuserrole = req.query.userrole;
            if(whichuserrole === 'Donar'){
                if(req.query.metaid)
                {
                    var metaid=req.query.metaid
                    Donarrequest.find({hid:whichHospital,metamaskid:metaid}, async function(err,data){
                        if(err) {
                            res.status(203).send({message:"Problem occured in database"});
                            throw err;
                        } else {
                            console.log(data)
                           await user.find({_id:data[0].uid})
                                .then(docs=>{
                                    console.log(docs)
                                    res.status(200).send([{
                                        fullName: docs[0].fullName,
                                        mobileno: docs[0].mobileno,
                                        email: docs[0].email,
                                        city:data[0].city,
                                        state: data[0].state,
                                        status: data[0].status,
                                        matchid:data[0].matchid,
                                        district: data[0].district,
                                        bloodgroup:data[0].bloodgroup,
                                        orgname: data[0].orgname,
                                        hid: data[0].hid,
                                        metamaskid: data[0].metamaskid,
                                        date:data[0].date,
                                    }])
                                })
                                .catch(err=>{
                                    console.log(err);
                                    res.status(400).send({message:"Not FOund"})
                                })
                            }})
                        
                }
                else{
                Donarrequest.find({hid:whichHospital}, async function(err,data){
                    if(err) {
                        res.status(203).send({message:"Problem occured in database"});
                        throw err;
                    } else {
                        var a=[];
                        console.log(data);
                        for(var i = 0; i < data.length; i++) {
                            //res.send(data)
                            console.log(data[i]);
                        await user.find({_id:data[i].uid})
                        .then(docs=>{
                            console.log(docs);
                            a.push({
                                fullName: docs[0].fullName,
                                mobileno: docs[0].mobileno,
                                email: docs[0].email,
                                city:data[i].city,
                                state: data[i].state,
                                status: data[i].status,
                                matchid:data[i].matchid,
                                district: data[i].district,
                                bloodgroup:data[i].bloodgroup,
                                orgname: data[i].orgname,
                                hid: data[i].hid,
                                metamaskid: data[i].metamaskid,
                                date:data[i].date,
                            });
                        })
                        .catch(err=>{
                            console.log(err);
                            res.status(400).send({message:"Not FOund"})
                        })
                            
                        }
                        console.log(a);
                    res.status(200).send(a);
                        
                    }
                })}
            } else if(whichuserrole === 'Seeker'){
                console.log("seeker")
                SeekerRequest.find({hid:whichHospital}, async function(err,data){

                    if(err) {
                        res.status(203).send({message:"Problem occured in database"});
                        throw err;
                    } else {
                    //     console.log(data)
                    //     console.log("user "+user.find({_id:data[0].uid}))
                    //     user.find({_id:data[0].uid})
                    //     .then(docs=>{
                    //         console.log("docs"+docs)
                    //         res.status(200).send([{
                    //             fullName: docs[0].fullName,
                    //             mobileno: docs[0].mobileno,
                    //             email: docs[0].email,
                    //             address: data[0].address,
                    //             country: data[0].country,
                    //             city:data[0].city,
                    //             state: data[0].state,
                    //             district: data[0].district,
                    //             bloodgroup:data[0].bloodgroup,
                    //             orgname: data[0].orgname,
                    //             status: data[0].status,
                    //             hid: data[0].hid,
                    //             metamaskid: data[0].metamaskid,
                    //             date:data[0].date,
                    //         }]);
                    //     })
                    //     .catch(err=>{
                    //         console.log(err);
                    //         res.status(400).send({message:"Not FOund"})
                    //     })
                    var a=[];
                        console.log(data);
                        for(var i = 0; i < data.length; i++) {
                            //res.send(data)
                            console.log(data[i]);
                        await user.find({_id:data[i].uid})
                        .then(docs=>{
                            console.log(docs);
                            a.push({
                                fullName: docs[0].fullName,
                                mobileno: docs[0].mobileno,
                                email: docs[0].email,
                                city:data[i].city,
                                state: data[i].state,
                                status: data[i].status,
                                matchid:data[i].matchid,
                                district: data[i].district,
                                bloodgroup:data[i].bloodgroup,
                                orgname: data[i].orgname,
                                hid: data[i].hid,
                                metamaskid: data[i].metamaskid,
                                date:data[i].date,
                            });
                        })
                        .catch(err=>{
                            console.log(err);
                            res.status(400).send({message:"Not FOund"})
                        })
                            
                        }
                        console.log(a);
                    res.status(200).send(a);
                     }
                })
            } else {
                res.status(203).send({ message: "User Not Found" });
            }

        } catch (err) {
            console.log('Error catched in Finding Hospitals in Database : ' + err.name + " : " + err.message);

            // microServiceResponse.MicroserviceErrorResponseListForUI.push(err.message);
            // microServiceResponse.MicroserviceErrorResponseList.push(err);

            // resolve(microServiceResponse);
            res.status(500).send({ message:"This error is from our side"});
        }
    })
}

module.exports.getRequest = getRequest;
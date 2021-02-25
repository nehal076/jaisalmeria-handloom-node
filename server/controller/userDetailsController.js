var UserDetails = require('../model/userDetailsModel');

class Controller {
    getUserDetails(req,res) {
        if(!req.query.userId){
            res.status(400).send({ message : "No UserId found"});
            return;
        }

        UserDetails.find({ userId: req.query.userId}).then(data =>{
            if(!data.length){
              res.status(404).send({ message : "Not found user with id "+ req.query.userId})
            } else {
              res.send({ 
                statusCode: 0, 
                message: "Success",
                data: data[0]
              })
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error retrieving user with id " + req.query.userId})
        })
    }

    addNewAddress(req,res) {
        if(!req.body.userId){
            res.status(400).send({ message : "No UserId found"});
            return;
        }

        const userDetails = new UserDetails({
            userId: req.body.userId,
        })
        userDetails.addressList.push(req.body.addressData)

        UserDetails.findOne({userId: req.body.userId}).then(data=> {
            if(data) {
                UserDetails.findOneAndUpdate({userId: req.body.userId}, { $push: { addressList: req.body.addressData } }).then(data => {
                    res.send({ statusCode: 0, message: "Success",data: req.body.addressData.type + " added to the database"})
                })
                .catch(err =>{
                    res.status(500).send({
                        message : err.message
                    });
                });
            } else {
                UserDetails.save(userDetails).then(data => {
                    res.send({ statusCode: 0, message: "Success",data: req.body.addressData.type + " added to the database"})
                })
                .catch(err =>{
                    res.status(500).send({
                        message : err.message
                    });
                });
            }
        })
    }
}

module.exports = new Controller();

// const {createTable}  = require("../model/model")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { signupTable, dataInsert, akshay, mobileBuilder } = require("../model/model.js")
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
const saltRounds = 10;
require('../../config')
// const md5 = require('md5')
const mb = async (req, res) => {
    console.log(req.body, 'body')
    const { shop, email, password, password_test, firstName, lastName, phone, customer_accesstoken, expireAt, acceptsMarketing, customer_id, cart_id } = req.body
    // const insert = await mobileBuilder.create({shop:shop, email:email, password:password, password_test:password_test, firstName:firstName, lastName:lastName, phone:phone, customer_accesstoken:customer_accesstoken, expireAt:expireAt, acceptsMarketing:acceptsMarketing, customer_id:customer_id, cart_id:cart_id})
    // if(insert) {
    //     res.send({message:"success"})
    // }
    try {
        const update = await mobileBuilder.findOneAndUpdate(
            { "cart_id": cart_id },
            {
                $set: {
                    cart_id: {
                        $cond: {
                            if: { $eq: ["$cart_id", cart_id] }, // If cart_id is 20
                            then: cart_id, // Set it to 30
                            else: "" // Otherwise, set it to an empty string
                        }
                    }
                }
            }
        )
        if (update) {
            res.send({ "data": update })
        }
    } catch (err) {
        console.log(err)
    }

}
const mailer = async (req, res) => {
    const { fname, lname, email, psw } = req.body;
    console.log(email, 'email')
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testshineapp@gmail.com',
            pass: 'wswhwzvboffeojcn'
        }
    });

    let mailDetails = {
        from: 'testshineapp@gmail.com',
        to: '' + email + '',
        subject: 'kawal Test mail',
        text: 'firstname:' + fname + ''
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
}
const dataEnter = async (req, res) => {
    const { email, phone, description } = req.body
    let insert = await dataInsert.create({ email: email, description: description, phone: phone })
    if (insert) {
        res.json({ message: "success", data: insert })
    } else {
        res.json({ message: "not insert" })
    }
}
const createUser = async (req, res) => {
    // res.send({message:"succesfully get",data:req.body})
    console.log(req.body,"__________________________________")
    console.log(req.file)
    // return
    const { email, lname, fname, psw, file } = req.body;
    multer.diskStorage({
        destination: "./images",
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}--${file.originalname}`);
        },
    });
    let check = await signupTable.find({ email: email })
    // console.log(check)
    if (check.length > 0) {
        res.json({ message: "alredy exist" })
    } else {
        let hashPassword = await bcrypt.hash(psw, saltRounds)

        let result = await signupTable.create({ email: email, fname: fname, lname: lname, password: hashPassword, image: file })
        if (result) {
            // res.json({message:"new inserted"})
          console.log(result)

            res.json({ message: "new inserted", result: result });
        }
    }

}

const login = async (req, res) => {
    console.log
    const { username, password } = req.body
    let result = await signupTable.find({ email: username });
    let a = result[0]
    // if(result.length > 0) {

    //     console.log(result)
    //     res.json({message:"login success",data:result});
    // }else {
    //     res.json({message:"invalid login"});
    //     console.log(result)
    // }
    bcrypt.compare(password, a.password, function (err, result1) {
        res.json({ status: result1 })
        req.session.views = username;
        console.log(req.session, 'req.session.views123')
        console.log(req.session.views, 'req.session.views')
    });
}
const getData = async (req, res) => {
    // const data1 = await signupTable.aggregate([{
    //     $lookup: {
    //     from: 'dataInsert',
    //     LocalField:'_id',
    //     foreignField: 'email',
    //     as: 'dataArray'
    //     }}]);
    //     if(data1) {
    //         console.log(data1)
    //     }else {
    //         console.log('not')
    //     }
    let id = 'gid://shopify/Product/7731880591526';
    // const data1 = await akshay.find({shop:"test-updatedpre.myshopify.com"});
    // update = await akshay.updateMany({ "shop": "test-updatedpre.myshopify.com",},{"landing_page": ["kawal"] })


    // update1 = await akshay.updateMany(
    //             { "shop": "test-updatedpre.myshopify.com", landing_page: { $elemMatch: { $or: [{ name: "Wolf" }, { name: "Tigers" }] } } },
    //             { $set: { "teams.$[elem].score": 10 } },
    //             { arrayFilters: [{ "elem.name": { $in: ["Wolf", "Tigers"] } }] }
    //             )
    let update2 = await akshay.updateMany(


        { "landing_page.type": { $in: ["products", "collections"] } },

        {

            $pull: {

                "landing_page.$[].data": { id: id }

            }

        },

        { arrayFilters: [{ "elem.type": { $in: ["products", "collections"] } }] }


    )
    // Update array value in a collection
    let update1 = await akshay.updateMany(

        { "shop": "test-updatedpre.myshopify.com", "landing_page.type": { $in: ["hero_slider"] } }, // Specify the document you want to update
        { $set: { "landing_page.$[].data": "new value" } }, // Use $set and dot notation to update the array value
        { arrayFilters: [{ "landing_page.$[].data": { id: id } }] } // Use arrayFilters to match the specific array element
    )

    console.log(update1, 'update')
    // data1.map((e,i)=> {
    //     let data2 = e.landing_page;
    //     data2.map((a,j)=> {

    //         if(a.type == 'announcement_bar') {
    //             let valueArray = a.selected_item;
    //             if(valueArray != undefined && valueArray.id == pid ) {
    //                 updateValue = data2.selected_item
    //                 try {
    //                      update = akshay.findByIdAndUpdate({ "shop": "test-updatedpre.myshopify.com",_id:e.id},{"landing_page": ["kawal"] })
    //                      if(update) {
    //                         console.log(update)
    //                         console.log('updated succesfully')
    //                      }

    //                  } catch (error) {
    //                     console.log(error)
    //                  }

    //             }
    //         }
    //     })
    // })
}
const updateUser = (req, res) => {
    try {

    } catch (error) {

    }
}
const deleteUser = (req, res) => {
    try {

    } catch (error) {

    }
}
const logout = (req, res) => {
    try {

    } catch (error) {

    }
}
const forgot = (req, res) => {
    try {

    } catch (error) {

    }
}
const resetPasword = (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = { createUser, login, resetPasword, forgot, logout, deleteUser, updateUser, dataEnter, getData, mailer, mb }
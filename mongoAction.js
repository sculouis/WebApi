let MongoClient = require('mongodb').MongoClient;
let dbName = "erpdb"
let url = `mongodb+srv://testUser:Louis058414@cluster0-hxv3f.mongodb.net?retryWrites=true&w=majority`

function Insert(objs) {
    return new Promise((resolve,reject) => {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            reject(err)
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        let dbo = db.db(dbName)
        let cName = "purchaseorder"
        dbo.collection(cName).insertMany(objs, function (err, result) {
            if (err) {
                reject(err)
            };
            db.close(); //關閉連線
            resolve(result.insertedCount)
        })
    })
})
}

function Delete(queryObj) {
    return new Promise((resolve,reject) => {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            reject(err)
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        let dbo = db.db(dbName)
        let cName = "purchaseorder"
        dbo.collection(cName).deleteMany(queryObj, function (err, result) {
            if (err) {
                reject(err)
            };
            db.close(); //關閉連線
            resolve(result.deletedCount)
        })
    })
})
}

function CreateDatabase(){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        console.log("資料庫建立成功")
        db.close(); //關閉連線
    })
}

function CreateCollect() {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        let dbo = db.db(dbName)
        let cName = "purchaseorder"
        dbo.createCollection(cName, function (err, result) {
            if (err) {
                throw err
            };
            console.log(result)
            db.close(); //關閉連線
        })
    })
}

function DropCollect(){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        let dbo = db.db(dbName)
        let cName = "a"
        try {
            dbo.dropCollection(cName,function (err, result) {
                if (err) {
                    throw err
                };
                console.log(`collection:${cName} deleted`)
                db.close(); //關閉連線
            })
        } catch (error) {
            console.log(error)
        }
    })
}

function Query() {
    return new Promise((resolve,reject) => {
    // Connect to the db
    MongoClient.connect(url, function (err, db) {
        if (err) {
            reject(err)
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        let dbo = db.db(dbName)
        let cName = "purchaseorder"
        try {
            dbo.collection(cName).find({}).toArray(function (err, result) {
                if (err) {
                    throw err
                };
                db.close(); //關閉連線
                resolve(result)
            })
        } catch (error) {
            console.log(error)
        }
    })
})
}
module.exports = {Query,CreateCollect,CreateDatabase,Insert,Delete}
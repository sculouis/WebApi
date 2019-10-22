let MongoClient = require('mongodb').MongoClient;
let dbName = "erpdb"
let url =  "mongodb+srv://testUser:Louis058414@cluster0-hxv3f.mongodb.net?retryWrites=true&w=majority"

//新增單筆請購明細
function InsertPr(obj) {
    return new Promise((resolve,reject) => {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            reject(err)
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        let dbo = db.db(dbName)
        let cName = "purchase"
        dbo.collection(cName).insertOne(obj, function (err, result) {
            if (err) {
                reject(err)
            };
            db.close(); //關閉連線
            resolve(result.insertedCount)
        })
    })
})
}

//新增多筆
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

//刪除多筆
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

//更新
function Update(queryObj,updObj) {
    return new Promise((resolve,reject) => {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            reject(err)
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        let dbo = db.db(dbName)
        let cName = "purchaseorder"
        dbo.collection(cName).update(queryObj,updObj, function (err, result) {
            if (err) {
                reject(err)
            };
            db.close(); //關閉連線
            resolve(result)
        })
    })
})
}

//建立資料庫
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

//建立資料集合
function CreateCollect(cName) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        let dbo = db.db(dbName)
        dbo.createCollection(cName, function (err, result) {
            if (err) {
                throw err
            };
            console.log(result)
            db.close(); //關閉連線
        })
    })
}

// 刪除資料集合
function DropCollect(cName){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        let dbo = db.db(dbName)
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

//取得所有資料集合
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

//取得所有請購資料集合
function QueryPr() {
    return new Promise((resolve,reject) => {
    // Connect to the db
    MongoClient.connect(url, function (err, db) {
        if (err) {
            reject(err)
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        let dbo = db.db(dbName)
        let cName = "purchase"
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

//取得代碼資料
function QueryCodeItem(kind) {
    return new Promise((resolve,reject) => {
    // Connect to the db
    MongoClient.connect(url, function (err, db) {
        if (err) {
            reject(err)
        }
        //Write databse Insert/Update/Query code here..
        console.log('mongodb is running!');
        let dbo = db.db(dbName)
        let cName = "codeItem"
        try {
            dbo.collection(cName).find({kind}).toArray(function (err, result) {
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


module.exports = {Query,CreateCollect,CreateDatabase,Insert,Delete,Update,InsertPr,QueryPr,QueryCodeItem}
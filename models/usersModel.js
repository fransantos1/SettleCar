const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 

function dbUserToUser(dbUser)  {
    let user = new User();
    user.id = dbUser.usr_id;
    user.name = dbUser.usr_name;
    return user;
}

class User {
    constructor(id, name, pass, email, token, usr_type) {
        this.id = id;
        this.name = name;
        this.phone = pass;
        this.email = email;
        this.token = token;
        this.user_type = usr_type;
    }
    export() {
        let user=new User();
        user.id = this.name;
        return user; 
    }
    static async getById(id) {
        try {
            let dbResult = await pool.query("Select * from usr where usr_id=$1", [id]);
            let dbUsers = dbResult.rows;
            if (!dbUsers.length) 
                return { status: 404, result:{msg: "No user found for that id."} } ;
            let dbUser = dbUsers[0];
            return { status: 200, result: 
                new User(dbUser.usr_id,dbUser.usr_name,dbUser.usr_email, dbUser.usr_token, dbUser.usr_type)} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }
    static async getALL() {
        try {
            let dbResult = await pool.query("Select * from usr");
            let dbUsers = dbResult.rows;
            /*
            if (!dbUsers.length) 
                return { status: 404, result:{msg: "No user found for that id."} } ;*/
                let Results = [];
                for (let users of dbUsers) {
                        Results.push(new User(users.usr_id,users.usr_name,users.usr_email,users.usr_token,users.usr_type));
                    }
            return { status: 200, result:
                Results} ;

        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }
    static async register(user) {
        try {
            let dbResult =
                await pool.query("Select * from appuser where usr_name=$1", [user.name]);
            let dbUsers = dbResult.rows;
            if (dbUsers.length)
                return {
                    status: 400, result: [{
                        location: "body", param: "name",
                        msg: "That name already exists"
                    }]
                };
            let encpass = await bcrypt.hash(user.pass,saltRounds);   
            dbResult = await pool.query(`Insert into appuser (usr_name, usr_pass)
                       values ($1,$2)`, [user.name, encpass]);
            return { status: 200, result: {msg:"Registered! You can now log in."}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
 

    static async checkLogin(user) {
        try {
            let dbResult =
                await pool.query("Select * from appuser where usr_name=$1", [user.name]);
            let dbUsers = dbResult.rows;
            if (!dbUsers.length)
                return { status: 401, result: { msg: "Wrong username or password!"}};
            let dbUser = dbUsers[0]; 
            let isPass = await bcrypt.compare(user.pass,dbUser.usr_pass);
            if (!isPass) 
                return { status: 401, result: { msg: "Wrong username or password!"}};
           
            return { status: 200, result: dbUserToUser(dbUser) } ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    // No verifications. Only to use internally
    static async saveToken(user) {
        try {
            let dbResult =
                await pool.query(`Update appuser set usr_token=$1 where usr_id = $2`,
                [user.token,user.id]);
            return { status: 200, result: {msg:"Token saved!"}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async getUserByToken(token) {
        try {
            let dbResult =
                await pool.query(`Select * from appuser where usr_token = $1`,[token]);
            let dbUsers = dbResult.rows;
            if (!dbUsers.length)
                return { status: 403, result: {msg:"Invalid authentication!"}} ;
            let user = dbUserToUser(dbUsers[0]);
            return { status: 200, result: user} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

module.exports = User;
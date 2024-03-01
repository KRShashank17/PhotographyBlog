import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account ;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({email, password , name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);      //* first parameter - ID
            if (userAccount){
                // redirect to LOGIN
                return this.login(email, password );
            }else{
                // for further processing 
                return userAccount;
            }
        } catch (error) {
            console.log("AuthService error :: createAccount", error);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("AuthService error :: login", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("AuthService error :: getAccount", error);
        }

        return null;        // alternative to "ifelse" in try block
    }

    async logout(){
        try {
            // return await this.account.deleteSession("current");      
            await this.account.deleteSessions();             // session logout from everywhere
        } catch(error){
            console.log("AuthService error :: logout", error);
        }
    }

}

const authService = new AuthService();      //* create "Object" for direct access

export default authService;
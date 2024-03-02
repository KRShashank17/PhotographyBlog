import conf from '../conf/conf.js'
import { Client, ID , Databases, Storage , Query} from "appwrite";

export class Service{
    client = new Client();
    database;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.projectId)
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title , slug, content , featuredImage, status , userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,                           // Document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost", error);
        }
    }

    async updatePost({title , slug, content , featuredImage, status , userId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, 
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch (error){
            console.log("Appwrite Service :: updatePost", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch(error){
            console.log("Appwrite Service :: deletePost", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                    // method 2 : as parameter
                queries,
                    // method 1: direct within
                // [
                //     Query.equal("status","active")
                // ]                
            )
        } catch(error){
            console.log("Appwrite Service :: getPosts", error);
            return false;
        }
    }

            // upload , delete FILES on Bucket/Storage
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service :: deleteFile", error);
            return false;
        }
    }

    getFilePreview(fileId){                 //  generally faster - no need of "async"
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;
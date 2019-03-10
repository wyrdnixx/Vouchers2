import axios from 'axios';
import { resolve } from "url";



//const url = `http://docker:5000/api/posts/`;
const url = window.location.protocol + "//"+ window.location.hostname +":5000/api/posts/"

//const archiveUrl = `http://docker:5000/api/posts/archive`;
const archiveUrl = window.location.protocol + "//"+ window.location.hostname +":5000/api/posts/archive"

//const assigVoucherUrl = `http://docker:5000/api/posts/assignvoucher`;
const assigVoucherUrl = window.location.protocol + "//"+ window.location.hostname +":5000/api/posts/assignvoucher"

//const pdfUrl = `http://docker:5000/api/posts/pdf`;
const pdfUrl = window.location.protocol + "//"+ window.location.hostname +":5000/api/posts/pdf"



class PostService {

    // Get Posts
static getPosts() {



    return new Promise(async (resolve, reject) => {
        try {            
            const res = await axios.get(url);
            const data = res.data;
            resolve(
                data.map(post => ({
                    ...post,
                    createdAt: new Date(post.createdAt)
                }))
            );
        }catch(err) {
            reject(err);
        }
    })
    }
 
       // Get Archive
static getArchive() {

    
    console.log("in getArchive")
    return new Promise(async (resolve, reject) => {
        try {            
            const res = await axios.get(archiveUrl);
            const data = res.data;
            resolve(
                data.map(archived => ({
                    ...archived,
                   // createdAt: new Date(archived.createdAt)
                }))
            );
        }catch(err) {
            reject(err);
        }
    })
    }

    static getVoucherPdf2(voucher, user) {
        return new Promise(async (resolve, reject) => {
        try {
            const res =  axios.get(pdfUrl, {
                params: {
                    voucher: voucher,
                    user: user
                },
                responseType: 'blob'
            });
            } catch(err) {
                reject(err)
            }
        })
    }

    static getVoucherPdf (voucher, kunde) {
        axios({
            url: pdfUrl,
            method: 'GET',
            responseType: 'blob', // important
            params: {
                voucher: voucher,
                kunde: kunde
            }
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'file.pdf'); //or any other extension
             document.body.appendChild(link);
             link.click();
          });
    }


    // Create Post
    static insertPost(text,info) {
    return axios.post(url, {
        text,
        info
    });
    }

    // Assign Voucher
    static assignVoucher(voucher, roll,user) {
        return axios.post(assigVoucherUrl, {
            voucher,
            roll,
            user
        });
    }

    // Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }

}

export default PostService;


import axios from 'axios';
import { resolve } from "url";



const url = `http://docker:5000/api/posts/`;
const assigVoucherUrl = `http://docker:5000/api/posts/assignvoucher`;
const pdfUrl = `http://docker:5000/api/posts/pdf`;



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
 
static getVoucherPdf(voucher, user) {
/*
    return axios.get(pdfUrl, {
        voucher,
        user
    }   
    */

    return axios.get(pdfUrl, {
        params: {
            voucher: voucher,
            user: user
        }
    })
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


import axios from 'axios';
import { resolve } from "url";


const url = `http://192.168.178.29:5000/api/posts/`;
const assigVoucherUrl = `http://192.168.178.29:5000/api/posts/assignvoucher`;
const pdfUrl = `http://192.168.178.29:5000/api/posts/pdf`;

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
    return axios.post(pdfUrl, {
        voucher,
        user
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


import axios from 'axios';
import { resolve } from "url";


const url = `http://docker:5000/api/posts/`;
const assigVoucherUrl = `http://docker:5000/api/posts/assignvoucher`;

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

/*
static getVouchers() {
    return new Promise(async (resolve, reject) => {
        var _url = `http://docker:5000/api/posts/`;
        try {
            const res = await axios.get();
        }
    })
}
*/ 

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


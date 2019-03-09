<template>

    <div class="container">

        <h1>WLAN Voucher Assignment</h1>
        <!-- CREATE POST HERE-->

        <div class="create-post">
            <p class="text">
                <a href="#" @click='toggleVouchers'>Vouchers available:
                    {{availableVouchers}}</a>
            </p>
            <br>
                <p class="text">
                    <a href="#" @click='toggleArchive'>Vouchers Archiv</a>
                </p>
                <br>

                    <!-- <label for="create-post">Say something...</label> <input type="text"
                    id="create-post" v-model="text" placeholder="Create a Post"> <button
                    v-on:click="createPost">Post</button> -->
                    <input type="text" id="user" v-model="user" placeholder="Assign Voucher to:">
                        <button v-on:click="assignVoucher(user)">Generate Voucher Document</button>

                    </div>

                    <div
                        id="msg"
                        style="display: none; padding: 1em; position: fixed; margin: 1px 300px;"></div>

                    <hr>
                        <hr>
                            <div class="post-container" v-show="togglevouchers">
                                <p class="text">Available Vouchers</p>
                                <br>
                                    <p class="error" v-if="error">{{ error}}</p>

                                    <div
                                        class="post"
                                        v-for="post in posts"
                                        v-bind:key="post._id"
                                        v-on:dblclick="deletePost(post._id)">
                                        <div class="create-post">
                                            <p class="text">Roll:
                                                {{post.roll}}
                                                Voucher:
                                                {{post.voucher}}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="post-container" v-show="togglearchive">
                                    <p class="text">Vouchers Archiv</p>
                                    <br>
                                        <p class="error" v-if="error">{{ error}}</p>
                                     
                                  
                                       <div class="post" >

                                            <p class="smalltext">
                                           <table  class="table">
                                                  <tr>
                                                   <th>Rolle</th>
                                                   <th>Voucher</th>
                                                   <th>pat</th>
                                                   <th>Name</th>
                                                   <th>createdAt</th>
                                                   <th>user</th>                                                   
                                               </tr>
                                               
                                               <tr v-for="a in archived" v-bind:key="a._id">
                                                   <td>{{a.roll}}</td>
                                                   <td>{{a.voucher}}</td>
                                                   <td>{{a.pat}}</td>
                                                   <td>{{a.chr}}, {{a.name}}</td>
                                                   <td>{{a.createdAt}}</td>
                                                   <td>{{a.user}}</td>                                                   
                                               </tr>
                                           </table>
                                              </p>
                                    </div>

                                  </div>
                                    </div>
                                </template>

                                <script>

                                    import PostService from '../PostService'
                                    import axios from 'axios'
                                    export default {
                                        name: 'PostComponent',
                                        data() {
                                            return {
                                                posts: [],
                                                archived: [],
                                                error: ``,
                                                voucher: ``,
                                                roll: ``,
                                                user: ``,
                                                availableVouchers: ``,
                                                togglevouchers: ``,
                                                togglearchive: ``,
                                                searchQuery: '',                                             
                                        
                                            }
                                            
                                        },                                      
                                        async created() {

                                            try {
                                                this.posts = await PostService.getPosts();
                                                this.availableVouchers = this.posts.length;
                                            } catch (err) {
                                                this.error = err.message;

                                            }
                                        },
                                        methods: {
                                            async createPost() {
                                                await PostService.insertPost(this.voucher, this.roll);
                                                this.posts = await PostService.getPosts();
                                            },
                                            async assignVoucher(user) {

                                                var currentVoucher = this.posts[0];
                                                console.log("Current Voucher: ", currentVoucher)
                                                console.log("User : ->" + user + "<-")
                                                if (typeof currentVoucher == "undefined") {
                                                    console.log("No Voucher available ")
                                                    this.msgFailed("ERROR: No Vouchers available")
                                                } else if (user == "") {
                                                    console.log("No Username given ")
                                                    this.msgFailed("ERROR: No Username given")
                                                } else {

                                                    console.log("voucher: ", currentVoucher.voucher)
                                                    console.log("roll: ", currentVoucher.roll)
                                                    console.log("user: ", user)
                                                    await PostService.assignVoucher(
                                                        currentVoucher.voucher,
                                                        currentVoucher.roll,
                                                        user
                                                    );

                                                    //--> PDf generieren
                                                    console.log(await PostService.getVoucherPdf(currentVoucher.voucher, user));

                                                    this.posts = await PostService.getPosts();
                                                    this.availableVouchers = this.posts.length;
                                                    this.user = "";
                                                }

                                            },
                                            async deletePost(id) {
                                                await PostService.deletePost(id);
                                                this.posts = await PostService.getPosts();
                                                this.availableVouchers = this.posts.length;
                                            },
                                            async toggleVouchers() {
                                                this.togglevouchers = !this.togglevouchers;
                                                this.posts = await PostService.getPosts();
                                                this.availableVouchers = this.posts.length;
                                            },
                                            async toggleArchive() {

                                                this.togglearchive = !this.togglearchive;
                                                try {
                                                    this.archived = await PostService.getArchive();
                                                    console.log("Archive: " + this.archived[0]._id)
                                                } catch (err) {
                                                    this.error = err.message;
                                                    this.msgFailed("ERROR: " + this.err)
                                                }
                                                //this.archived = this.archived.length;
                                            },
                                            msgFailed: function (data) {

                                                console.log("in error function")

                                                $("#msg").css(
                                                    {"background-color": "rgb(248, 66, 66)", "border-radius": "20px"}
                                                );
                                                $('#msg')
                                                    .html(data)
                                                    .fadeIn('slow');
                                                $('#msg')
                                                    .delay(3000)
                                                    .fadeOut('slow');
                                            }
                                        }
                                    }
                                </script>

                                <!-- Add "scoped" attribute to limit CSS to this component only -->
                                <style scoped="scoped">
                                    div.container {
                                        max-width: 800px;
                                        margin: 0 auto;
                                    }

                                    p.error {
                                        border: 1px solid #ff5b5f;
                                        background-color: #ffc5c1;
                                        padding: 10px;
                                        margin-bottom: 15px;
                                    }

                                    div.post {
                                        position: relative;
                                        border: 1px solid #5bd658;
                                        background-color: #bcffb8;
                                        padding: 10px 10px 30px;
                                        margin-bottom: 15px;
                                    }

                                    div.created-at {
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        padding: 5px 15px;
                                        background-color: darkgreen;
                                        color: white;
                                        font-size: 13px;
                                    }

                                    p.text {
                                        font-size: 22px;
                                        font-weight: 700;
                                        margin-bottom: 0;
                                    }
                                    
                                    p.smalltext {
                                        font-size: 14px;
                                        font-weight: 500;
                                        margin-bottom: 0;
                                    }
                                    table {
                                      width: 100%;
                                      text-align: left;
                                      border: 1px solid black;
                                      border-collapse: collapse;
                                           
                                    }
                                    th {
                                      padding: 5px;
                                      font-weight: 700;
                                      border: 1px solid black;
                                    }
                                     td {
                                       padding: 10px;
                                       font-size: 14px;
                                       font-weight: 500;
                                       margin-bottom: 0;
                                       border: 1px solid black;
                                    }
                                </style>
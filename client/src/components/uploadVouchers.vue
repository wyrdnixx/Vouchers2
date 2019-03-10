<template>

    <div class="container">

         <button type="button" class="btn btn-primary" @click='toggleVoucherbox'>Upload New Vouchers</button>
         <div class="post-container" v-show="togglevoucherbox">             
             <textarea class="form-control" rows="10" :id="id" v-model="textarea"> 
             </textarea>

            <div id="msg" style="display: none; padding: 1em; position: fixed; margin: 1px 300px;"></div>
             
            <button type="button" class="btn btn-success" @click='uploadVouchers'>Upload</button>
         </div>
    </div>
</template>

     <script>

                                    //import PostService from '../PostService'
                                    import axios from 'axios'
                                    export default {
                                        name: 'uploadVouchers',
                                        data() {
                                            return {                                              
                                                error: ``,
                                                newvouchers: ``,
                                                roll: ``,
                                                textarea: null,
                                                id: `,`,
                                                togglevoucherbox: ``,
                                                
                                        
                                            }
                                            
                                        },                                      
                                        async created() {

                                        },
                                        methods: {                                            
                                            toggleVoucherbox() {
                                                this.togglevoucherbox = !this.togglevoucherbox;                                                
                                            },
                                            uploadVouchers(){
                                                var checkInput = true

                                                //console.log("Input: ",this.textarea )
                                                // Input zerteilen in einzelne Zeilen
                                                var lines = $('textarea').val().split('\n');

                                                // Prüfung des inputs, ob es den vorgaben entspricht
                                                for(var i = 0;i < lines.length;i++){
                                                //    console.log("First char: ",lines[i].slice(0,1) )
                                                //    console.log("last char: ",lines[i].slice(-1) )
                                                
                                                    // die ersen 7 Zeilen beginnen mit #
                                                    if (i <=6 && (lines[i].slice(0,1) == "#") ){
                                                        // console.log("Line correct: ",i)
                                                    }
                                                    // die folgenden Zeilen beginnen und enden mit " oder ist leer
                                                    else if (i > 6 && (lines[i].slice(0,1) == '"') &&  (lines[i].slice(-1) == '"')  ||  lines[i] == '') {
                                                      //  console.log("Line correct: ",i)                                                    
                                                    }
                                                    // eine Zeile entspricht nicht den vorgaben
                                                    else {
                                                        console.log("Invalid Line: ", i)
                                                        this.msgFailed("Eingabe Fehlerhaft - Vouchercodes incl. Headerzeilen und Anführungszeichen eingeben!")
                                                        checkInput = false
                                                    }
                                                }
                                                   // wenn die validierung erfolgreich war
                                                if (checkInput) {

                                                    //Rollennumer aus der ersen Zeile (leztes "wort") lesen
                                                    var n = lines[0].split(" ")
                                                    var rollnr = n[n.length - 1]

                                                    console.log("Voucher Rolle nummer: " + rollnr  )

                                                                                                        
                                                     var jsonstring = "["


                                                    // beginne in Zeile 7 mit den voucher Codes
                                                    for(var i = 7;i < lines.length;i++){                                                                                                     
                                                   
                                                        var tmp = "{'voucher' : '" + lines[i].replace(/"/g,"") + "','roll': '" + rollnr + "'}"
                                                        if (i < lines.length -1) {
                                                            tmp = tmp + ","
                                                        }
                                                        console.log("JSON Line: " + tmp)                                                        
                                                        jsonstring = jsonstring + tmp   

                                                    
                                                    }
                                                        jsonstring = jsonstring + "]"

                                                    console.log("zusammengesetzter JSON-String: " + jsonstring)
                                                    //this.postVouchers(jsonobj)
                                                    this.postVouchers(jsonstring).then(
                                                        response => {
                                                            console.log("Ergebniss:" + response.statusText) // actually outputs a string

                                                            // Wenn Ergebniss erfolgeich, dann status anzeigen und Webseite neuladen
                                                            if (response.statusText == "Created") {
                                                                this.msgInfo("Voucher Codes wurden erfolgreich hochgeladen")                                                                
                                                                setTimeout(function () {
                                                                    location.reload()
                                                                }, 5000)

                                                            }
                                                        }
                                                    ).catch(
                                                       error => console.log("ERROR: " +error)
                                                    );
                                                }
                                            }, 
                                            postVouchers(data) {    
                                             //const   url = "http://docker:5000/api/posts"
                                             //console.log('window.location', window.location.origin);

                                             const url = window.location.protocol + "//"+ window.location.hostname +":5000/api/posts/uploadVouchers"
                                             console.log("URL: ", url)
                                            //return new Promise(async (resolve, reject) => {
                                            //try {            
                                            //    const res = await axios.post(url, {
                                            //        data
                                            //    });
                                            //     this.msgFailed(res);
                                            //    }catch(err) {
                                            //        this.msgFailed(err.message);
                                            //    }
                                            //})
                                            return new Promise(async (resolve, reject) => {
                                            const res = await axios.post(url, {
                                                data
                                              }, {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                }
                                              })
                                              .then(function (response) {                                                                                                
                                               resolve(response);
                                              })
                                              .catch(function (error) {
                                                console.log(error);
                                              });
                                            })
                                            },                                           
                                            msgFailed: function (data) {

                                                console.log("in error message function")

                                                $("#msg").css(
                                                    {"background-color": "rgb(248, 66, 66)", "border-radius": "20px"}
                                                );
                                                $('#msg')
                                                    .html(data)
                                                    .fadeIn('slow');
                                                $('#msg')
                                                    .delay(3000)
                                                    .fadeOut('slow');
                                            },
                                            msgInfo: function (data) {

                                                console.log("in correct message function")

                                                $("#msg").css(
                                                    {"background-color": "rgb(3, 173, 37)", "border-radius": "20px"}
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

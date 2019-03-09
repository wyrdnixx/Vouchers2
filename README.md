Vouchers

Postman Test infos:

GET

-> voucher per URL generieren
http://docker:5000/api/posts/pdf?user=Hans&voucher=123sadf3fdgh

-> Voucher KIS Schnittstelle
http://docker:5000/api/posts/patVoucher/?pat=19001111&chr=Hubert&name=Mayer&user=F-HANS


-> user mit zugewiesenem voucher auslesen
http://docker:5000/api/posts/users

-> verf�gbare voucher auslesen
http://docker:5000/api/posts

Posts:
-> Voucher hinzu f�gen:
http://docker:5000/api/posts

RAW - Type JSON:
[
{
"voucher": "dsfhsgdf",
"roll": "7"
},
{
"voucher": "4564565",
"roll": "7"
},
{
"voucher": "dfghdfgh",
"roll": "7"
},
{
"voucher": "456",
"roll": "7"
},
{
"voucher": "456",
"roll": "7"
},
{
"voucher": "dfgh",
"roll": "8"
},
{
"voucher": "dfgh",
"roll": "8"
},
{
"voucher": "456456",
"roll": "8"
},
{
"voucher": "safdg",
"roll": "8"
},
{
"voucher": "3546",
"roll": "8"
},
{
"voucher": "sdgsdf",
"roll": "9"
},
{
"voucher": "df343",
"roll": "9"
},
{
"voucher": "sdsfg",
"roll": "9"
},
{
"voucher": "sdfgsdg",
"roll": "9"
},
{
"voucher": "6sgsdfgdf",
"roll": "9"
}
]

Generate sample Data:
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=19001111&chr=adfg&name=dfgh&user=F-asdS"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=19002222&chr=asdfgg&name=sgdfhj&user=F-df"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=1900473&chr=dsfg&name=Mafgjyer&user=F-asgg"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=190034564356&chr=kjtzu&name=Mafdghyer&user=F-456"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=1900456451&chr=sdfg&name=Mayer&user=F-fgjjjd"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=190067891&chr=ukulö&name=Mayer&user=F-dfgdfgh"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=19007891&chr=sdfgh&name=dfg&user=F-fdghd"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=190012345&chr=klkl&name=Mayer&user=F-dfghd"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=190013411&chr=ifghj&name=Mayer&user=F-5678"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=1900145671&chr=5drfgh&name=dfgh&user=F-hjlk"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=190011456&chr=dgf&name=Mayer&user=F-sdk"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=190018745&chr=e5&name=dfgh&user=F-sdfgj"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=19001561&chr=djdf&name=Mayer&user=F-ghk"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=19003451&chr=6547&name=Mayer&user=F-ahsd"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=190013456&chr=sdf&name=dfgh&user=F-5sgfhsg"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=1900167981&chr=drtziu&name=Mayer&user=F-sdkfg"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=1900167896&chr=Hudsfgbert&name=dfgh&user=F-dfjfdg"
iexplore.exe "http://docker:5000/api/posts/patVoucher/?pat=190067891&chr=sdfg&name=dfgh&user=F-sdfg"
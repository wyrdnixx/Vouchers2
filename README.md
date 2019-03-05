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

RAW:

[
{
"voucher": "6UVeTsadfS6II68",
"roll": "5"
},
{
"voucher": "kGasdfZ38iBgyx4",
"roll": "5"
},
{
"voucher": "asdfWUhfyvWo43",
"roll": "5"
},
{
"voucher": "kiViNq31sdfase3p7b",
"roll": "5"
},
{
"voucher": "jLzSQu23423434ZMPJa",
"roll": "5"
}
]
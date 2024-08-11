const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");
const ytdl = require("@distube/ytdl-core");
const cookies = [
    {
        "name": "ST-ws11ct",
        "value": "oq=avirbhav%20AND%20PIHU&gs_l=youtube.1.1.0i3i471k1j0i512i433i131k1l5j0i3k1j0i512k1j0i3k1j0i512k1j0i512i433i131k1l2j0i512k1l2.321486.329680.2.334010.28.25.0.0.0.0.798.4104.4-3j2j2.7.0.ytrpptm2_etop5%2Crlmn%3Dng3_unified_p13n_top5_20240522_ast_proto-recordio...0...1ac.1.64.youtube..23.5.3097...0i512i433i67i131i650k1j33i160k1.0.cAIjKwDaKG4&itct=CA0Q7VAiEwjFlLC4k8SGAxXkZJ0JHcV2Btg%3D&csn=5XL8FUNNhOAPs_nR&endpoint=%7B%22clickTrackingParams%22%3A%22CA0Q7VAiEwjFlLC4k8SGAxXkZJ0JHcV2Btg%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fresults%3Fsearch_query%3Davirbhav%2Band%2Bpihu%2Bperformance%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_SEARCH%22%2C%22rootVe%22%3A4724%7D%7D%2C%22searchEndpoint%22%3A%7B%22query%22%3A%22avirbhav%20and%20pihu%20performance%22%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717580224,
        "storeId": null
    },
    {
        "name": "VISITOR_PRIVACY_METADATA",
        "value": "CgJJThIEGgAgLg%3D%3D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1733126489,
        "storeId": null
    },
    {
        "name": "ST-3opvp5",
        "value": "session_logininfo=AFmmF2swRQIgI2_8fVdaP3pt_JssvyCqUOSgd0ZPakGYOODhW8yh8RUCIQDaJmRdUMw2JtHO-j1hbNzdMXzRIiO6Z6whtl8mFupmEg%3AQUQ3MjNmejZYekpQc1hSS21xb2VCR2tKbTJuQkNnWUlGTGJCODJQU21Eeml1NUtRUGtPdTQwY09UQmpranpMbG9FR2c1QldQRThfM01lOXJMRkhwMnZReld0RExxMVlENm0zaWtEcDFwUlA3UmdfdGJITUEtYXVtd2VNV0NWZ2MzMFpGVmd5T0s3SXhKc3JRQXhTSENzU0xTUlhTTXdwcHVB",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1723396480,
        "storeId": null
    },
    {
        "name": "ST-svd6r6",
        "value": "itct=CDcQpDAYDSITCPX7j5Kmx4YDFVVYDwIdkj4HrjIHcmVsYXRlZEiVvrrT3--RgHOaAQUIARD4HQ%3D%3D&csn=C1lXxUIUH7Y8UB-Z&endpoint=%7B%22clickTrackingParams%22%3A%22CDcQpDAYDSITCPX7j5Kmx4YDFVVYDwIdkj4HrjIHcmVsYXRlZEiVvrrT3--RgHOaAQUIARD4HQ%3D%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DFlAk4SQ_Y84%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22FlAk4SQ_Y84%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr1---sn-cvh76nes.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D165024e1243f63ce%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D186250%26mt%3D1717687255%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687935,
        "storeId": null
    },
    {
        "name": "ST-9mto9w",
        "value": "csn=BlRxsEUKJhUv_qk3&itct=COkBEKQwGAMiEwiog9OPpMeGAxXQWQ8CHV0pClEyB3JlbGF0ZWRI8ILbv9bP3IYkmgEFCAEQ-B0%3D&endpoint=%7B%22clickTrackingParams%22%3A%22COkBEKQwGAMiEwiog9OPpMeGAxXQWQ8CHV0pClEyB3JlbGF0ZWRI8ILbv9bP3IYkmgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DImnLvEYpsXw%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22ImnLvEYpsXw%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr3---sn-cvh76nls.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D2269cbbc4629b17c%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D186250%26mt%3D1717687013%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687411,
        "storeId": null
    },
    {
        "name": "ST-16j99xv",
        "value": "itct=CNEBEKQwGAIiEwiv8NfMpceGAxXjag8CHSW5AVIyB3JlbGF0ZWRIjY2lipTLrtkfmgEFCAEQ-B0%3D&csn=-LG4QN5rtIn_BHAt&endpoint=%7B%22clickTrackingParams%22%3A%22CNEBEKQwGAIiEwiv8NfMpceGAxXjag8CHSW5AVIyB3JlbGF0ZWRIjY2lipTLrtkfmgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DVEFjlYSNgBo%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22VEFjlYSNgBo%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr4---sn-cvh7knek.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D54416395848d801a%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D190000%26mt%3D1717687255%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687879,
        "storeId": null
    },
    {
        "name": "ST-y6h0gr",
        "value": "csn=oBGBdMhGQmGFoQXn&itct=CLUBEKQwGAIiEwitkr6-pceGAxUMXw8CHcchB2syB3JlbGF0ZWRIlZi09I6Eitu8AZoBBQgBEPgd&endpoint=%7B%22clickTrackingParams%22%3A%22CLUBEKQwGAIiEwitkr6-pceGAxUMXw8CHcchB2syB3JlbGF0ZWRIlZi09I6Eitu8AZoBBQgBEPgd%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DF3Wv1B8egCg%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22F3Wv1B8egCg%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr6---sn-ci5gup-25us.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D1775afd41f1e8028%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D226250%26mt%3D1717687255%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687772,
        "storeId": null
    },
    {
        "name": "ST-xuwub9",
        "value": "session_logininfo=AFmmF2swRQIgI2_8fVdaP3pt_JssvyCqUOSgd0ZPakGYOODhW8yh8RUCIQDaJmRdUMw2JtHO-j1hbNzdMXzRIiO6Z6whtl8mFupmEg%3AQUQ3MjNmejZYekpQc1hSS21xb2VCR2tKbTJuQkNnWUlGTGJCODJQU21Eeml1NUtRUGtPdTQwY09UQmpranpMbG9FR2c1QldQRThfM01lOXJMRkhwMnZReld0RExxMVlENm0zaWtEcDFwUlA3UmdfdGJITUEtYXVtd2VNV0NWZ2MzMFpGVmd5T0s3SXhKc3JRQXhTSENzU0xTUlhTTXdwcHVB",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1723396482,
        "storeId": null
    },
    {
        "name": "ST-17wj3rb",
        "value": "itct=CM8BEKQwGAIiEwikmsudpMeGAxWQVw8CHaVoCq0yB3JlbGF0ZWRI_OKmscT38rQimgEFCAEQ-B0%3D&csn=N_JXlu5Fw5Gb1KIJ&endpoint=%7B%22clickTrackingParams%22%3A%22CM8BEKQwGAIiEwikmsudpMeGAxWQVw8CHaVoCq0yB3JlbGF0ZWRI_OKmscT38rQimgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DvLYoIO6NDBU%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22vLYoIO6NDBU%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr4---sn-cvh7knsz.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3Dbcb62820ee8d0c15%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D186250%26mt%3D1717687013%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687748,
        "storeId": null
    },
    {
        "name": "__Secure-3PSID",
        "value": "g.a000mwhzDg_N9JflU81slW5VZwKCVy_tLtjBbGxYEH8EKUjQmNgafI5lnMJfr61MeFm87SuJGAACgYKAYcSARQSFQHGX2MiT6nt76_2VkBK7g7lDSipkhoVAUF8yKr4hI2cm2Jh6fnVKbl4clnC0076",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": true,
        "firstPartyDomain": "",
        "partitionKey": null,
        "storeId": null
    },
    {
        "name": "ST-1a4lr9z",
        "value": "itct=CLwBEKQwGAUiEwjztc7CqMeGAxXMVQ8CHdZSCFIyB3JlbGF0ZWRIlMHoo9mBtMIamgEFCAEQ-B0%3D&csn=9Z5xv5IhU40Xp6g8&endpoint=%7B%22clickTrackingParams%22%3A%22CLwBEKQwGAUiEwjztc7CqMeGAxXMVQ8CHdZSCFIyB3JlbGF0ZWRIlMHoo9mBtMIamgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3Didz6HAXB4Dg%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22idz6HAXB4Dg%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr1---sn-cvh76nl6.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D89dcfa1c05c1e038%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D180000%26mt%3D1717688214%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717688701,
        "storeId": null
    },
    {
        "name": "GPS",
        "value": "1",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1723398113,
        "storeId": null
    },
    {
        "name": "SIDCC",
        "value": "AKEyXzV_b9N-kQREWBwDxqkFgayna9yrl0mF2dYgmhcz8bcAJndKi4dcYTCf9qe4JIzG96RQgA",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1754932485,
        "storeId": null
    },
    {
        "name": "YSC",
        "value": "yn5MSYt8x4o",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": true,
        "firstPartyDomain": "",
        "partitionKey": null,
        "storeId": null
    },
    {
        "name": "SID",
        "value": "g.a000mwhzDg_N9JflU81slW5VZwKCVy_tLtjBbGxYEH8EKUjQmNgaM2Jq-jwAAAWKe3z735lzcgACgYKAUASARQSFQHGX2Mi2j5kzn3RaKMEnazaGMPX9RoVAUF8yKovvHtjcZW1NokPyJZ8bnh30076",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": true,
        "firstPartyDomain": "",
        "partitionKey": null,
        "storeId": null
    },
    {
        "name": "ST-xwm4fy",
        "value": "csn=lGqsB9g03GCdN5Xw&itct=COIBEKQwGAQiEwji_4r9o8eGAxU0Wg8CHVSgBroyB3JlbGF0ZWRI0p7Jkuy_tcZJmgEFCAEQ-B0%3D&endpoint=%7B%22clickTrackingParams%22%3A%22COIBEKQwGAQiEwji_4r9o8eGAxU0Wg8CHVSgBroyB3JlbGF0ZWRI0p7Jkuy_tcZJmgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DJA1yfWf2wXA%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22JA1yfWf2wXA%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr5---sn-cvhelnls.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D240d727d67f6c170%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D187500%26mt%3D1717687013%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687381,
        "storeId": null
    },
    {
        "name": "__Secure-1PSIDTS",
        "value": "sidts-CjIBUFGoh7e-1c0zA9_R9qbhwaztNAqJ7d9YMibAvgmCYDTd2D1bZGgi2yn_av79j16uZBAA",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1754932472,
        "storeId": null
    },
    {
        "name": "ST-1nu83mp",
        "value": "csn=G1T3rnZsYU8uemdV&itct=CKABEKQwGAQiEwj_z-2EqceGAxXOXw8CHd5qPWAyB3JlbGF0ZWRIuMCHrsDDvu6JAZoBBQgBEPgd&endpoint=%7B%22clickTrackingParams%22%3A%22CKABEKQwGAQiEwj_z-2EqceGAxXOXw8CHd5qPWAyB3JlbGF0ZWRIuMCHrsDDvu6JAZoBBQgBEPgd%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DZWIw5fpyqlg%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22ZWIw5fpyqlg%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr4---sn-ci5gup-25us.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D656230e5fa72aa58%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D205000%26mt%3D1717688451%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717688730,
        "storeId": null
    },
    {
        "name": "CONSISTENCY",
        "value": "AKreu9u5zVQxeevU0BNurwQJJ3qLxGbL6KZaRqo0rpCvX0NZXLnfbCWrgtfihnF_nyI6j-4_yv5gvBNQC3ZQ4bOC2qMK_zo7qgOjnDHTVFVBtKZvfFJmSIwaj7cOEepV6RqxJYXsLowKquXqFLeaR-4",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1723397069,
        "storeId": null
    },
    {
        "name": "ST-126085u",
        "value": "itct=CNwBENwwGAUiEwiT1pmri8SGAxWYn0sFHT6UKGwyBnNlYXJjaFITZWxlY3Rpb24gMjAyNCBpbmRpYZoBAxD0JA%3D%3D&csn=eYAxP0bqdVRIiVjW&endpoint=%7B%22clickTrackingParams%22%3A%22CNwBENwwGAUiEwiT1pmri8SGAxWYn0sFHT6UKGwyBnNlYXJjaFITZWxlY3Rpb24gMjAyNCBpbmRpYZoBAxD0JA%3D%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DZdwS9UVwvUQ%26pp%3DygUTZWxlY3Rpb24gMjAyNCBpbmRpYQ%253D%253D%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22ZdwS9UVwvUQ%22%2C%22params%22%3A%22qgMTZWxlY3Rpb24gMjAyNCBpbmRpYboDERIPUkROU0x3QVB3MnA0UkowugMREg9SRE5TaS1NNXFWSzk3VEm6AxESD1JETlNkaEtMVnhOMVZ1d7oDCwjlzMKIo6GeqLMBugMKCLmWpsDq1fSQXroDCwjSwJjCiomS5IkBugMKCKaNoKycuby9TroDCwj5s76A7bv8h5oBugMKCLTlgamwppfPCLoDCgij1dC8yaaNriS6AwoIlZuUqbb65NxdugMKCKDSyJvOkr-XGLoDCwiQjaTK4cr6jo0BugMKCMPpgp_H8aThY7oDCwjPk87o0MDYxq8BugMLCJbUrL-Yg5vq1wG6AwsI14vjj-SnxOasAboDCwj9hr-Pt_i0kZEBugMKCJyTsOi_gLjwQvIDBQ3Dc_s-%22%2C%22playerParams%22%3A%22ygUTZWxlY3Rpb24gMjAyNCBpbmRpYQ%253D%253D%22%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr1---sn-ci5gup-25ud.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D65dc12f54570bd44%26ip%3D2401%253A4900%253A168f%253A1384%253A75cc%253A6a72%253Afdea%253A2e60%26initcwndbps%3D222500%26mt%3D1717577330%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717577747,
        "storeId": null
    },
    {
        "name": "ST-1ynqd2x",
        "value": "csn=G1T3rnZsYU8uemdV&itct=CNYBEKQwGAMiEwizz_CSqceGAxWuag8CHXMODH0yB3JlbGF0ZWRI2NTK09-cjLFlmgEFCAEQ-B0%3D&endpoint=%7B%22clickTrackingParams%22%3A%22CNYBEKQwGAMiEwizz_CSqceGAxWuag8CHXMODH0yB3JlbGF0ZWRI2NTK09-cjLFlmgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3D7P7a3_tac3k%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%227P7a3_tac3k%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr5---sn-ci5gup-25uz.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3Decfedadffb5a7379%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D198750%26mt%3D1717688451%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717688830,
        "storeId": null
    },
    {
        "name": "ST-1apfpwr",
        "value": "csn=9Z5xv5IhU40Xp6g8&itct=CKwBEKQwGAMiEwjqhI-nqMeGAxXcRg8CHXJ8DFYyB3JlbGF0ZWRIqqO9vdXIsuVtmgEFCAEQ-B0%3D&endpoint=%7B%22clickTrackingParams%22%3A%22CKwBEKQwGAMiEwjqhI-nqMeGAxXcRg8CHXJ8DFYyB3JlbGF0ZWRIqqO9vdXIsuVtmgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DGoTQDZR6IJQ%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22GoTQDZR6IJQ%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr2---sn-cvh7knze.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D1a84d00d947a2094%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D178750%26mt%3D1717688214%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717688563,
        "storeId": null
    },
    {
        "name": "SAPISID",
        "value": "wICszVt8cRW7-kgq/A-Q8mnmbZpO7MufGx",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": true,
        "firstPartyDomain": "",
        "partitionKey": null,
        "storeId": null
    },
    {
        "name": "__Secure-1PSIDCC",
        "value": "AKEyXzUfjdNSiFt-27wNjYQD6YB8kb87skKWf40lqrDWO57brmeV99uxkTrxatEzVv3KJ9v-vg",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1754932485,
        "storeId": null
    },
    {
        "name": "SSID",
        "value": "ARC4fEglWjkMzRYOu",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": true,
        "firstPartyDomain": "",
        "partitionKey": null,
        "storeId": null
    },
    {
        "name": "ST-17hktuu",
        "value": "itct=CLQBEKQwGAUiEwiNmJP9pceGAxVHVQ8CHZyvAlIyB3JlbGF0ZWRImoC2pNjy2KBUmgEFCAEQ-B0%3D&csn=oCZCH_4egJ3UsIKU&endpoint=%7B%22clickTrackingParams%22%3A%22CLQBEKQwGAUiEwiNmJP9pceGAxVHVQ8CHZyvAlIyB3JlbGF0ZWRImoC2pNjy2KBUmgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DcwBHffpunxU%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22cwBHffpunxU%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr3---sn-cvh76nls.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D7300477dfa6e9f15%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D190000%26mt%3D1717687255%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687893,
        "storeId": null
    },
    {
        "name": "ST-u7ax47",
        "value": "csn=rxuBuWIP2xKdtNya&itct=CJABENwwIhMI9NP7pKPHhgMV9cBMAh0_5g32MgpnLWhpZ2gtcmVjWg9GRXdoYXRfdG9fd2F0Y2iaAQYQjh4YngE%3D&endpoint=%7B%22clickTrackingParams%22%3A%22CJABENwwIhMI9NP7pKPHhgMV9cBMAh0_5g32MgpnLWhpZ2gtcmVjWg9GRXdoYXRfdG9fd2F0Y2iaAQYQjh4YngE%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DSYzV_sJST1I%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22SYzV_sJST1I%22%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr5---sn-cvh7knze.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D498cd5fec2524f52%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D185000%26mt%3D1717686772%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687342,
        "storeId": null
    },
    {
        "name": "ST-1rv8yco",
        "value": "itct=CPwBEKQwGAAiEwji_4r9o8eGAxU0Wg8CHVSgBroyB3JlbGF0ZWRI0p7Jkuy_tcZJmgEFCAEQ-B0%3D&csn=rxuBuWIP2xKdtNya&endpoint=%7B%22clickTrackingParams%22%3A%22CPwBEKQwGAAiEwji_4r9o8eGAxU0Wg8CHVSgBroyB3JlbGF0ZWRI0p7Jkuy_tcZJmgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3D6_4jWF22oXE%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%226_4jWF22oXE%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr1---sn-cvh7knzr.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3Debfe23585db6a171%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D186250%26mt%3D1717687013%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687379,
        "storeId": null
    },
    {
        "name": "ST-115v4i9",
        "value": "csn=-LG4QN5rtIn_BHAt&itct=CK4BEKQwGAIiEwjQ2pTJpceGAxUuYA8CHdCyNg8yB3JlbGF0ZWRIqID6-MH667oXmgEFCAEQ-B0%3D&endpoint=%7B%22clickTrackingParams%22%3A%22CK4BEKQwGAIiEwjQ2pTJpceGAxUuYA8CHdCyNg8yB3JlbGF0ZWRIqID6-MH667oXmgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DH7K6WUFJRo0%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22H7K6WUFJRo0%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr2---sn-ci5gup-25us.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D1fb2ba594149468d%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D226250%26mt%3D1717687255%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687778,
        "storeId": null
    },
    {
        "name": "ST-tladcw",
        "value": "session_logininfo=AFmmF2swRQIgI2_8fVdaP3pt_JssvyCqUOSgd0ZPakGYOODhW8yh8RUCIQDaJmRdUMw2JtHO-j1hbNzdMXzRIiO6Z6whtl8mFupmEg%3AQUQ3MjNmejZYekpQc1hSS21xb2VCR2tKbTJuQkNnWUlGTGJCODJQU21Eeml1NUtRUGtPdTQwY09UQmpranpMbG9FR2c1QldQRThfM01lOXJMRkhwMnZReld0RExxMVlENm0zaWtEcDFwUlA3UmdfdGJITUEtYXVtd2VNV0NWZ2MzMFpGVmd5T0s3SXhKc3JRQXhTSENzU0xTUlhTTXdwcHVB",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1723396479,
        "storeId": null
    },
    {
        "name": "__Secure-1PAPISID",
        "value": "wICszVt8cRW7-kgq/A-Q8mnmbZpO7MufGx",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": true,
        "firstPartyDomain": "",
        "partitionKey": null,
        "storeId": null
    },
    {
        "name": "__Secure-1PSID",
        "value": "g.a000mwhzDg_N9JflU81slW5VZwKCVy_tLtjBbGxYEH8EKUjQmNgagRWdunGD_-hyg3Z49wIBogACgYKAQYSARQSFQHGX2MiZqmImW9ZjLddz3I4vFrQlxoVAUF8yKq-haVSJMre4vcz5Yct3OOU0076",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": true,
        "firstPartyDomain": "",
        "partitionKey": null,
        "storeId": null
    },
    {
        "name": "__Secure-3PAPISID",
        "value": "wICszVt8cRW7-kgq/A-Q8mnmbZpO7MufGx",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": true,
        "firstPartyDomain": "",
        "partitionKey": null,
        "storeId": null
    },
    {
        "name": "__Secure-3PSIDCC",
        "value": "AKEyXzUEzeFtfr7uWpCsl7-7mVFbBQIsrj_84tqfQyIWdcyI1v_zbgLGymFWzMTeYo08N3TL",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1754932485,
        "storeId": null
    },
    {
        "name": "__Secure-3PSIDTS",
        "value": "sidts-CjIBUFGoh7e-1c0zA9_R9qbhwaztNAqJ7d9YMibAvgmCYDTd2D1bZGgi2yn_av79j16uZBAA",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1754932472,
        "storeId": null
    },
    {
        "name": "APISID",
        "value": "UHwHuZ8QEAs_sJzP/A7JYEzLpaG2LhmV3Z",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": true,
        "firstPartyDomain": "",
        "partitionKey": null,
        "storeId": null
    },
    {
        "name": "HSID",
        "value": "Au83Vj9tCENyoCXGV",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": true,
        "firstPartyDomain": "",
        "partitionKey": null,
        "storeId": null
    },
    {
        "name": "LOGIN_INFO",
        "value": "AFmmF2swRQIgI2_8fVdaP3pt_JssvyCqUOSgd0ZPakGYOODhW8yh8RUCIQDaJmRdUMw2JtHO-j1hbNzdMXzRIiO6Z6whtl8mFupmEg:QUQ3MjNmejZYekpQc1hSS21xb2VCR2tKbTJuQkNnWUlGTGJCODJQU21Eeml1NUtRUGtPdTQwY09UQmpranpMbG9FR2c1QldQRThfM01lOXJMRkhwMnZReld0RExxMVlENm0zaWtEcDFwUlA3UmdfdGJITUEtYXVtd2VNV0NWZ2MzMFpGVmd5T0s3SXhKc3JRQXhTSENzU0xTUlhTTXdwcHVB",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1786468472,
        "storeId": null
    },
    {
        "name": "PREF",
        "value": "f6=40000000&tz=Asia.Kolkata&f7=100&f5=30000",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1786468482,
        "storeId": null
    },
    {
        "name": "ST-17259i5",
        "value": "itct=CN0BEKQwGAAiEwikmsudpMeGAxWQVw8CHaVoCq0yB3JlbGF0ZWRI_OKmscT38rQimgEFCAEQ-B0%3D&csn=BlRxsEUKJhUv_qk3&endpoint=%7B%22clickTrackingParams%22%3A%22CN0BEKQwGAAiEwikmsudpMeGAxWQVw8CHaVoCq0yB3JlbGF0ZWRI_OKmscT38rQimgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DzQZCgJ5IQg0%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22zQZCgJ5IQg0%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr1---sn-cvh7knze.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3Dcd0642809e48420d%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D186250%26mt%3D1717687013%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687748,
        "storeId": null
    },
    {
        "name": "ST-1a6dfj4",
        "value": "oq=AVIRB&gs_l=youtube.1.3.0i512i433i131k1j0i3k1l2j0i512i433i131k1l3j0i3k1j0i512i433i131k1l2j0i3k1l3j0i512i433i131i650k1j0i512i433i131k1.2166326.2171402.1.2175009.6.5.0.1.1.0.431.431.4-1.2.0.ytrpptm2_etop5%2Crlmn%3Dng3_unified_p13n_top5_20240522_ast_proto-recordio...0...1ac.1.64.youtube..3.2.455.0...755.Q-ik1OGEFsk&itct=CA0Q7VAiEwjflvuyk8SGAxWqaJ0JHXdwBcA%3D&csn=cmK_3lDniZ6Gzn1p&endpoint=%7B%22clickTrackingParams%22%3A%22CA0Q7VAiEwjflvuyk8SGAxWqaJ0JHXdwBcA%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fresults%3Fsearch_query%3Davirbhav%2Bsuperstar%2Bsinger%2B3%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_SEARCH%22%2C%22rootVe%22%3A4724%7D%7D%2C%22searchEndpoint%22%3A%7B%22query%22%3A%22avirbhav%20superstar%20singer%203%22%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717579890,
        "storeId": null
    },
    {
        "name": "ST-1b",
        "value": "disableCache=true&itct=CBgQsV4iEwjdjJjDpseGAxV7Xg8CHd-jAr0%3D&csn=enH94WVqcmjTVXhI&endpoint=%7B%22clickTrackingParams%22%3A%22CBgQsV4iEwjdjJjDpseGAxV7Xg8CHd-jAr0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2F%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_BROWSE%22%2C%22rootVe%22%3A3854%2C%22apiUrl%22%3A%22%2Fyoutubei%2Fv1%2Fbrowse%22%7D%7D%2C%22browseEndpoint%22%3A%7B%22browseId%22%3A%22FEwhat_to_watch%22%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717688495,
        "storeId": null
    },
    {
        "name": "ST-1f8pdla",
        "value": "itct=COgBENwwIhMI-unqoqjHhgMV1l8PAh2WdzGtMgZnLWhpZ2haD0ZFd2hhdF90b193YXRjaJoBBhCOHhiACg%3D%3D&csn=SuJRi-3yQm5pfqpe&endpoint=%7B%22clickTrackingParams%22%3A%22COgBENwwIhMI-unqoqjHhgMV1l8PAh2WdzGtMgZnLWhpZ2haD0ZFd2hhdF90b193YXRjaJoBBhCOHhiACg%3D%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DbcrKRVevUao%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22bcrKRVevUao%22%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr3---sn-ci5gup-25us.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D6dcaca4557af51aa%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D208750%26mt%3D1717688214%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717688504,
        "storeId": null
    },
    {
        "name": "ST-1jx5qp6",
        "value": "oq=EL&gs_l=youtube.1.0.0i512i433i131i650k1j0i512i433i131k1j0i512i433i131i650k1j0i512i433i131k1l2j0i512i433i131i650k1l4j0i512i433i131k1j0i3k1j0i512i433i131i650k1l3.1461.2300.0.5134.3.3.0.0.0.0.436.827.3-1j1.3.0.ytrpptm2_etop5%2Crlmn%3Dng3_unified_p13n_top5_20240522_ast_proto-recordio...0...1ac.1.64.youtube..0.2.826.0..0i512k1.634.HHxjcUbrX3I&itct=CA0Q7VAiEwjLk7rS_8OGAxWUntgFHWuWDA0%3D&csn=M5e0d9r9rLIvG1IA&endpoint=%7B%22clickTrackingParams%22%3A%22CA0Q7VAiEwjLk7rS_8OGAxWUntgFHWuWDA0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fresults%3Fsearch_query%3Delection%2B2024%2Bindia%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_SEARCH%22%2C%22rootVe%22%3A4724%7D%7D%2C%22searchEndpoint%22%3A%7B%22query%22%3A%22election%202024%20india%22%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717577715,
        "storeId": null
    },
    {
        "name": "ST-1m9lop",
        "value": "itct=CM4BEKMwGAEiEwjTrdm_pseGAxU2WA8CHVJ7NEAyCmxpc3Rfb3RoZXKaAQUIDBD4HQ%3D%3D&csn=tTmGU6ldavlS2WE2&endpoint=%7B%22clickTrackingParams%22%3A%22CM4BEKMwGAEiEwjTrdm_pseGAxU2WA8CHVJ7NEAyCmxpc3Rfb3RoZXKaAQUIDBD4HQ%3D%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DM6fXTM_urMI%26list%3DRDCMUCmL1WlDI8UkXDXCXcBQN9CA%26start_radio%3D1%26rv%3DM6fXTM_urMI%26t%3D0%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22M6fXTM_urMI%22%2C%22playlistId%22%3A%22RDCMUCmL1WlDI8UkXDXCXcBQN9CA%22%2C%22params%22%3A%22OALAAQHCAwtNNmZYVE1fdXJNSQ%253D%253D%22%2C%22continuePlayback%22%3Atrue%2C%22loggingContext%22%3A%7B%22vssLoggingContext%22%3A%7B%22serializedContextData%22%3A%22GhxSRENNVUNtTDFXbERJOFVrWERYQ1hjQlFOOUNB%22%7D%7D%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr2---sn-cvh76nek.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D33a7d74ccfeeacc2%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D182500%26mt%3D1717687732%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%2C%22startTimeSeconds%22%3A0%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717688025,
        "storeId": null
    },
    {
        "name": "ST-har7q6",
        "value": "csn=tTmGU6ldavlS2WE2&itct=CNYBEKQwGAIiEwja9L-bpseGAxWvWA8CHQ8POlEyB3JlbGF0ZWRIm9WQspezhbghmgEFCAEQ-B0%3D&endpoint=%7B%22clickTrackingParams%22%3A%22CNYBEKQwGAIiEwja9L-bpseGAxWvWA8CHQ8POlEyB3JlbGF0ZWRIm9WQspezhbghmgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DM6fXTM_urMI%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22M6fXTM_urMI%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr2---sn-cvh76nek.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D33a7d74ccfeeacc2%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D182500%26mt%3D1717687255%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717688019,
        "storeId": null
    },
    {
        "name": "ST-l3hjtt",
        "value": "session_logininfo=AFmmF2swRQIgI2_8fVdaP3pt_JssvyCqUOSgd0ZPakGYOODhW8yh8RUCIQDaJmRdUMw2JtHO-j1hbNzdMXzRIiO6Z6whtl8mFupmEg%3AQUQ3MjNmejZYekpQc1hSS21xb2VCR2tKbTJuQkNnWUlGTGJCODJQU21Eeml1NUtRUGtPdTQwY09UQmpranpMbG9FR2c1QldQRThfM01lOXJMRkhwMnZReld0RExxMVlENm0zaWtEcDFwUlA3UmdfdGJITUEtYXVtd2VNV0NWZ2MzMFpGVmd5T0s3SXhKc3JRQXhTSENzU0xTUlhTTXdwcHVB",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1723396478,
        "storeId": null
    },
    {
        "name": "ST-pgna3y",
        "value": "csn=5lLwmu0WMSo-_SoW&itct=CLEBEKQwGAQiEwjK8tuXpseGAxWKWw8CHfhkAqkyB3JlbGF0ZWRIzsf9oZKciagWmgEFCAEQ-B0%3D&endpoint=%7B%22clickTrackingParams%22%3A%22CLEBEKQwGAQiEwjK8tuXpseGAxWKWw8CHfhkAqkyB3JlbGF0ZWRIzsf9oZKciagWmgEFCAEQ-B0%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DIXAVmXZEKps%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22IXAVmXZEKps%22%2C%22nofollow%22%3Atrue%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr5---sn-cvh7knle.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D2170159976442a9b%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D178750%26mt%3D1717687732%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717687943,
        "storeId": null
    },
    {
        "name": "ST-w4qoko",
        "value": "csn=tTmGU6ldavlS2WE2&itct=CM4BEKMwGAEiEwjTrdm_pseGAxU2WA8CHVJ7NEAyCmxpc3Rfb3RoZXKaAQUIDBD4HQ%3D%3D&endpoint=%7B%22clickTrackingParams%22%3A%22CM4BEKMwGAEiEwjTrdm_pseGAxU2WA8CHVJ7NEAyCmxpc3Rfb3RoZXKaAQUIDBD4HQ%3D%3D%22%2C%22commandMetadata%22%3A%7B%22webCommandMetadata%22%3A%7B%22url%22%3A%22%2Fwatch%3Fv%3DM6fXTM_urMI%26list%3DRDCMUCmL1WlDI8UkXDXCXcBQN9CA%26start_radio%3D1%26rv%3DM6fXTM_urMI%22%2C%22webPageType%22%3A%22WEB_PAGE_TYPE_WATCH%22%2C%22rootVe%22%3A3832%7D%7D%2C%22watchEndpoint%22%3A%7B%22videoId%22%3A%22M6fXTM_urMI%22%2C%22playlistId%22%3A%22RDCMUCmL1WlDI8UkXDXCXcBQN9CA%22%2C%22params%22%3A%22OALAAQHCAwtNNmZYVE1fdXJNSQ%253D%253D%22%2C%22continuePlayback%22%3Atrue%2C%22loggingContext%22%3A%7B%22vssLoggingContext%22%3A%7B%22serializedContextData%22%3A%22GhxSRENNVUNtTDFXbERJOFVrWERYQ1hjQlFOOUNB%22%7D%7D%2C%22watchEndpointSupportedOnesieConfig%22%3A%7B%22html5PlaybackOnesieConfig%22%3A%7B%22commonConfig%22%3A%7B%22url%22%3A%22https%3A%2F%2Frr2---sn-cvh76nek.googlevideo.com%2Finitplayback%3Fsource%3Dyoutube%26oeis%3D1%26c%3DWEB%26oad%3D3200%26ovd%3D3200%26oaad%3D11000%26oavd%3D11000%26ocs%3D700%26oewis%3D1%26oputc%3D1%26ofpcc%3D1%26msp%3D1%26odepv%3D1%26id%3D33a7d74ccfeeacc2%26ip%3D2401%253A4900%253A3c77%253Af91d%253A4e9%253Adcb0%253A5122%253A74a0%26initcwndbps%3D182500%26mt%3D1717687732%26oweuc%3D%26pxtags%3DCg4KAnR4Egg1MTE3NzU2Ng%26rxtags%3DCg4KAnR4Egg1MTE3NzU2MQ%252CCg4KAnR4Egg1MTE3NzU2Mg%252CCg4KAnR4Egg1MTE3NzU2Mw%252CCg4KAnR4Egg1MTE3NzU2NA%252CCg4KAnR4Egg1MTE3NzU2NQ%252CCg4KAnR4Egg1MTE3NzU2Ng%252CCg4KAnR4Egg1MTE3NzU2Nw%22%7D%7D%7D%7D%7D",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": false,
        "httpOnly": false,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1717688025,
        "storeId": null
    },
    {
        "name": "VISITOR_INFO1_LIVE",
        "value": "AronKzYJOO0",
        "domain": ".youtube.com",
        "hostOnly": false,
        "path": "/",
        "secure": true,
        "httpOnly": true,
        "sameSite": "no_restriction",
        "session": false,
        "firstPartyDomain": "",
        "partitionKey": null,
        "expirationDate": 1733126489,
        "storeId": null
    }
];
const agent = ytdl.createAgent(cookies);
app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
  return res.send("Hello World!");
});
app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send({ "status": 200, "messge": "success" })
});

app.post("/getVideoInfo", async (request, response) => {
  const urlRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
  const videoId = request.body.video_id ?? "";
  if (videoId && urlRegex.test(videoId)) {
    try {
      const videoInfo = await ytdl.getInfo(videoId,{agent});
      const videoFormats = videoInfo.formats;
      const allowedAudioFormats = [];
      const allowedVideoFormats = [];
      videoFormats.forEach((elem, index) => {
        const size = sizeCalculation(elem.contentLength);
        let type = "";
        if (elem.mimeType) {
          type = elem.mimeType.split(";")[0];
        }
        const container = elem.container;
        const pixel = elem.qualityLabel;
        const itag = elem.itag;
        if (elem.contentLength) {
          if (type.indexOf("video") !== -1 && elem.hasAudio && elem.hasVideo) {
            allowedVideoFormats.push({
              size,
              type,
              pixel,
              itag,
              container,
            });
          }

          if (type.indexOf("audio") !== -1 && elem.hasAudio) {
            allowedAudioFormats.push({
              size,
              type,
              pixel,
              itag,
              container,
            });
          }
        } else {
          if (type.indexOf("video") !== -1 && elem.hasAudio && elem.hasVideo) {
            allowedVideoFormats.push({
              size,
              type,
              pixel,
              itag,
              container,
            });
          }

          if (type.indexOf("audio") !== -1 && elem.hasAudio) {
            allowedAudioFormats.push({
              size,
              type,
              pixel,
              itag,
              container,
            });
          }
        }
      });

      const apiResponse = {
        status: "success",
        allowedAudioFormats,
        allowedVideoFormats,
        title: videoInfo.videoDetails.title,
        thumbnail: videoInfo.videoDetails.thumbnails[0],
      };
      return response.json(apiResponse);
    } catch (err) {
      console.log(err);
      return response.json({
        status: "fail",
        message: "something went wrong",
      });
    }
  } else {
    console.log("unsupported URL");
    return response.json({
      status: "fail",
      message: "URL is not compatible",
    });
  }
});

app.post("/downloadContent", (request, response) => {
  const itagValue = request.body.itagValue;
  const container = request.body.container;
  let videoTitle = request.body.videoTitle;
  videoTitle = videoTitle.replaceAll(" ", "_");
  const filePath = "../downloads/" + videoTitle + "." + container;
  const URL = request.body.URL;
  if (fs.existsSync(filePath.toString())) {
    console.log(`The file ${filePath} exists. `);
    return response.send({
      status: "success",
      message: "video ready to download",
      path: "./downloads/" + videoTitle + "." + container,
    });
  }
  ytdl(URL, {
    filter: (format) => format.itag === parseInt(itagValue),
  })
    .pipe(fs.createWriteStream("test.mp4"))
    .on("finish", () => {
      console.log("Video downloaded successfully!");
      return response.send({
        status: "success",
        message: "video ready to download",
        path: "/downloads/" + videoTitle + "." + container,
      });
    })
    .on("error", (err) => {
      console.error("Error downloading video:", err);
      return response.json({
        status: "fail",
        message: "something went wrong",
      });
    });
});
function sizeCalculation(length) {
  if (length) {
    var k = 1000,
      dm = 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(length) / Math.log(k));
    return parseFloat((length / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  } else {
    return "";
  }
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

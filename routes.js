const checksum_lib = require("./paytm/checksum/checksum");
const port = 5000;

module.exports = (app) => {
    app.get("/payment", (req, res) => {
        let params = {
            "MID": "JyCoeg74636150346503",
            "CHANNEL_ID": "WEB",
            "WEBSITE": "WEBSTAGING",
            "ORDER_ID": "ORD001",
            "CUST_ID": "CUST001",
            "TXN_AMOUNT": "1",
            "INDUSTRY_TYPE_ID": "Retail",
            "CALLBACK_URL": "http://localhost:" + port + '/callback'
        }
        checksum_lib.genchecksum(params, "uBa0d%2zsDycTi2B", (err, checksum) => {
            let txn_url = "https://securegw-stage.paytm.in/order/process";
            let form_fields = ""
            for (const key in params) {
                form_fields += '<input type="hidden" name="' + key + '" value = "' + params[key] + '">';
            }
            form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "'>";
            let html = '<html><body><center><h1>please wait do not refresh</h1></center><form method="post" action="' + txn_url + '" name = "f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit()</script></body></html>'
            res.writeHead(200, { 'Content-Type': "text/html" })
            res.write(html);
            res.end();
        })
    })

    // app.post("/callback", (req, res) => {
    //     console.log("in response post");
    //     var paramlist = req.body;
    //     var paramarray = new Array();
    //     console.log(paramlist);
    //     if (checksum_lib.verifychecksum(paramlist, "uBa0d%2zsDycTi2B")) {
    //         console.log("true");
    //         // res.render('response.ejs', { 'restdata': "true", 'paramlist': paramlist });
    //     } else {
    //         console.log("false");
    //         // res.render('response.ejs', { 'restdata': "false", 'paramlist': paramlist });
    //     };
    // })
}
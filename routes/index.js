const { response } = require('express');
var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {

    query2 = `
    SELECT category_id, category_name FROM category order by category_id
    `;

    database.query(query2, function(error, data){
        res.render('index', { title: 'Express', session : req.session, prod: data});
    });

});

router.post('/login', function(request, response, next){
    var email = request.body.email;

    var password = request.body.password;


    if(email && password)
    {
        if(email === "ab@gmail.com" && password === "1212") {
            response.redirect("/report");
        }
        else {
        query = `
        SELECT * FROM customer 
        WHERE email = "${email}"
        `;

        database.query(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].user_password == password)
                    {
                        request.session.user_id = data[count].customer_id;

                        response.redirect("/");
                    }
                    else
                    {
                        response.send('Incorrect Password');
                    }
                }
            }
            else
            {
                response.send('Incorrect Email Address');
            }
            response.end();
        });
    }
    }
    else
    {
        response.send('Please Enter Email Address and Password Details');
        response.end();
    }

});

router.post('/subcategorydata', function(request, response, next){
    category_id = request.body.dropdown1;

    database.query("call get_sub_categories(?)", category_id, function(error, data){
        console.log(data);
        response.render("sc", {title: 'Express', session : request.session, prod: data[0]})
    });

});

router.post("/productdata", function(request, response, next){
    sub_category_id = request.body.dropdown1;

    database.query("call get_sub_category_products(?)", sub_category_id, function(error, data){
        response.render("productitems", {title: 'Express', session : request.session, prod: data[0]})
    });

});

router.post("/productvarientdata", function(request, response, next){
    pid = request.body.pid;
    ptitle = request.body.ptitle;
    pdes = request.body.pdes;
    database.query("call get_variants(?)", pid, function(error, data){
        response.render("product", {title: 'Express', session : request.session, pid: pid, prod: data[0], ptitle: ptitle, pdes:pdes})
    });
});


router.post("/addtocart", function(request, response, next){
    product = JSON.parse(request.body.prs);
    cid = parseInt(request.session.user_id);
    pid = request.body.pid;
    vid = product.variant_id;
    amount = parseInt(request.body.varientList);
    tot = parseFloat(product.price) * amount; 
    is_adding = true;

    console.log("Every");
    console.log([cid, pid, vid, amount, tot, is_adding]);

    if (cid) {
        database.query("call update_cart(?, ?, ?, ?, ?, ?)", [cid, pid, vid, amount, tot, is_adding], function(error, data){
            response.redirect("/succ");
        });
    } else {
        response.redirect("/login");
    }
});

router.post('/checkout', function(req, res, next) {
    pid = req.session.user_id;
    tot = req.body.tot;
    console.log(tot);
    if (pid) {
        database.query("call get_cities(?)", pid, function(error, data){
            estmation = [];
            for (var i = 0; i < data[0].length; i++) {
                if (data[0][i].city_type === "major") {
                    estmation.push([5, data[0][i].city_id]);
                } else {
                    estmation.push([7, data[0][i].city_id]);
                }
            }
            res.render('checkout', { title: 'Express', session : req.session, prod: data[0], total: tot, est:estmation});
        });
    }
    else {
        res.redirect("/login");
    }
});

router.post("/proceedtocheckout", function(req, res, next) {
    pid = req.session.user_id;
    ctyp = req.body.city[0];
    ctid = req.body.city[1];
    tot = req.body.tot;
    contact = req.body.contact;
    address = req.body.address;
    pmeth = req.body.pmeth;
    meth = req.body.meth;

    results = []

    database.query("call new_order(?, ? ?, ?)", [tot, pid, "PROCESSING", pmeth], function(error, data){
        results.push(1);

        database.query("call get_cart_products(?)", pid, function(error, data){
            console.log("results2");
            console.log(data);
            results.push(data[0]);
            console.log("results2");
            console.log(data[0]);
            console.log("results");
            console.log(results);

            for (let i = 0; i < results[1].length; i++) {
                database.query("call update_order_products(?, ?, ?, ?, ?)", [parseInt(results[0]), results[1][i].product_id, results[1][i].variant_id, parseInt(results[1][i].amount), parseFloat(results[1][i].price)], (err, results) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(results);
                }
                });
            }

            database.query("call update_delivery_details(?, ?, ?, ?, ?, ?)", [results[0], meth, ctyp, address, ctid, contact], function(error, data){});

            if(pmeth === "Card") {
                database.query("call update_payment_details(?, ?, ?, ?, ?, ?)", [tot, results[0]], function(error, data){});
            }
        
        });
    });
    res.redirect("/final");


});

router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

router.post("/update", function(request, response, next){
    product = JSON.parse(request.body.prs);
    cid = parseInt(request.session.user_id);
    pid = product.product_id;
    vid = product.variant_id;
    amount = parseInt(product.amount);
    tot = parseFloat(product.price) * amount; 
    is_adding = false;

    database.query("call update_cart(?, ?, ?, ?, ?, ?)", [cid, pid, vid, amount, tot, is_adding], function(error, data){
        response.redirect("/cart");
    });

});

router.post("/r1", function(request, response, next){
    year = request.body.year;

    database.query("call update_cart(?, ?, ?, ?, ?, ?)", [cid, pid, vid, amount, tot, is_adding], function(error, data){
        response.redirect("/cart");
    });

});

router.post("/r2", function(request, response, next){
    year = request.body.year;

    database.query("call update_cart(?, ?, ?, ?, ?, ?)", [cid, pid, vid, amount, tot, is_adding], function(error, data){
        response.redirect("/cart");
    });

});

router.post("/r3", function(request, response, next){
    year = request.body.year;

    database.query("call quarterly_sales_report(?)", parseInt(year), function(error, data){
        response.render("r3", {title: 'Express', session : request.session, prod: data[0]})
    });

});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express', session : req.session});
});

router.get('/cart', function(req, res, next) {
    pid = req.session.user_id;
    if (pid) {
        database.query("call get_cart_products(?)", pid, function(error, data){
            res.render("cart", {title: 'Express', session : req.session, prod: data[0], pid: pid})
        });
    }
    else {
        res.redirect("/login");
    }
});

router.get('/checkout', function(req, res, next) {
    pid = req.session.user_id;
    if (pid) {
        res.render('checkout', { title: 'Express', session : req.session});
    }
    else {
        res.redirect("/login");
    }
});

router.get('/product', function(req, res, next) {
    res.render('product', { title: 'Express', session : req.session});
});

router.get('/productlist', function(req, res, next) {
    res.render('productlist', { title: 'Express', session : req.session});
});

router.get('/final', function(req, res, next) {
    res.render('final', { title: 'Express', session : req.session});
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Express', session : req.session});
});

router.get('/report', function(req, res, next) {
    result = [];
    database.query("call get_product_category_with_most_orders(?)", 1, function(error, data){
        result.push(data[0]);
        database.query("call get_best_selling_period(?)", 1, function(error, data){
            result.push(data[0]);
            console.log(data);
            res.render('report', { title: 'Express', session : req.session, prod: result});
    });
});
});

router.get('/succ', function(req, res, next) {
    res.render('succ', { title: 'Express', session : req.session});
});

module.exports = router;


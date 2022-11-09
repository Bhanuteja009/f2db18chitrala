var house = require('../models/house'); 
 
// List of all Houses 
exports.house_list = async function(req, res) { 
    try{ 
        theHouses = await house.find(); 
        res.send(theHouses); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 

// for a specific House. 
exports.house_detail = function(req, res) { 
    res.send('NOT IMPLEMENTED: House detail: ' + req.params.id); 
}; 
 
// Handle House create on POST. 
exports.house_create_post = function(req, res) { 
    res.send('NOT IMPLEMENTED: House create POST'); 
}; 
 
// Handle House delete form on DELETE. 
exports.house_delete = function(req, res) { 
    res.send('NOT IMPLEMENTED: House delete DELETE ' + req.params.id); 
}; 
 
// Handle House update form on PUT. 
exports.house_update_put = function(req, res) { 
    res.send('NOT IMPLEMENTED: House update PUT' + req.params.id); 
};

// VIEWS 
// Handle a show all view 
exports.house_view_all_Page = async function(req, res) { 
    try{ 
        theHouses = await house.find(); 
        res.render('house', { title: 'House Search Results', results: theHouses }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
};

// Handle House create on POST. 
exports.house_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new house(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"costume_type":"goat", "cost":12, "size":"large"} 
    document.house_bedrooms = req.body.house_bedrooms; 
    document.house_rent = req.body.house_rent; 
    document.house_address = req.body.house_address; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
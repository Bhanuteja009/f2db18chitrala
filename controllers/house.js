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
exports.house_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await house.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
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
exports.house_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await house.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.house_bedrooms)  
               toUpdate.house_bedrooms = req.body.house_bedrooms; 
        if(req.body.house_rent) toUpdate.house_rent = req.body.house_rent; 
        if(req.body.house_address) toUpdate.house_address = req.body.house_address; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
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